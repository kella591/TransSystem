(function () {
    'use strict';
    var haiyun = angular.module('haiyun', ['ngRoute','pascalprecht.translate','haiyunControllers','haiyunServices']);
    var name = $.cookie("language")||"cn";
    haiyun.config(function($translateProvider) {
		 $translateProvider.translations('en',en).translations('cn',cn);
		 $translateProvider.preferredLanguage(name);
		 name = name+"Name";
    }).config(function($sceProvider){
		 $sceProvider.enabled(false);
    });
    var haiyunControllers = angular.module('haiyunControllers', []);

    haiyunControllers.controller('routeDetailCtrl',['$scope','httpService', function($scope,httpService) {
    	$scope.name = name;
    	var id = $("#route")[0].value;
    	var type = $("#type")[0].value;
    	$scope.type=type;
    	if(type==="2"){
    		httpService.doPost('./struts/searchBulkloadRoute.action',{"bulkloadRoute.id":id}, function(ret){
    			$scope.route = ret.bulkloadRoute[0];
    			$scope.$apply();
    		});
    	}else if(type==="1"){
    		httpService.doPost('./struts/searchContainerRoute.action',{"containerRoute.id":id}, function(ret){
    			$scope.route = ret.containerRoutes[0];
    			$scope.$apply();
    		});
    	}
    	
    	
    	
    }]);

})();