(function(){
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

    haiyunControllers.controller("shipperController",['$scope','$rootScope','httpService','alertService',function($scope,$rootScope,httpService,alertService) {
    	$scope.page = 1;
		$scope.state = null;
		$scope.pageSize = 1;
		
		var size = 10;
		var getCommonRouteList = function(){
			
			var input = {
					'start':$scope.page*size-size,
					'limit':size
			};
			
			httpService.doPost('./struts/getCommonRouteList.action', input, function(ret){
	    			$scope.routeList = ret.list;
	    			$scope.pageSize = Math.ceil(ret.totalEntities/size);
	    			$scope.$apply();
			});
		};
		
		$scope.routeList = [];
		
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
	    	getCommonRouteList();
	    };
	    
	    $scope.input={
	    		'route.id':1
	    };
	    $scope.addRoute = function(){
	    	httpService.doPost('./struts/addCommonRoute.action', input, function(ret){
	    			getCommonRouteList();
			});
	    };
	    
	    //getCommonRouteList();
	}]);
})();
	