(function () {
    'use strict';
    var name = $.cookie("language")||"cn";
    if (name === "undefined") {
        name = "cn";
    };
    var haiyun = angular.module('haiyun', ['ngRoute', 'pascalprecht.translate', 'haiyunControllers', 'haiyunServices', 'haiyunDirectives']);
    haiyun.config(function($translateProvider) {
		 $translateProvider.translations('en',en).translations('cn',cn);
		 $translateProvider.preferredLanguage(name);
		 name = name+"Name";
    }).config(function($sceProvider){
		 $sceProvider.enabled(false);
    });

    var haiyunControllers = angular.module('haiyunControllers', []);
    haiyunControllers.controller('evaluateCtrl', ['$scope', 'httpService','alertService', function ($scope, httpService,alertService) {
        var docid = $('#docid')[0].value||-1;
        $scope.scoreData = {
            'description':'',
            'score':3
        };

        $scope.submitHandler = function(){
            var uploadData = {
                'descript':$scope.scoreData.description,
                'score':$scope.scoreData.score
            };
            httpService.doPost('./struts/x.action', uploadData, function(ret){
            	alertService.myAlert("^-^,评价成功！", "success");
            });
        }
    }]);
})();