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

    haiyunControllers.controller('manageCmsCtrl', ['$scope','httpService','alertService', function($scope,httpService,alertService) {
        $scope.page = 1;
        $scope.pageSize = 1;
        $scope.input = {};
        $scope.searchData = {'cmsType':'NEWS'};
        $scope.cmsList = [];
        $scope.typeList = [{'value':'NEWS','name':{'enName':'NEWS','cnName':'新闻'}[name]},
                           {'value':'NOTICE','name':{'enName':'NOTICE','cnName':'通知'}[name]},
                           {'value':'HELP','name':{'enName':'HELP','cnName':'帮助'}[name]}];
        var size = 10;
        var getCmsList = function(){
            var input  ={};
            if(!!$scope.searchData.ID){
            	input['cmsBean.id'] = $scope.searchData.ID;
            	httpService.doPost('./struts/getCMSNewsByID.action', input, function(ret){
                    $scope.cmsList = [ret.cmsNews];
                    $scope.pageSize = 1;//Math.ceil(ret.totalEntries/size);
                    $scope.$apply();
                });
            }
            else if(!!$scope.searchData.cmsType){
            	input['cmsBean.cmsType'] = $scope.searchData.cmsType;
            	httpService.doPost('./struts/getRecentCMSNewsByType.action', input, function(ret){
                    $scope.cmsList = ret.cmsNews;
                    $scope.pageSize = ret.cmsNews.length//Math.ceil(ret.totalEntries/size);
                    $scope.$apply();
                });
            };
        };
        $scope.getCmsList = getCmsList;
        $scope.deleteCms = function(id){
        	httpService.doPost('./struts/deleteCMS.action', {"cmsBeanId":id}, function(ret){
        		getCmsList();
            });
        }
//AUTHCODE(1, "验证码"), NOTICE(2, "通知"), AD(3, "广告");
        $scope.addCms = function(){
        	var input  = {'cmsBean.cmsTitle':$scope.input.cmsTitle,
        					'cmsBean.cmsContent':$scope.input.cmsContent,
        					'cmsBean.cmsType':$scope.input.cmsType};
        	httpService.doPost('./struts/addCMS.action', input, function(ret){
        		getCmsList();
            });
        	
        }
        
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
            getCmsList();
        };

        getCmsList();
    }]);

})();
	