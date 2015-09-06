(function () {
	'use strict';
	var name = $.cookie("language")||"cn";
	var haiyun = angular.module('haiyun', ['ngRoute','pascalprecht.translate','haiyunControllers','haiyunServices']);
    haiyun.config(function($translateProvider) {
		 $translateProvider.translations('en',en).translations('cn',cn);
		 $translateProvider.preferredLanguage(name);
		 name = name+"Name";
	   }).config(function($sceProvider){
			 $sceProvider.enabled(false);
	   });

	var haiyunControllers = angular.module('haiyunControllers', []);

    haiyunControllers.controller('privateMsgCtrl',['$scope','httpService','alertService',function($scope,httpService,alertService){
        $scope.msgData = {
            'totalPages':10,
            'totalEntries':2,
            'gotoPage':1,
            'currentPage':1,
            'privateMsgs':[
                //{
                //    "content":"这是一条测试私信","id":11,"sendTime":"2015-01-01","state":"UNREAD",
                //    "title":"测试私信1","type":"NOTICE","userId":1
                //},{
                //    "content":"这是一条测试私信","id":12,"sendTime":"2015-01-01","state":"READ",
                //    "title":"测试私信2","type":"NOTICE","userId":1
                //},{
                //    "content":"这是一条测试私信","id":13,"sendTime":"2015-01-01","state":"LOCK",
                //    "title":"测试私信3","type":"NOTICE","userId":1
                //},{
                //    "content":"这是一条测试私信","id":14,"sendTime":"2015-01-01","state":"UNREAD",
                //    "title":"测试私信4","type":"NOTICE","userId":1
                //},{
                //    "content":"这是一条测试私信","id":15,"sendTime":"2015-01-01","state":"UNREAD",
                //    "title":"测试私信5","type":"NOTICE","userId":1
                //}
            ],
            'state':'DEFAULT',
            'stateList':[
                //{'value':'DEFAULT','name':'全部'},
                {'value':'UNREAD','name':'未读'},
                {'value':'READ','name':'已读'},
                {'value':'LOCK','name':'锁定'}
            ]

        };

        var pageInfo = {
            'start':0,
            'limit':10
        };
        var getMsg = function(){
            if ($scope.msgData.state !='DEFAULT') pageInfo['state'] = $scope.msgData.state;
            //else
            httpService.doPost('./struts/getPrivateMsgList.action', pageInfo, function(ret){
                    console.log('分页数据',pageInfo);
                    $scope.msgData.privateMsgs = ret.privateMsgs;
                    $scope.totalEntries = ret.totalEntries;
                    $scope.msgData.totalPages = Math.ceil($scope.msgData.totalEntries / pageInfo.limit);
                    console.log(ret.data);
                    $scope.$apply();
            });
        };

        getMsg();

        $scope.changePage = function(para){
            if ((pageInfo.start + pageInfo.limit * para >= 0) && (pageInfo.start + pageInfo.limit * para <= $scope.msgData.totalEntries)){
                pageInfo.start += pageInfo.limit * para;
                console.log('Modified pageInfo',pageInfo);
                getMsg();
            }
        };

        $scope.assignPage = function(){
            pageInfo.start = ($scope.msgData.gotoPage-1) * pageInfo.limit;
            getMsg();
        };

        $scope.changeMsg = function(mId,mState){
            httpService.doPost('./struts/updatePrivateMsgState.action', {'msgId':mId,'state':mState}, function(ret){
                    $scope.changePage(0);
                    console.log(ret.msg);
                    $scope.$apply();
            });
        };

        $scope.selectMsg = function(){
            httpService.doPost('./struts/getPrivateMsgList.action', {'start':pageInfo.start,'limit':pageInfo.limit,'state':$scope.msgData.state}, function(ret){
                    $scope.msgData.privateMsgs = ret.privateMsgs;
                    $scope.totalEntries = ret.totalEntries;
                    $scope.msgData.totalPages = Math.ceil($scope.msgData.totalEntries / pageInfo.limit);
                    $scope.$apply();
            });
        }

    }]);

    haiyun.filter('TinyToBool',function(){
        return function(data){
            if (data == 1) data = '是';
            else data = '否';
            return data;
        }
    });
    haiyun.filter('TypeToName',function(){
        return function(data,item){
            if (item == '私信状态'){//UNREAD(0, "未读"), READ(1, "已阅读"), LOCK(2, "锁定"), DELETE(3, "已删除");
                if (data == "UNREAD") return '未读';
                if (data == "READ") return '已阅读';
                if (data == "LOCK") return '锁定';
                if (data == "DELETE") return '已删除';
            }
            if (item == '私信类型'){
                if (data == "AD") return '广告';
                if (data == "SYSTEM") return '系统';
            }
        }
    })

})();