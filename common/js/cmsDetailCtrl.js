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
    
    haiyunControllers.controller('cmsDetailCtrl', ['$scope','httpService','alertService', function($scope, httpService,alertService) {
    	var init = function(){
    		httpService.doPost('./struts/getCMSNewsByID.action', {"cmsBean.id":$('#cmsId')[0].value}, function(ret){
    			if(!!!ret.cmsNews){
    				alertService.myAlert({'enName':"无结果",'cnName':'no Result found!'}[name],'warning');
    				return;
    			}
    			$scope.cms = ret.cmsNews;
    			$scope.$apply();
    		});
    	};
    	init();
    }]);
})();