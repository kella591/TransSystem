(function() {
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

    haiyunControllers.controller('signUpCtrl', ['$scope', 'checkService','httpService','alertService', function($scope, checkService, httpService,alertService) {
        $scope.data = {
            'value': {
                'username': '',
                'email': '',
                'phone': '',
                'password': '',
                'role': '',
                'checkNum': ''
            },
            'validate': {
                'username': false,
                'email': false,
                'phone': false,
                'password': false,
                'role': false,
                'checkNum': false
            },
            'agree': false
        };
   	 $scope.roleList = [{'value':'PERSON','name':{'cnName':'个人',"enName":"Person"}[name]},{'value':'TRADE','name':{'cnName':'贸易商',"enName":"Trade"}[name]},{'value':'TRANSPORT','name':{'cnName':'承运商',"enName":"Transport"}[name]}];

   	 $scope.getCheckNum = function() {
            if (!checkService.checkPhone($scope.data.value.phone)) {
                $scope.data.validate.phone = true;
            } else {
            	httpService.doPost('./struts/telcheck.action', {telno: $scope.data.value.phone}, function(){alertService.myAlert({'cnName':'发送成功，请注意查收！','enName':'send success,please check your phone!'}[name],"success");});
            }
            return;
     };
     
     $scope.check = function(index){
        	if(index){
        		switch(index){
        		case 1:
        			$scope.data.validate.username = !checkService.checkUsername($scope.data.value.username);
        			break;
        		case 2:
        			$scope.data.validate.phone = !checkService.checkPhone($scope.data.value.phone);
        			break;
        		case 3:
        			$scope.data.validate.checkNum = !checkService.checkCheckNum($scope.data.value.checkNum);
        			break
        		case 4:
        			$scope.data.validate.password = !checkService.checkPassword($scope.data.value.password);
        			break
        		case 5:
        			$scope.data.validate.role = !checkService.checkRole($scope.data.value.role);
        			break;
        		case 6:
        			$scope.data.validate.email = !checkService.checkEmail($scope.data.value.email);
        			break;
        		}
        	}else{
        		var validate = true;
            	validate = validate && !($scope.data.validate.username = !checkService.checkUsername($scope.data.value.username));
            	validate = validate && !($scope.data.validate.phone = !checkService.checkPhone($scope.data.value.phone));
            	validate = validate && !($scope.data.validate.checkNum = !checkService.checkCheckNum($scope.data.value.checkNum));
            	validate = validate && !($scope.data.validate.password = !checkService.checkPassword($scope.data.value.password));
            	validate = validate && !($scope.data.validate.role = !checkService.checkRole($scope.data.value.role));
            	validate = validate && !($scope.data.validate.email = !checkService.checkEmail($scope.data.value.email));
            	return validate;
        	}
     }
     
     $scope.submitHandler = function() {
        	if(!$scope.check()){
        		return;
        	}
        	if (!$scope.data.agree) {
        		alertService.myAlert("×", {'cnName':"必须先同意协议！",'enName':'You must agree the degree first!'}[name], "error");
            } else {
                var input = {
                    'user.telephone': $scope.data.value.phone,
                    'user.email': $scope.data.value.email,
                    'user.password': $.md5($scope.data.value.password),
                    'user.role': $scope.data.value.role,
                    'user.username': $scope.data.value.username,
                    "checkNumber": $scope.data.value.checkNum
                };
                httpService.doPost('./struts/register.action', input, function(){window.location="./signIn.jsp";});
            }
        };
    }]);
})();