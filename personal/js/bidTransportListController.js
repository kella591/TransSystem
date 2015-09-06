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
	
	haiyunControllers.controller('bidTransportListController', ['$scope','httpService', function($scope,httpService) {
		$scope.page = 1;
		$scope.pageSize = 1;
		var size = 10;
		var docid = $scope.docid = $('#docid')[0].value||-1;
		var type = $('#type')[0].value||1;
		var getTransportList = function(){
			
			var input = {
					'start':$scope.page*size-size,
					'limit':size,
					'biddoc.id':docid
			};
			if(type==1){
				httpService.doPost('./struts/getBidTransportList.action', input, function(ret){
					for(var i = 0;i<ret.offerTransportList.length;i++){
						$scope.transportList[i] = $.extend(ret.offerTransportList[i],ret.bidOfferInfors[i]);;
					}
	    			$scope.pageSize = Math.ceil(ret.totalEntries/size);
	    			$scope.$apply();
				});
			}else if(type==2){
				httpService.doPost('./struts/getProposalTransporters.action', input, function(ret){
					$scope.transportList = ret.transporters;
	    			$scope.pageSize = Math.ceil(ret.totalEntries/size);
	    			$scope.$apply();
				});
			}
			
		};
		
		$scope.transportList = [];
		$scope.phoneList = {};
		$scope.evaluate = {};
		$scope.stateList=[{'value':'UNDETERMINED','name':{'cnName':'待定','enName':'UNDETERMINED'}[name]},{'value':'GOT','name':{'cnName':'已中标','enName':'GOT'}[name]},{'value':'NEGOTIATION','name':{'cnName':'洽谈中','enName':'NEGOTIATION'}[name]},{'value':'MISS','name':{'cnName':'未中标','enName':'MISS'}[name]}];
		$scope.getPhone  = function(id){
			httpService.doPost('./struts/getTransportContact.action', {'bidOffer.userID':id,'biddoc.id':docid}, function(ret){
				$scope.phoneList[id] = ret.transport.email+"|"+ret.transport.telephone;
				$scope.$apply();
			});
		};
		$scope.evaluateUser  = function(userId){
			$scope.evaluate = {'id':userId};
			
		};
		$scope.subEva= function(a){
				console.log($scope.evaluate);
				$('#myModalClose').click();
		};
		$scope.changeState = function(id,state){
			httpService.doPost('./struts/updateBidOfferState.action', {'bidOffer.id':id,'bidOffer.state':state.value}, function(ret){
				alert("修改成功！");
			});
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
	    	getTransportList();
	    };
	    
	    getTransportList();
	}]);
})();
	