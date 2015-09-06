(function(){
    'use strict';
    var name = $.cookie("language")||"cn";
    if(name==="undefined"){
        name = "cn";
    };
    var haiyun = angular.module('haiyun', ['ngRoute','pascalprecht.translate','haiyunControllers','haiyunServices','haiyunDirectives']);
    haiyun.config(function($translateProvider) {
        $translateProvider.translations('en',en).translations('cn',cn);
        $translateProvider.preferredLanguage(name);
        name = name+"Name";
    }).config(function($sceProvider){
        $sceProvider.enabled(false);
    });

    var haiyunControllers = angular.module('haiyunControllers', []);

    haiyunControllers.controller('goodDataCtrl', ['$scope','httpService', function($scope,httpService) {
        $scope.actionName = '';
        var goodList = $scope.goodList=[];
        $scope.favorGoodData={};

        httpService.doPost('./struts/getAllSpeciality.action', {},function(ret){
            goodList = ret.speciality;
            $scope.$apply();
            console.info('speciality',ret);
        });

        $scope.submitFavorGoodData = function(){
            var input = {
                'specialityBean.cnName':$scope.favorGoodData.cnName,
                'specialityBean.enName':$scope.favorGoodData.enName
            }
            httpService.doPost('./struts/addSpeciality.action', input, function(ret){
                swal("^-^", "常运货物数据提交成功！", "success");
                console.log(ret);
            });
        }

    }]);
    haiyunControllers.controller('goodCtrl', ['$scope','httpService', function($scope,httpService) {

        var goodData = $scope.goodData = {
            'goodList':[],
            'favorGood':0,
            'goodRemark':''
        }

        httpService.doPost('./struts/getAllSpeciality.action', {},function(ret){
            goodData.goodList = ret.speciality;
            $scope.$apply();
            console.info('speciality',ret);
        });
        $scope.submitFavorGood = function(){
            var input = {
                'specialityListBean.specialityID':goodData.favorGood
            }
            if (goodData.favorGood == -1)
            input.specialityListBean.remark = goodData.goodRemark;
            httpService.doPost('./struts/addSpecialityLists.action', input, function(ret){
                swal("^-^", "常运货物提交成功！", "success");
            });
        }

    }]);
})();
	