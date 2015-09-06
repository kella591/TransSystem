(function(){
	'use strict';
	 var name = $.cookie("language")||"cn";
		if(name==="undefined"){
			name = "cn";
		};
	    var haiyun = angular.module('haiyun', ['ngRoute','pascalprecht.translate','haiyunControllers','haiyunServices']);
	    haiyun.config(function($translateProvider) {
			 $translateProvider.translations('en',en).translations('cn',cn);
			 $translateProvider.preferredLanguage(name);
			 name = name+"Name";
	    }).config(function($sceProvider){
			 $sceProvider.enabled(false);
	    });

	var haiyunControllers = angular.module('haiyunControllers', []);
	
	haiyunControllers.controller('docListController', ['$scope','httpService', function($scope,httpService) {
		$scope.name = name;
		$scope.page = 1;
		$scope.state = null;
		$scope.stateList = [
		                    {'name':{'cnName':'全部','enName':"All"}[name],'value':'ALL'},
		                    {'name':{'cnName':'草稿','enName':"Draft"}[name],'value':'DRAFT'},
		                    {'name':{'cnName':'待投标','enName':"Bidding"}[name],'value':'WAITING_BIDS'},
		                    {'name':{'cnName':'洽谈中','enName':"Talk"}[name],'value':'NEGOTIATION'},
		                    {'name':{'cnName':'进行中','enName':"Going"}[name],'value':'GOING'},
		                    {'name':{'cnName':'已完成','enName':"Compelete"}[name],'value':'DONE'},
		                    {'name':{'cnName':'已撤销','enName':"Revert"}[name],'value':'WITHDRAW'},
		                    {'name':{'cnName':'已流标','enName':"Lose"}[name],'value':'FAILEDBIDS'}
		                    ];
		$scope.pageSize = 1;
		var size = 10;
		var getDocList = function(){
			
			var input = {
					'start':$scope.page*size-size,
					'limit':size,
					'biddoc.docType':'PERSONAL'
			};
			!!!$scope.state||$scope.state==='ALL'?{}:input['biddoc.state'] = $scope.state;
			
			httpService.doPost('./struts/getPersonalBidDocList.action', input, function(ret){
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
	