(function(){
	'use strict';
	 var name = $.cookie("language")||"cn";
	 var languageFile = name==='cn'?cn:en;
	 
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
		$scope.show={'showCurrent':'ng-hide','showCurrentFalse':'ng-hide'};
		$scope.showReady=false;
		var getField = function(index,name,value,type){
			index = index.split(',');
			name = name.split(',');
			
			if(type===1){
				var ret = {};
				for(var i = 0;i<index.length;i++){
					ret[name[Number(index[i])-1]]={
							'name' : 'field'+index[i],
							'value': value['field'+index[i]]||''
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
				if($scope.showCurrent)
					return;
				$scope.showCurrent=true;
				$scope.show.showCurrent = 'ng-show';
				$scope.show.showCurrentFalse = 'ng-hide';
				//getDom($scope.data.currentTimeLinePhaseRecord.fieldsName.split(','));
				return;
			}
			$scope.showCurrent=false;
			$scope.show.showCurrent = 'ng-hide';
			$scope.show.showCurrentFalse = 'ng-show';
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
			var nameInput ='';
			var input  = $scope.input;
			for(var i in input){
				nameInput = 'timeLineBean.'+input[i].name;
				input[nameInput]  =domJson[i].getValue(input[i].name);
			}
		/*	for(var i=0;i<fieldName.length;i++){
				selector = '#currentForm input[name="field'+(i+1)+'"]';
				if(!!!$(selector).val()){
					alertService.myAlert({"enName":"No data should be null!","cnName":"不能有空"}[name], "warning");
					return;
				}
				nameInput = 'timeLineBean.field'+(i+1);
				input[nameInput]  = $(selector).val();
			}*/
			input['timeLineBean.id'] = $scope.data.currentTimeLineRecord.id;
			httpService.doPost('./strtus/updateTimeLine.action',input, function(ret){
				window.history.go(0);
			});
		};
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
		};
		var generateDom = function(type,label,name,value,unit){
			switch(type){
			case('text'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><input type="text" name="'+name+'" value="'+value+'"/>'+unit+'</div>'+
				'</div>';
				break;
			case('date'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><input type="date" name="'+name+'" value="'+value+'"/>'+unit+'</div>'+
				'</div>';
				break;
			case('checkbox'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><input type="checkbox" name="'+name+'" value="checked" '+(value==='checked'?'checked/>':'/>')+unit+'</div>'+
				'</div>';
				break;
			case('radio'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><input type="radio" name="'+name+'" value="checked"  '+(value==='checked'?'checked/>':'/>')+unit+'</div>'+
				'</div>';
				break;
			case('number'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><input type="number" name="'+name+'" value="'+value+'"/>'+unit+'</div></div>';
				break;
			case('paymentType'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><input type="radio" name="'+name+'" value="prepaid" '+(value==='prepaid'?'checked/>':'/>')+'<font>prepaid</font>'
				+' <input type="radio" name="'+name+'" value="collect" '+(value==='collect'?'checked/>':'/>')+'<font>collect</font></div></div>';
				break;
			case('warehouseID'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><select name="'+name+'"><option value="1" '+(value==='1'?'selected':'')+'>1</option><option value="2" '+(value==='2'?'selected':'')+
						'>2</option></select></div></div>';
				break;
			case('cooperationType'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><select name="'+name+'"><option value="A" '+(value==='A'?'selected':'')+'>逐票</option><option value="B" '+(value==='B'?'selected':'')+
						'>长期</option></select></div></div>';
				break;
			case('cooperationWork'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><select name="'+name+'"><option value="A" '+(value==='A'?'selected':'')+'>填单申报</option><option value="B" '+(value==='B'?'selected':'')+
						'>辅助查验</option></select></div></div>';
				break;
			case('receiveDocCondition'):
				//A:合同，B:发票，C:装箱清单，D:提(运)单，E:加工贸易手册，F:许可证件，G:其他
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><input type="checkbox" name="'+name+'" value="A" '+(value.indexOf('A')>=0?'checked/>':'/>')+'<font>合同</font><input type="checkbox" name="'
				+name+'" value="B" '+(value.indexOf('B')>=0?'checked/>':'/>')+'<font>发票</font><input type="checkbox" name="'
				+name+'" value="C" '+(value.indexOf('C')>=0?'checked/>':'/>')+'<font>装箱清单</font><input type="checkbox" name="'
				+name+'" value="D" '+(value.indexOf('D')>=0?'checked/>':'/>')+'<font>提(运)单</font><input type="checkbox" name="'
				+name+'" value="E" '+(value.indexOf('E')>=0?'checked/>':'/>')+'<font>加工贸易手册</font><input type="checkbox" name="'
				+name+'" value="F" '+(value.indexOf('F')>=0?'checked/>':'/>')+'<font>许可证件</font><input type="checkbox" name="'
				+name+'" value="G" '+(value.indexOf('G')>=0?'checked/>':'/>')+'<font>其他</font></div></div>';
				break;
			case('transportType'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><select name="'+name+'"><option value="A" '+(value==='A'?'selected':'')+'>海运</option><option value="B" '+(value==='B'?'selected':'')+
						'>空运</option><option value="C" '+(value==='C'?'selected':'')+'>陆运</option></select></div></div>';
				break;
			case('traderType'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><select name="'+name+'"><option value="A" '+(value==='A'?'selected':'')+'>A</option><option value="B" '+(value==='B'?'selected':'')+
						'>B</option></select></div></div>';
				break;
			case('settlementWay'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><select name="'+name+'"><option value="A" '+(value==='A'?'selected':'')+'>A</option><option value="B" '+(value==='B'?'selected':'')+
						'>B</option></select></div></div>';
				break;
			case('transportType1'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><select name="'+name+'"><option value="CY-CY" '+(value==='CY-CY'?'selected':'')+'>CY-CY</option><option value="CFS-CFS" '+(value==='CFS-CFS'?'selected':'')+
						'>CFS-CFS</option></select></div></div>';
				break;
			case('paymentType1'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><select name="'+name+'"><option value="FREIGHT" '+(value==='FREIGHT'?'selected':'')+'>FREIGHT</option><option value="PREPAID" '+(value==='PREPAID'?'selected':'')+
						'>PREPAID</option></select></div></div>';
				break;
			case('conditions'):
				return '<div class="form-group">'+
				'<label class="control-label col-sm-3">'+label+':</label>'+
				'<div class="col-sm-4"><select name="'+name+'"><option value="A" '+(value==='A'?'selected':'')+'>A</option><option value="B" '+(value==='B'?'selected':'')+
						'>B</option></select></div></div>';
				break;
			}
		};
		var getValDefault = function(field){return $('#currentForm input[name="'+field+'"]').val();};
		var getValCheck = function(field){return !!($('#currentForm input[name="'+field+'"]:checked').val())?'checked':'unchecked';};
		var getValSelect = function(field){return ($('#currentForm select[name="'+field+'"]').val());};
		var domJson = {
				'documentRequest':{'type':'text','lable':'','getValue':getValDefault},
				'documentRequest':{'type':'text','lable':'','getValue':getValDefault},
				'documentReadyTime':{'type':'date','lable':'','getValue':getValDefault},
				'customsTaxNeeded':{'type':'checkbox','lable':'','getValue':getValCheck},
				'goodsReadyTime':{'type':'date','lable':'','getValue':getValDefault},
				'companySerialNO':{'type':'text','lable':'','getValue':getValDefault},
				'entrustTime':{'type':'date','lable':'','getValue':getValDefault},
				'shipper':{'type':'text','lable':'','getValue':getValDefault},
				'consignee':{'type':'text','lable':'','getValue':getValDefault},
				'notifyParty':{'type':'text','lable':'','getValue':getValDefault},
				'paymentType':{'type':'paymentType','lable':'','getValue':function(field){return ($('#currentForm input[name="'+field+'"]:checked').val());}},
				'mark_and_number':{'type':'text','lable':'','getValue':getValDefault},
				'remark':{'type':'text','lable':'','getValue':getValDefault},
				'ladingbillCount':{'type':'number','lable':'','getValue':getValDefault},
				'shipName':{'type':'text','lable':'','getValue':getValDefault},
				'ladingbillNo':{'type':'text','lable':'','getValue':getValDefault},
				'portDeadline':{'type':'date','lable':'','getValue':getValDefault},
				'boxNum':{'type':'text','lable':'','getValue':getValDefault},
				'driveTel':{'type':'text','lable':'','getValue':getValDefault},
				'deliveryNum':{'type':'text','lable':'','getValue':getValDefault},
				'goodsNum':{'type':'text','lable':'','getValue':getValDefault},
				'shippingDate':{'type':'date','lable':'','getValue':getValDefault},
				'warehousingNo':{'type':'text','lable':'','getValue':getValDefault},
				'declarationDeadLine':{'type':'date','lable':'','getValue':getValDefault},
				'warehousingDeadLine':{'type':'date','lable':'','getValue':getValDefault},
				'warehouseID':{'type':'warehouseID','lable':'','getValue':getValSelect},
				'traderProxyNo':{'type':'text','lable':'','getValue':getValDefault},
				
				'traderpackingPhotos':{'type':'text','lable':'','getValue':getValDefault},//重做
				'transwarehousePhotos':{'type':'text','lable':'','getValue':getValDefault},//重做
				
				'consignorConfirm':{'type':'checkbox','lable':'','getValue':getValCheck},
				'enterPortTime':{'type':'date','lable':'','getValue':getValDefault},
				'customsDeclFormConfirm':{'type':'checkbox','lable':'','getValue':getValCheck},
				'invoiceConfirm':{'type':'checkbox','lable':'','getValue':getValCheck},
				'packingListConfirm':{'type':'checkbox','lable':'','getValue':getValCheck},
				'declareProxyConfirm':{'type':'checkbox','lable':'','getValue':getValCheck},
				'inspectionProxyConfirm':{'type':'checkbox','lable':'','getValue':getValCheck},
				'expressNO':{'type':'text','lable':'','getValue':getValDefault},
				
				//重做，这个页面比较复杂
				'marks':{'type':'text','lable':'','getValue':getValDefault},
				'tradeMode':{'type':'text','lable':'','getValue':getValDefault},
				'portName':{'type':'text','lable':'','getValue':getValDefault},
				
				'cooperationType':{'type':'cooperationType','lable':'','getValue':getValSelect},
				'cooperationWork':{'type':'cooperationWork','lable':'','getValue':getValSelect},
				'cooperationTime':{'type':'date','lable':'','getValue':getValDefault},
				'entrustParty':{'type':'text','lable':'','getValue':getValDefault},
				'mainGoodsName':{'type':'text','lable':'','getValue':getValDefault},
				'goodsHSCode':{'type':'text','lable':'','getValue':getValDefault},
				'goodsTotalPrice':{'type':'text','lable':'','getValue':getValDefault},
				'export_or_importTime':{'type':'date','lable':'','getValue':getValDefault},
				'traderType':{'type':'text','lable':'','getValue':getValDefault},
				'goodsSupport':{'type':'text','lable':'','getValue':getValDefault},
				'entrustPartyRemark':{'type':'text','lable':'','getValue':getValDefault},
				'trustee':{'type':'text','lable':'','getValue':getValDefault},
				'declareDocNO':{'type':'text','lable':'','getValue':getValDefault},
				'ladingBillNO':{'type':'text','lable':'','getValue':getValDefault},
				'receiveDocTime':{'type':'date','lable':'','getValue':getValDefault},
				'receiveDocCondition':{'type':'receiveDocCondition','lable':'','getValue':function(field){var ret = "";var doms =$('#currentForm input[name="field16"]:checked');for(var i=0;i<doms.length;i++){ret+=doms[i].value};return ret;}},
				'declareFee':{'type':'number','lable':'RMB','getValue':getValDefault},
				'trusteeRemark':{'type':'text','lable':'','getValue':getValDefault},
				'businessUnits':{'type':'text','lable':'','getValue':getValDefault},
				'transportType':{'type':'transportType','lable':'','getValue':getValSelect},
				'deliveryUnit':{'type':'text','lable':'','getValue':getValDefault},
				'traderType':{'type':'traderType','lable':'','getValue':getValSelect},
				'settlementWay':{'type':'settlementWay','lable':'','getValue':getValSelect},
				'licenseNO':{'type':'text','lable':'','getValue':getValDefault},
				'goodsSupport':{'type':'text','lable':'','getValue':getValDefault},
				'dealType':{'type':'text','lable':'','getValue':getValDefault},
				'freight':{'type':'number','lable':'RMB','getValue':getValDefault},
				'insuranceFee':{'type':'number','lable':'RMB','getValue':getValDefault},
				'surcharge':{'type':'number','lable':'RMB','getValue':getValDefault},
				'contractNO':{'type':'text','lable':'','getValue':getValDefault},
				'accompanyDoc':{'type':'text','lable':'','getValue':getValDefault},
				'mark':{'type':'text','lable':'','getValue':getValDefault},
				'declareElements':{'type':'text','lable':'','getValue':getValDefault},
				'uarantineBureauName':{'type':'text','lable':'','getValue':getValDefault},
				'companyCode':{'type':'text','lable':'','getValue':getValDefault},
				'importOrExportTime':{'type':'text','lable':'','getValue':getValDefault},
				'goodsName':{'type':'text','lable':'','getValue':getValDefault},
				'amountOrWeight':{'type':'text','lable':'','getValue':getValDefault},
				'packageCondition':{'type':'text','lable':'','getValue':getValDefault},
				'contractNumber':{'type':'text','lable':'','getValue':getValDefault},
				'licenseFileNo':{'type':'text','lable':'','getValue':getValDefault},
				'goodsConsigneeAddress':{'type':'text','lable':'','getValue':getValDefault},
				'goodsWayOrLadingNO':{'type':'text','lable':'','getValue':getValDefault},
				'otherRequest':{'type':'text','lable':'','getValue':getValDefault},
				'registerNO':{'type':'text','lable':'','getValue':getValDefault},
				'otherRemark':{'type':'text','lable':'','getValue':getValDefault},
				'attorneyValidTime':{'type':'text','lable':'','getValue':getValDefault},
				'customsDeclaTime':{'type':'date','lable':'','getValue':getValDefault},
				'customsDeclaDeadline':{'type':'date','lable':'','getValue':getValDefault},
				'customsDeclaProblems':{'type':'text','lable':'','getValue':getValDefault},
				'ladingBillConfirm':{'type':'checkbox','lable':'','getValue':getValCheck},
				'insuranceConfirm':{'type':'checkbox','lable':'','getValue':getValCheck},
				'telexRelease':{'type':'checkbox','lable':'','getValue':getValCheck},
				'sender':{'type':'text','lable':'','getValue':getValDefault},
				'loadBillType':{'type':'text','lable':'','getValue':getValDefault},
				'note':{'type':'text','lable':'','getValue':getValDefault},
				'transportType1':{'type':'transportType1','lable':'','getValue':getValSelect},
				'paymentType1':{'type':'paymentType1','lable':'','getValue':getValSelect},
				'invoiceNO':{'type':'text','lable':'','getValue':getValDefault},
				'creditDocNO':{'type':'text','lable':'','getValue':getValDefault},
				'invoiceAmount':{'type':'number','lable':'','getValue':getValDefault},
				'premium':{'type':'number','lable':'','getValue':getValDefault},
				'conditions':{'type':'conditions','lable':'','getValue':getValSelect},
				'payablePosition':{'type':'text','lable':'','getValue':getValDefault},
				'shipmentTime':{'type':'date','lable':'','getValue':getValDefault},
				
				//issueDocScannerAttchment,expressNO 较为复杂，可能需要上传
				'issueDocScannerAttchment':{'type':'text','lable':'','getValue':getValDefault},
				'expressNO':{'type':'text','lable':'','getValue':getValDefault},
				
				'latitude':{'type':'text','lable':'','getValue':getValDefault},
				'longtitude':{'type':'text','lable':'','getValue':getValDefault},
				
		};
		var getDom = function(){
			var form = $('#currentForm');
			var dom="";
			var input  = $scope.input;
			var j=0;
			for(var i in input){
				console.log(i);
				dom=dom.concat(generateDom(domJson[i].type,languageFile[i],input[i].name,input[i].value,domJson[i].lable));
				j++;
			}
			form.append($(dom));
		};
		if(docid<0){
			alertService.myAlert({'cnName':'参数错误','enName':'parameters error!'}[name], "error");
		}else{
			httpService.doPost('./struts/getCurrentStep.action', {'bidDocId':docid}, function(ret){
				ret.specificStepEasyInfor = ret.specificStepEasyInfor.slice(0,ret.specificStepEasyInfor.length-1).reverse();
				$scope.data = ret;
				$scope.input = getField(ret.currentTimeLinePhaseRecord.fieldsIndex,ret.currentTimeLinePhaseRecord.fieldsName,ret.currentTimeLineRecord,1);
				getDom(ret.currentTimeLinePhaseRecord.fieldsName.split(','));
				$scope.showReady = true;
				$scope.$apply();
			});
		}
	}]);
})();
	