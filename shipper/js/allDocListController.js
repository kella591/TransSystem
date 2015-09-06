(function(){
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
	
	haiyunControllers.controller('allDocListCtrl', ['$scope','httpService','alertService', function($scope,httpService,alertService) {
		$scope.name = name;
		$scope.dataList = {};
		$scope.tempData = {};
		$scope.input = {};
		var temp = [{'cnName':'--','enName':'--'}];
		var init = function(){
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
			//$scope.searchBidDoc();
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
		$scope.page = 1;
		$scope.state = null;
		$scope.stateList = [
			{'name':{'cnName':'待投标','enName':'Waiting_Bid'}[name],'value':'WAITING_BIDS'},
			{'name':{'cnName':'洽谈中','enName':'NEGOTIATION'}[name],'value':'NEGOTIATION'},
			{'name':{'cnName':'可竞标','enName':'WAITING_OR_NEGOTIATION'}[name],'value':'WAITING_OR_NEGOTIATION'}
		                    ];
		$scope.pageSize = 1;
		var size = 10;
		var getDocList = function(){
			
			var input = {
				'start':$scope.page*size-size,
				'limit':size,
				'biddoc.state':'WAITING_OR_NEGOTIATION',//'WAITING_OR_NEGOTIATION'
				'biddoc.docType':'TRADER'
			};
			//!!!$scope.state||$scope.state==='ALL'?{}:input['biddoc.state'] = $scope.state;
			
			httpService.doPost('./struts/getAllBidDocList.action', input, function(ret){
	    			$scope.docList = ret.biddocs;
	    			$scope.pageSize = Math.ceil(ret.totalEntities/size);
	    			$scope.$apply();
			});
		};
		
		$scope.docList = [];
		
		$scope.changeState = function(){
			getDocList();
		};
		
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
	    	getDocList();
	    };
	    
		getDocList();
	}]);
})();
	