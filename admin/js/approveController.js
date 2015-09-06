(function () {
    'use strict';
    var name = $.cookie("language")||"cn";
    var haiyun = angular.module('haiyun', ['ngRoute','pascalprecht.translate','haiyunControllers','haiyunServices','haiyunDirectives']);
    haiyun.config(function($translateProvider) {
    	$translateProvider.translations('en',en).translations('cn',cn);
  	  	$translateProvider.preferredLanguage(name);
  	  	name = name+"Name";
  	}).config(function($sceProvider){
  		$sceProvider.enabled(false);
  	});

    var haiyunControllers = angular.module('haiyunControllers', []);

    haiyunControllers.controller('approveCtrl',['$scope','httpService','alertService',function($scope,httpService,alertService){
        $scope.authoInfoList = [
            //{"applyTime":"2015-06-27 18:35:41","aptitudeID":1,"aptitudeType":"TRANSPORT","attachmentID":12,"handleTime":"2015-06-26 00:39:14","id":8,
            // "state":"UNHANDLE",
            //    "userid":3}
        ];


        var userid=$('#userid')[0].value||-1;

        httpService.doPost('./struts/getAuthInfo.action', {'uid':userid}, function(ret) {
            $scope.authoInfoList = ret.authInfo;
            //$scope.pageSize = Math.ceil(ret.totalEntries/size);
            for (var i in $scope.authoInfoList){
                $scope.authoInfoList[i].attachUrl='attach_img.action?id=' + $scope.authoInfoList[i].attachmentID;
            }
            $scope.$apply();
        });

        $scope.submitHandler = function(aptId,newState){
            var uploadData = {
                'authId':aptId,
                'authResult':newState
            };
            httpService.doPost('./struts/authResult.action', uploadData, function(ret){
            	alertService.myAlert({'enName':'^-^,success!','cnName':'^-^,提交成功'}[name], "success");
            });

        }

    }]);

    haiyun.filter('TypeToName',function(){
        return function(data,item){
            if (item == 'APTTYPE'){//
                //ADMINISTOR((byte)0,"管理员"),PERSON((byte)1,"个人"),TRADE((byte)2,"贸易商"),TRANSPORT((byte)3,"承运商");
                if (data == "ADMINISTOR") return '管理员';
                if (data == "PERSON") return '个人';
                if (data == "TRADE") return '贸易商';
                if (data == "TRANSPORT") return '承运商';
            }

        }
    });

})();