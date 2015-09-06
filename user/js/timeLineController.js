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
	
	haiyunControllers.controller('timeLineController', ['$scope','httpService','alertService', function($scope,httpService,alertService) {
		$scope.name = name;
		var docid = $('#docid')[0].value||-1;
		
		$scope.formShow = {'name':false,'height':false,'width':false,'weight':false,'volume':false,'packing':false,'sub':false};
		$scope.showCurrent=true;
		
		var getField = function(index,name,value,type){
			index = index.split(',');
			name = name.split(',');
			
			if(type===1){
				var ret = {};
				for(var i = 0;i<index.length;i++){
					ret[name[Number(index[i])-1]]={
							'name' : 'field'+index[i],
							'value': value['field'+index[i]]
					};
					$scope.formShow[name[Number(index[i])-1]] = true;
					$scope.formShow['sub'] = true;
				}
				return ret;
			}
			else if(type===2){
				var ret =[];
				for(var i = 0;i<index.length;i++){
					ret[i] = {
						'name' : name[Number(index[i])-1],
						'value': value['field'+index[i]]
					}
				}
				return ret;
			}
		};

		$scope.showStep = function(step){
			if(step<0){
				$scope.showCurrent=true;
				return;
			}
			$scope.showCurrent=false;
			httpService.doPost('./struts/getSpecificStep.action', {'bidDocId':docid,'stepIndex':step}, function(ret){
				$scope.step = ret;
				$scope.step.fields = getField(ret.specificTimeLinePhase.fieldsIndex,ret.specificTimeLinePhase.fieldsName,ret.specificTimeLine,2);
				$scope.$apply();
			});
		};
		$scope.initPackStyle = function(){
			$scope.packingStyle = [{'id':1,'cnName':'类别1','enName':'type1'},{'id':2,'cnName':'类别2','enName':'type2'},{'id':-1,'cnName':'其他','enName':'other'}];
		};
		$scope.subForm = function(){
			var input = {};
			var fieldName = $scope.data.currentTimeLinePhaseRecord.fieldsName.split(',');
			var name ='';
			for(var i=0;i<fieldName.length;i++){
				if($scope.input[fieldName[i]].value!=$scope.data.currentTimeLineRecord[fieldName[i].name]){
					name = 'timeLineBean.'+$scope.input[fieldName[i]].name;
					input[name]  = $scope.input[fieldName[i]].value;
				}
			}
			if($.isEmptyObject(input)){
				alertService.myAlert({"enName":"No change happen!","cnName":"未做修改"}[name], "warning");
        		return;
        	}
			//input['timeLineBean.bidDocId'] = docid;
			//input['timeLineBean.stepIndex'] = $scope.data.currentTimeLinePhaseRecord.stepIndex;
			input['timeLineBean.id'] = $scope.data.currentTimeLinePhaseRecord.id;
			httpService.doPost('./strtus/addTimelineData.action',input, function(ret){
				alertService.myAlert({"enName":"Success!","cnName":"成功"}[name], "success");
			});
		}
		$scope.subFee = function(){
			if(!!$scope.extraFeeCount&&!!$scope.extraFeeText){
				var input = {
						'fee.timelineId':docid,
						'fee.feeCount':$scope.extraFeeCount,
						'fee.remark':$scope.extraFeeText
				}
				httpService.doPost('./strtus/addExtraFee.action',input, function(ret){
					alertService.myAlert({"enName":"Success!","cnName":"成功"}[name], "success");
				});
			}
		}
		
		if(docid<0){
			alertService.myAlert({'cnName':'参数错误','enName':'parameters error!'}[name], "error");
		}else{
			httpService.doPost('./struts/getCurrentStep.action', {'bidDocId':docid}, function(ret){
				ret.specificStepEasyInfor = ret.specificStepEasyInfor.slice(1);
				$scope.data = ret;
				$scope.input = getField(ret.currentTimeLinePhaseRecord.fieldsIndex,ret.currentTimeLinePhaseRecord.fieldsName,ret.currentTimeLineRecord,1);
				$scope.$apply();
			});
		}
	}]);
})();
	