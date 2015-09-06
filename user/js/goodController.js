(function() {
    'use strict';
    var name = $.cookie("language")||"cn";
    if(name==="undefined"){
        name = "cn";
    }
    var haiyun = angular.module('haiyun', ['ngRoute','pascalprecht.translate','haiyunControllers','haiyunServices']);
    haiyun.config(function($translateProvider) {
		 $translateProvider.translations('en',en).translations('cn',cn);
		 $translateProvider.preferredLanguage(name);
		 name = name+"Name";
    }).config(function($sceProvider){
		 $sceProvider.enabled(false);
    });

    var haiyunControllers = angular.module('haiyunControllers', []);

    haiyunControllers.controller('addGoodCtrl', ['$scope','httpService','alertService', function($scope,httpService,alertService) {

    }]);


})();