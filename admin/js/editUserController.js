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

	haiyunControllers.controller('editInfoCtrl', ['$scope', 'checkService','httpService', function($scope, checkService, httpService) {
		$scope.data = {
			'value': {
				'username':$('#docid')[0].value||-1,
				'role':$('#userrole')[0].value,
				'state':'',
				'email': '',
				'password': ''
			},
			'validate': {
				'username': false,
				'email': false,
				'password': false
			}
		};
		$scope.roleList = [{'value':'PERSON','name':{'cnName':'个人',"enName":"Person"}[name]},{'value':'TRADE','name':{'cnName':'贸易商',"enName":"Trade"}[name]},{'value':'TRANSPORT','name':{'cnName':'承运商',"enName":"Transport"}[name]}];
		$scope.stateList = [{'value':'STANDARD','name':{'cnName':'正常',"enName":"Standard"}[name]},{'value':'UNVALIDATED','name':{'cnName':'未认证',"enName":"unvalidated"}[name]},{'value':'FROZEN','name':{'cnName':'已冻结',"enName":"Frozen"}[name]}];

		/*
		 * ,
		 'role': $('#userRole').val()
		 var roleList = [{'value':'PERSON','cnName':'个人',"enName":"Person"},{'value':'TRADE','cnName':'贸易商',"enName":"Trade"},{'value':'TRANSPORT','cnName':'承运商',"enName":"Transport"}];
		 $scope.roleList = $.map(roleList, function(n, i){
		 var temp = {};
		 temp.value = n.value;
		 if(n.value!== $('#userRole').val()){
		 return;
		 }
		 temp.name = n[name];
		 return temp;
		 });*/
		$scope.check = function(index){
			if(index){
				switch(index){
					case 1:
						$scope.data.validate.username = !!$scope.data.value.username&&!checkService.checkUsername($scope.data.value.username);
						break;
					case 4:
						$scope.data.validate.password = !!$scope.data.value.password&&!checkService.checkPassword($scope.data.value.password);
						break
					case 6:
						$scope.data.validate.email = !!$scope.data.value.email&&!checkService.checkEmail($scope.data.value.email);
						break;
				}
			}else{
				var validate = true;
				validate = validate && !($scope.data.validate.username = !!$scope.data.value.username && !checkService.checkUsername($scope.data.value.username));
				validate = validate && !($scope.data.validate.password = !!$scope.data.value.password && !checkService.checkPassword($scope.data.value.password));
				validate = validate && !($scope.data.validate.email = !!$scope.data.value.email && !checkService.checkEmail($scope.data.value.email));
				return validate;
			}

		}
		$scope.submitHandler = function() {
			//if(!$scope.check()){
			//	return;
			//}
			var input = {};
			if(!!$scope.data.value.userrole && $scope.data.value.role!==$('#userrole').val()){
				input['user.userrole'] = $scope.data.value.role;
			}
			if(!!$scope.data.value.username && $scope.data.value.username!==$('#username').val()){
				input['user.username'] = $scope.data.value.username;
			}
			if(!!$scope.data.value.email && $scope.data.value.email!==$('#email').val()){
				input['user.email'] = $scope.data.value.email;
			}
			if(!!$scope.data.value.password){
				input['user.password'] = $.md5($scope.data.value.password);
			}
			if($.isEmptyObject(input)){
				sweetAlert("!", {"enName":"No change happen!","cnName":"未做修改"}[name], "warning");
				return;
			}
			httpService.doPost('./struts/editUserInfo.action', input, function(ret){
				$('#email').val(ret.user.email);
				$('#username').val(ret.user.username);
				$('#userrole').val(ret.user.role);
				var aleMsg;
				if(!!input['user.email']){
					aleMsg = {"enName":"Success, please verify your new email","cnName":"修改成功,请验证邮箱"};
				}else{
					aleMsg = {"enName":"Success!","cnName":"修改成功"};
				}
				sweetAlert("√", aleMsg[name], "success");
			});
		};
	}]);

})();