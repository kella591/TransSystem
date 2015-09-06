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

    haiyunControllers.controller('groupRouteCtrl',['$scope','httpService','alertService', function($scope,httpService,alertService) {
    	$scope.name = name;
    	$scope.dataList = {};
    	$scope.tempData = {};
    	$scope.input = {};
    	var temp = [{'cnName':'--','enName':'--'}];
    	var init = function(){
    		$scope.dataList.typeSearchList = [{'cnName':'集装箱','enName':'container','value':1},{'cnName':'散杂货','enName':'bulkload','value':2}];
    		$scope.dataList.typeList = [{'name':'标准','value':'STANDARD'},{'name':'特色','value':'SPECIAL'},{'name':'团购','value':'GROUP'}];
    		$scope.dataList.statusList = [{'name':'未开始','value':'NOSTART'},{'name':'进行中','value':'ON'},{'name':'已过期','value':'OUTOFDATE'},{'name':'已废弃','value':'DROP'}];
    		$scope.tempData.port = {
					 'departure' : {'zero':-1,'first':-1},
					 'arrival' : {'zero':-1,'first':-1}
			 };
    		httpService.doPost('./struts/searchPort.action', {'port.id':0,'port.level':'AREA'}, function(ret){
				 $scope.dataList.portZeroLevel = ret.ports;
		    });
			$scope.dataList.departurePortFirstLevel = temp;
			$scope.dataList.departurePortSecondLevel = temp;
			$scope.dataList.arrivalPortFirstLevel = temp;
			$scope.dataList.arrivalPortSecondLevel = temp;
			$scope.searchRoute();
    	};
    	 //select port
		 $scope.selectPort = function(type,level){
			 var id;
			 if(type===0){
				 if(level===0){
					 id = $scope.tempData.port.departure.zero;
				 }else{
					 id = $scope.tempData.port.departure.first;
				 }
			 }else if(type==1){
				 if(level===0){
					 id = $scope.tempData.port.arrival.zero;
				 }else{
					 id = $scope.tempData.port.arrival.first;
				 }
			 }
			 httpService.doPost('./struts/searchPort.action', {'port.id':id,'port.level':level===0?"COUNTRY":"PORT"}, function(ret){
				 if(type===0){
					 if(level===0){
						 $scope.dataList.departurePortFirstLevel = ret.ports;
						 $scope.dataList.departurePortSecondLevel = temp;
					 }else{
						 $scope.dataList.departurePortSecondLevel = ret.ports;
					 }
				 }else if(type==1){
					 if(level===0){
						 $scope.dataList.arrivalPortFirstLevel = ret.ports;
						 $scope.dataList.arrivalPortSecondLevel = temp;
					 }else{
						 $scope.dataList.arrivalPortSecondLevel = ret.ports;
					 }
				 }
				 $scope.$apply();
			 });
		 };
    	var searchContainer = function(){
    		var input = {};
   		 	if(!!$scope.input.arrivalPortID){input['containerRoute.arrivalPortID']=$scope.input.arrivalPortID;}
   		 	if(!!$scope.input.departurePortID){input['containerRoute.departurePortID']=$scope.input.departurePortID;}
   		 	if(!!$scope.input.fullTime){input['containerRoute.fullTime']=$scope.input.fullTime;}
   		 	if(!!$scope.input.shippingLineName){input['containerRoute.shippingLineName']=$scope.input.shippingLineName;}
   		 	if(!!$scope.input.status){input['containerRoute.status']=$scope.input.status;}
	   		if(!!$scope.input.type){input['containerRoute.type']=$scope.input.type;}
	   		if(!!$scope.input.weeklyShift){input['containerRoute.weeklyShift']=$scope.input.weeklyShift;}
		   	httpService.doPost('./struts/searchContainerRoute.action',input, function(ret){
			 	$scope.containerRoutes = ret.containerRoutes;
			 	$scope.$apply();
			});
    	};
    	var searchBulkload = function(){
    		var input = {};
   		 	if(!!$scope.input.arrivalPortID){input['bulkloadRoute.arrivalPortID']=$scope.input.arrivalPortID;}
   		 	if(!!$scope.input.departurePortID){input['bulkloadRoute.departurePortID']=$scope.input.departurePortID;}
   		 	if(!!$scope.input.fullTime){input['bulkloadRoute.fullTime']=$scope.input.fullTime;}
   		 	if(!!$scope.input.shippingLineName){input['bulkloadRoute.shippingLineName']=$scope.input.shippingLineName;}
   		 	if(!!$scope.input.status){input['bulkloadRoute.status']=$scope.input.status;}
	   		if(!!$scope.input.type){input['bulkloadRoute.type']=$scope.input.type;}
	   		if(!!$scope.input.stowageDay){input['bulkloadRoute.stowageDay']=$scope.input.stowageDay;}
	   		httpService.doPost('./struts/searchBulkloadRoute.action',input, function(ret){
				$scope.bulkloadRoute = ret.bulkloadRoute;
			 	$scope.$apply();
			 });
    	};
		 $scope.searchRoute = function(){
    		if($scope.input.typeSearch===2){
    			$scope.containerRoutes  =[];
    			searchBulkload();
    		}else if($scope.input.typeSearch===1){
    			$scope.bulkloadRoute = [];
    			searchContainer();
    		}else{
    			searchBulkload();
    			searchContainer();
    		}
    	};
    	
    	$scope.addGroup = function(id,type){
    		var input={
    				'joinGroup.groupType':type===1?'CONTAINER':'BULKLOAD',
    				'joinGroup.groupId':id
    		};
    		httpService.doPost('./struts/group_add.action',input, function(ret){
    			window.location="./createBidDoc.jsp?docid="+ret.biddocid;
    		});
    	};
    	init();
    }]);

})();