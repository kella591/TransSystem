(function(){
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

    haiyunControllers.controller('userListCtrl', ['$scope','httpService','alertService', function($scope,httpService,alertService) {
        $scope.page = 1;
        $scope.pageSize = 1;
        var size = 10;
        var getUserList = function(){

            var input = {
                'start':$scope.page*size-size,
                'limit':size
            };
            httpService.doPost('./struts/getAllUser.action', input, function(ret){
                $scope.userList = ret.users;
                //$scope.pageSize = Math.ceil(ret.totalEntries/size);authUserList.action
                $scope.$apply();
            });
        };

        $scope.userList = [];

        $scope.range = function(n) {
            return (!!n)?new Array(n):[];
        };

        $scope.selectPage = function(page){
            if((page===-1&&$scope.page===1)||(page==0&&$scope.page===$scope.pageSize)||page===$scope.page)
            {
                return;
            }
            if(page===-1){
                $scope.page--;
            }
            else if(page===0){
                $scope.page++;
            }else{
                $scope.page = page;
            }
            getUserList();
        };

        getUserList();
    }]);

    haiyunControllers.controller('authUserListCtrl', ['$scope','httpService', function($scope,httpService) {
        $scope.page = 1;
        $scope.pageSize = 1;
        var size = 10;
        var getUserList = function(){

            var input = {
                'start':$scope.page*size-size,
                'limit':size
            };
            httpService.doPost('./struts/authUserList.action', input, function(ret){
                $scope.userList = ret.userList;
                //$scope.pageSize = Math.ceil(ret.totalEntries/size);authUserList.action
                $scope.$apply();
            });
        };

        $scope.userList = [];

        $scope.range = function(n) {
            return (!!n)?new Array(n):[];
        };

        $scope.selectPage = function(page){
            if((page===-1&&$scope.page===1)||(page==0&&$scope.page===$scope.pageSize)||page===$scope.page)
            {
                return;
            }
            if(page===-1){
                $scope.page--;
            }
            else if(page===0){
                $scope.page++;
            }else{
                $scope.page = page;
            }
            getUserList();
        };

        getUserList();
    }]);

})();
	