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
	
	haiyunControllers.controller('aptitudeController', ['$scope','httpService','alertService', function($scope,httpService,alertService) {
		$scope.page = 1;
		$scope.name = name;
		$scope.pageSize = 1;
		var size = 10;
		$scope.input={};
		$scope.typeList=[{'value':'COMMON','name':{'enName':'Common Route','cnName':'常跑的路线'}[name]},{'value':'HOPE','name':{'enName':'Like Route','cnName':'关注的路线'}[name]}];
		var getPorts = function(){
			httpService.doPost('./struts/getFavoritePortList.action', {'start':$scope.page*size-size,'limit':size}, function(ret){
    			$scope.favoritePorts = ret.favoritePorts;
    			$scope.pageSize = Math.ceil(ret.totalEntities/size);
    			$scope.$apply();
			});
		};
		
		$scope.favoritePorts = [];
		$scope.range = function(n) {
	        return (!!n)?new Array(n):[];
	    };
	    
	    $scope.selectPage = function(page){
	    	if((page===-1&&$scope.page<=1)||(page===0&&$scope.page>=$scope.pageSize)||page===$scope.page)
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
	    	getPorts();
	    };
	    
		$scope.addFavoritePort = function(){
			var input = {
					'favoritePort.fromPortID':$scope.input.fromPortID,
					'favoritePort.toPortID':$scope.input.toPortID,
					'favoritePort.type':$scope.input.type
			};
			httpService.doPost('./struts/addFavoritePort.action', input, function(ret){
				alertService.myAlert({'cnName':'添加成功','enName':'success!'}[name],'success');
				getPorts();
			});
		};
		
		 var temp = [{'cnName':'--','enName':'--'}];
		 $scope.dataList  ={};
		 var initDataList = function(){
			 //port
			 httpService.doPost('./struts/searchPort.action', {'port.id':0,'port.level':'AREA'}, function(ret){
				 $scope.dataList.portZeroLevel = ret.ports;
		    });
			
			 $scope.dataList.departurePortFirstLevel = temp;
			 $scope.dataList.departurePortSecondLevel = temp;
			 $scope.dataList.arrivalPortFirstLevel = temp;
			 $scope.dataList.arrivalPortSecondLevel = temp;
		 };
		initDataList();
		getPorts();
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
	