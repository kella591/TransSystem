(function() {
    'use strict';
    var haiyun = angular.module('haiyun', ['ngRoute' ,'pascalprecht.translate','haiyunControllers','haiyunServices']);
    var name = $.cookie("language")||"cn";
    haiyun.config(function($translateProvider) {
    	$translateProvider.translations('en',en).translations('cn',cn);
  	  	$translateProvider.preferredLanguage(name);
  	  	name = name+"Name";
  	}).config(function($sceProvider){
  		$sceProvider.enabled(false);
  	});
    
    var haiyunControllers = angular.module('haiyunControllers', []);
    
    haiyunControllers.controller('signInCtrl', ['$scope', 'checkService','httpService', function($scope, checkService, httpService) {

        $scope.data = {
            'value': {
                'email': '',
                'password': ''
            },
            'validate': {
                'email': false,
                'password': false
            }
        };
        $scope.submitHandler = function() {
            if (!checkService.checkEmail($scope.data.value.email)) {
                $scope.data.validate.email = true;
            } else if (!checkService.checkPassword($scope.data.value.password)) {
                $scope.data.validate.password = true;
            } else {
                var input = {
                    'user.email': $scope.data.value.email,
                    'user.password': $.md5($scope.data.value.password)
                };
                httpService.doPost('./struts/userlogin.action', input, function(){window.location="../index.jsp";});
            }
        }
    }]);
})();