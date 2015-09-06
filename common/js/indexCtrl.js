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
    
    haiyunControllers.controller('indexCtrl', ['$scope','httpService', function($scope, httpService) {

    	/*
	}*/
    	var init = function(){
    		httpService.doPost('./struts/getRecentCMSNews.action',{},function(ret){
    			$scope.cmsList = ret.cmsNews;
    			$scope.$apply();
    		});
    	};
    	init();
    }]);
})();