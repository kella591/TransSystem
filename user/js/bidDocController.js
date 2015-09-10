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
	
	 haiyunControllers.controller('addBidBookCtrl', ['$scope','redirectService','httpService','alertService', function($scope,redirectService,httpService,alertService) {
		 var docid = $('#docid')[0].value;
		 $scope.name=name;
		 //define data struct needed
		 $scope.docData = {};
		 $scope.goodData  = {};
		 $scope.goodList = [];
		 $scope.booleanData = {};
		 $scope.dataList  ={};
		 $scope.tempData = {};
		 
		 var initData = function(){
			 if(docid>0){
				 httpService.doPost('./struts/viewBidDoc.action',{"biddoc.id":docid}, function(ret){
					 initDocData(ret.biddoc);
					 $scope.tempData.biddoc = $.extend({},ret.biddoc);
					 initTempData();
					 initDataList();
					 initBooleanData();
					 $scope.goodList  = ret.goods;
					 checkSubmit(ret.biddoc.boxedType.value===1||ret.biddoc.boxedType.value===7);
				},true);
			 }else{
				 initDocData();
				 initDataList();
				 initBooleanData();
				 initTempData();
				 $scope.tempData.biddoc={};
				 $scope.tempData.ngHide=!!!$scope.tempData.biddoc.departPort?'ng-show':'ng-hide';
			 }
		 };
		 
		 
		 //init bidDoc with doc, set to default with null input
		var initDocData = function(doc){
			if(doc){
				 $scope.docData = doc;
			 }else{
				 $scope.docData = {
						 'departurePortID': 0,
						 'arrivalPortID': 0,
						 'transportTime': 0,
						 'validateTime': 0,
						 'departureDate': '',
						 'arrivalDate': '',
						 'paymentDate': '',
						 'transportModeID': 0,
						 'transportType': 0,
						 'boxedType': 0,
						 'containerID': null,
						 'containerCount': 0,
						 'dangerousTip': null,
						 'qhfs':null,
						 'hwbhsj':'',
						 'ckdz':'',
						 'id': -1
				 };
			 }
			 
		 };
		 
		 //init goodData struct with good given, set to default value with null input
		 var initgoodData = function(good){
			 if(good){
				 $scope.goodData = good;
			 }else{
				 $scope.goodData = {
						 'id':0,
						 'biddingDocumentID':$scope.docData.id,
						 'goodsClass1ID':0,
						 'goodsClass2ID':0,
						 'name':'',
						 'description':'',
						 'count':0,
						 'grossWeight':0,
						 'volume':0,
						 'length':0,
						 'width':0,
						 'height':0,
						 'isDangerous':false,
						 'dangerousClassID':0,
						 'dangerousPACKINGGROUP':0,
						 'dangerousUNNO':'',
						 'trueName':'',
						 'trueGoodsClassID1':'',
						 'trueGoodsClassID2':'',
						 'packingStyleID':'',
						 'packingStyleOther':''
				 };
			 }
		 };
		 
		 var temp = [{'cnName':'--','enName':'--'}];
		 //init dataList needed:portZeroLevel, portFirstLevel{'departure','arrival'}, portSecondLevel{'departure','arrival'}, validateTime, transModeList, tranType, boxType,containerList 
		 var initDataList = function(){
			 //port
			httpService.doPost('./struts/searchPort.action', {'port.id':0,'port.level':'AREA'}, function(ret){
				 $scope.dataList.portZeroLevel = ret.ports;
		    });
			
			 $scope.dataList.departurePortFirstLevel = temp;
			 $scope.dataList.departurePortSecondLevel = temp;
			 $scope.dataList.arrivalPortFirstLevel = temp;
			 $scope.dataList.arrivalPortSecondLevel = temp;
			 
			 //validateTime
			 $scope.dataList.validateTime = [{'label':'1小时','value':1},{'label':'2小时','value':2},{'label':'6小时','value':6},{'label':'12小时','value':12},{'label':'1天','value':24},{'label':'2天','value':48},{'label':'3天','value':72},{'label':'7天','value':168}];
	    		
			//transMode
			 httpService.doPost('./struts/getTransportMode.action', {'id':0}, function(ret){
				 $scope.dataList.transMode = ret.transportModes;
			 });
			 
			 //transType SEA海运 AIR空运 LAND公路 RAILWAY铁路
			 $scope.dataList.transType  = [{'value':'SEA','name':'海运'},{'value':'AIR','name':'空运'},{'value':'LAND','name':'汽车'},{'value':'RAILWAY','name':'火车'}];
			 
			 //boxType
			 $scope.dataList.boxType =
					 {
		    			'SEA':[{'class':1,'name':'整柜'},{'class':2,'name':'拼箱'},{'class':3,'name':'散杂货'}],
		    			'AIR':[{'class':4,'name':'托盘'},{'class':5,'name':'非托盘'}],
		    			'LAND':[],
		    			'RAILWAY':[{'class':7,'name':'集装箱'},{'class':8,'name':'平板车'},{'class':9,'name':'敞车'}]
		    		};
			 $scope.dataList.containerType = [];
			 if(!!$scope.tempData.biddoc&&!!$scope.tempData.biddoc.boxedType&&!!!$scope.tempData.biddoc.container){$scope.selectType();}
			 
			 //goodsClassList1
			 httpService.doPost('./struts/goodsClassList.action', {'pid':0}, function(ret){
        			$scope.dataList.goodsClassList1 = ret.goodsClass;
        			$scope.$apply();
	        });
			$scope.dataList.goodsClassList2 = [];	
			
			$scope.dataList.trueGoodsClassList2 = [];
			
			$scope.dataList.dangerousClass = [{'id':1,'name':'1'},{'id':2,'name':'2'},{'id':3,'name':'3'},{'id':4,'name':'4'}]
			
			$scope.dataList.packGroup = [{'id':1,'name':'I'},{'id':2,'name':'II'},{'id':3,'name':'III'}];
			
			$scope.dataList.qhfsType = [{'value':'SHANGMEN','name':{'cnName':'上门取货','enName':'quHuo'}[name]},{'value':'SONGHUO','name':{'cnName':'送货入库','enName':'songHuo'}[name]}];
			
			$scope.dataList.packingStyle = [{'id':1,'cnName':'类别1','enName':'type1'},{'id':2,'cnName':'类别2','enName':'type2'},{'id':-1,'cnName':'其他','enName':'other'}];
		 };
		 
		 //init boolean data: goodFormShow,containerShow,
		 var initBooleanData = function(){
			 $scope.booleanData = {
					'goodFormShow':false,
			 		'containerShow':false,
			 		'docChoose':docid>0,
			 		'recommendShow':false
			 };
		 };
		 
		 //init port{'dep':{'zero','fr',''},'ar':{'','',''}} , max, container
		 var initTempData = function(){
			 $scope.tempData.port = {
					 'departure' : {'zero':-1,'first':-1},
					 'arrival' : {'zero':-1,'first':-1}
			 };
			 
			 $scope.tempData.max = {
		    			'length':0,
		    			'width':0,
		    			'height':0,
		    			'weight':0,
		    			'volume':0
		    		};
			 $scope.tempData.submit = {
					 'state':false,
					 'msg':""
			 };
			 $scope.tempData.showSelect = {
					 	'departPort':!!$scope.tempData.biddoc&&!!$scope.tempData.biddoc.departPort?'ng-hide':'ng-show',
						'arrivalPort':!!$scope.tempData.biddoc&&!!$scope.tempData.biddoc.arrivalPort?'ng-hide':'ng-show',
						'transportMode':!!$scope.tempData.biddoc&&!!$scope.tempData.biddoc.transportMode?'ng-hide':'ng-show',
						'transporType':!!$scope.tempData.biddoc&&!!$scope.tempData.biddoc.transporType?'ng-hide':'ng-show',
						'boxedType':!!$scope.tempData.biddoc&&!!$scope.tempData.biddoc.boxedType?'ng-hide':'ng-show',
						'containerType':!!$scope.tempData.biddoc&&!!$scope.tempData.biddoc.containerType?'ng-hide':'ng-show',
						'goodsClass2':!!$scope.tempData.biddoc&&!!$scope.tempData.biddoc.goodsClass2?'ng-hide':'ng-show',
						'trueGoodsClass2':!!$scope.tempData.biddoc&&!!$scope.tempData.biddoc.trueGoodsClass2?'ng-hide':'ng-show'
			};
		 };
		 
		 //select date
		 $scope.selectDate = function(){
			 if(!!$scope.docData.departureDate&&!!$scope.docData.arrivalDate){
				 var tmpBeginTime = new Date($scope.docData.departureDate.replace(/-/g, "\/")); //时间转换
			     var tmpEndTime = new Date($scope.docData.arrivalDate.replace(/-/g, "\/")); //时间转换
			     var days = ((tmpEndTime - tmpBeginTime) / (1000 * 60 * 60 * 24));
			     $scope.docData.transportTime = days>0?days:0;
			 }
		 }
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
		 
		 var checkSubmit = function(type){
			 $scope.tempData.submit.state = false;
			 $scope.tempData.submit.msg = '验证不通过，请检查输入数据';
			 switch($scope.docData.boxedType){
			 case 1:
				 $scope.booleanData.containerShow = true;
				 if(type){
					 httpService.doPost('./struts/getContainerByClassAndType.action',{'container.loadingClass':1,'container.type':'COMMON'}, function(ret){
	        			 $scope.dataList.containerType=ret.containers;
	        			 $scope.$apply();
	 	        	});
				 }
				 else{
					 $scope.selectContainer();
				 }
 				break;
			 case 2:
				 $scope.booleanData.containerShow = false;
				 $scope.$apply();
				 if(type){
				 httpService.doPost('./struts/getContainerById.action',{'container.id':20}, function(ret){
					 if($scope.tempData.max.height>ret.container.height || $scope.tempData.max.width>ret.container.width || $scope.tempData.max.length>ret.container.length)
        			 {
						 $scope.tempData.submit.msg = "商品超限，无法做海运拼箱，请走框架箱或者散杂货船（不允许拼箱的选择)";
						 alertService.myAlert("商品超限，无法做海运拼箱，请走框架箱或者散杂货船（不允许拼箱的选择)", "error");
						 return;
        			 }
					 $scope.docData.containerID = ret.container;
				 });}else{
					 $scope.selectContainer();
				 }
				 break;
			 case 3:
				 if($scope.tempData.max.weight>30){
					 $scope.tempData.submit.msg = "可能需要重吊车！";
					 $scope.tempData.submit.state = true;
					 alertService.myAlert("可能需要重吊车！", "warning");
 				}
 				$scope.booleanData.containerShow = false;
 				$scope.$apply();
				 break;
			 case 4:
				 if(type){
					 httpService.doPost('./struts/getContainerByClassAndType.action',{'container.loadingClass':4,'container.type':'COMMON'}, function(ret){
						 if($scope.tempData.max.height>ret.containers[0].height || $scope.tempData.max.width>ret.containers[0].width || $scope.tempData.max.length>ret.containers[0].length)
						 {
							 $scope.tempData.submit.msg = ret.containers[0].tips;
							 alertService.myAlert(ret.containers[0].tips, "warning");
						 }
						 $scope.tempData.submit.state = true;
						 $scope.docData.containerID = ret.containers[0];
					 });
				 }else{
					 $scope.selectContainer();
				 }
				 break;
			 case 5:
				 if(type){
					 httpService.doPost('./struts/getContainerByClassAndType.action',{'container.loadingClass':5,'container.type':'COMMON'}, function(ret){
						 if($scope.tempData.max.height>ret.containers[0].height || $scope.tempData.max.width>ret.containers[0].width || $scope.tempData.max.length>ret.containers[0].length)
						 {
							 $scope.tempData.submit.msg = ret.containers[0].tips;
							 alertService.myAlert(ret.containers[0].tips, "warning");
						 }
						 $scope.tempData.submit.state = true;
						 $scope.docData.containerID = ret.containers[0];
					 });
				 }else{
					 $scope.selectContainer();
				 }
				 break;
			 case 6:
				 $scope.tempData.submit.msg = "";
				 $scope.tempData.submit.state = true;
				 $scope.booleanData.containerShow = false;
				 $scope.$apply();
				 break;
			 case 7:
				 if(type){
					 $scope.booleanData.containerShow = true;
					 httpService.doPost('./struts/getContainerByClassAndType.action',{'container.loadingClass':7,'container.type':'COMMON'}, function(ret){
						 $scope.dataList.containerType=ret.containers;
						 $scope.$apply();
					 });
				 }else{
					 $scope.selectContainer();
				 }
				 break;
			 case 8:
				 $scope.booleanData.containerShow = false;
				 $scope.$apply();
				 if(type){
					 httpService.doPost('./struts/getContainerByClassAndType.action',{'container.loadingClass':8,'container.type':'COMMON'}, function(ret){
						 if($scope.tempData.max.height>ret.containers[0].height || $scope.tempData.max.width>ret.containers[0].width || $scope.tempData.max.length>ret.containers[0].length)
						 {
							 $scope.tempData.submit.msg = ret.containers[0].tips;
							 alertService.myAlert(ret.containers[0].tips, "warning");
						 }
						 $scope.tempData.submit.state = true;
						 $scope.docData.containerID = ret.containers[0];
					 });
				 }else{
					 $scope.selectContainer();
				 }
				 break;
			 case 9:
				 $scope.booleanData.containerShow = false;
				 $scope.$apply();
				 if(type){
					 httpService.doPost('./struts/getContainerByClassAndType.action',{'container.loadingClass':9,'container.type':'COMMON'}, function(ret){
						 if($scope.tempData.max.height>ret.containers[0].height || $scope.tempData.max.width>ret.containers[0].width || $scope.tempData.max.length>ret.containers[0].length)
						 {
							 $scope.tempData.submit.msg = ret.containers[0].tips;
							 alertService.myAlert(ret.containers[0].tips, "warning");
						 }
						 $scope.tempData.submit.state = true;
						 $scope.docData.containerID = ret.containers[0];
					 });
				 }else{
					 $scope.selectContainer();
				 }
				 break;
			 }
		 };
		 //select boxed type
		 $scope.selectType = function(){
			 checkSubmit(true);
		 };
		 //mail transports
		 $scope.mailTrans = function(){
			 httpService.doPost('./struts/sendMsgToProposalTransporters.action',{'biddoc.id':$scope.docData.id},function(ret){
				 alertService.myAlert("^-^,success!", "success");
			 }); 
		 };
		 
		 $scope.selectContainer = function(){
			 if(($scope.tempData.max.height!=0||$scope.tempData.max.width!=0||$scope.tempData.max.length!=0)&&!!$scope.docData.containerID){
				if($scope.tempData.max.height>$scope.docData.containerID.height || $scope.tempData.max.width>$scope.docData.containerID.width || $scope.tempData.max.length>$scope.docData.containerID.length || $scope.tempData.max.volume>$scope.docData.containerID.volume || $scope.tempData.max.weight>$scope.docData.containerID.loadbearing)
     			{
					if($scope.docData.containerID.force===1){
						$scope.tempData.submit.msg = '集装箱无法装载，请更换集装箱类别';
						$scope.tempData.submit.state = false;
						alertService.myAlert('集装箱无法装载，请更换集装箱类别', "error");
						$scope.docData.containerID = null;
					}else{
						$scope.tempData.submit.msg = $scope.docData.containerID.tips;
						$scope.tempData.submit.state = true;
						alertService.myAlert($scope.docData.containerID.tips, "warning");
					}
					return;
     			}
			 }
			 $scope.tempData.submit.state = true;
		 };
		 
		 $scope.addGood = function(){
			 initgoodData();
			 $scope.booleanData.goodFormShow = true;
		 };
		 
		 $scope.selectGoodsClass = function(type){
			 switch(type){
			 case 1:
				 if(!!!$scope.dataList.trueGoodsClassID1){
					 $scope.dataList.trueGoodsClassList1 = $scope.dataList.goodsClassList1;
					 $scope.dataList.trueGoodsClassList2 = [];
					 $scope.goodData.trueGoodsClassID1 = $scope.goodData.goodsClass1ID;
					 $scope.goodData.trueGoodsClassID2 = {};
				 }
				 httpService.doPost('./struts/goodsClassList.action', {'pid':$scope.goodData.goodsClass1ID}, function(ret){
	        			$scope.dataList.goodsClassList2 = ret.goodsClass;
	        			$scope.$apply();
		        	});
				 break;
			 case 2:
				 httpService.doPost('./struts/goodsClassList.action', {'pid':$scope.goodData.trueGoodsClassID1}, function(ret){
	        			$scope.dataList.trueGoodsClassList2 = ret.goodsClass;
	        			$scope.$apply();
		        	});
				 break;
			 case 3:
				 if(!!!$scope.dataList.trueGoodsClassID2){
					 $scope.dataList.trueGoodsClassList2 = $scope.dataList.goodsClassList2;
					 $scope.goodData.trueGoodsClassID1 = $scope.goodData.goodsClass1ID;
					 $scope.goodData.trueGoodsClassID2 = $scope.goodData.goodsClass2ID;
				 }
			 }
			 
		 };
		 
		 $scope.addGoodSub = function(){
			if($scope.docData.id<=0){
				return;
			}
			 var inputData = {
				'goods.biddingDocumentID':$scope.docData.id,
				'goods.goodsClass1ID':$scope.goodData.goodsClass1ID,
       			'goods.goodsClass2ID':$scope.goodData.goodsClass2ID.id,
        		'goods.name':$scope.goodData.name,
        		'goods.description':$scope.goodData.description,
       			'goods.count':$scope.goodData.count,
       			'goods.grossWeight':$scope.goodData.grossWeight,
       			'goods.volume':$scope.goodData.volume,
       			'goods.length':$scope.goodData.length,
       			'goods.width':$scope.goodData.width,
       			'goods.height':$scope.goodData.height,
       			'goods.dangerousPACKINGGROUP':$scope.goodData.dangerousPACKINGGROUP,
       			'goods.dangerousUNNO':$scope.goodData.dangerousUNNO,
       			'goods.dangerousClassID':$scope.goodData.dangerousClassID,
       			'goods.trueName':$scope.goodData.trueName,
       			'goods.trueGoodsClassID1':$scope.goodData.trueGoodsClassID1,
       			'goods.trueGoodsClassID2':$scope.goodData.trueGoodsClassID2.id,
       			'goods.packingStyleID':$scope.goodData.packingStyleID,
       			'goods.packingStyleOther':$scope.goodData.packingStyleOther,
       			'goods.isDangerous':$scope.goodData.isDangerous?1:0
			};
	    	
	    	httpService.doPost('./struts/addGoods.action', inputData, function(ret){
        		inputData.id = ret.goods_id;
        		$scope.goodList.push($scope.goodData);
        		$scope.booleanData.goodFormShow = false;
        		$scope.tempData.max.length = Math.max($scope.tempData.max.length,inputData['goods.length']);
        		$scope.tempData.max.height = Math.max($scope.tempData.max.height,inputData['goods.height']);
        		$scope.tempData.max.width = Math.max($scope.tempData.max.width,inputData['goods.width']);
        		$scope.tempData.max.weight = Math.max($scope.tempData.max.weight,inputData['goods.grossWeight']);
        		$scope.tempData.max.volume = Math.max($scope.tempData.max.volume,inputData['goods.volume']);
        		checkSubmit(false);
        		$scope.$apply();
	        });
		 };
		
		 $scope.keepBidBook = function(){
			 if($scope.docData.id>0){
				 //swal("X", "更改尚未完成！", "error");
				 //return;
			 }
			 var input = {
					 'biddoc.departurePortID':$scope.docData.departurePortID,
					 'biddoc.arrivalPortID':$scope.docData.arrivalPortID,
					 'biddoc.departureDate':$scope.docData.departureDate,
					 'biddoc.arrivalDate':$scope.docData.arrivalDate,
					 'biddoc.transportTime':$scope.docData.transportTime,
					 'biddoc.validateTime':$scope.docData.validateTime,
					 'biddoc.paymentDate': $scope.docData.paymentDate,
					 'biddoc.transportModeID':$scope.docData.transportModeID,
					 'biddoc.transportType':$scope.docData.transportType.value,
					 'biddoc.boxedType':$scope.docData.boxedType
			 };
			
			 if(!!$scope.docData.containerID){input['biddoc.containerID']=$scope.docData.containerID.id;}
			 if(!!$scope.docData.containerCount){input['biddoc.containerCount']=$scope.docData.containerCount;}
			 
			 if(!!$scope.docData.id&&$scope.docData.id>0){
				 input['biddoc.id']=$scope.docData.id;
				 httpService.doPost('./struts/submitBidDoc.action', input,function(ret){
					 alertService.myAlert("success!", "success");
					 $scope.booleanData.recommendShow = true;
					 $scope.$apply();
				 });
			 }
			 else{
				 httpService.doPost('./struts/createBidDoc.action', input,function(ret){
					 $scope.docData.id = ret.biddoc.id;
					 alertService.myAlert("创建成功！", "success");
				 });
			 }
		 };
		 
		 $scope.submitBidDoc = function(){
			 if(!$scope.tempData.submit.state){
				 alertService.myAlert( $scope.tempData.submit.msg, "error");
				 return;
			 }
			 
			 httpService.doPost('./struts/checkMutex.action', {'docID':$scope.docData.id},function(ret){
				 $scope.docData.dangerousTip = ret.msg;
				 if(!ret.submit){
					 alertService.myAlert(ret.msg, "error");
					 return;
				 };
				 var input = {
						 'biddoc.id':$scope.docData.id,
						 'biddoc.qhfs':$scope.docData.qhfs,
						 'biddoc.hwbhsj':$scope.docData.hwbhsj
				 };
				 if($scope.docData.qhfs==='SHANGMEN'){input['biddoc.ckdz']=$scope.docData.ckdz;}
				 if(!!$scope.docData.containerID){input['biddoc.containerID']=$scope.docData.containerID.id;}
				 if(!!$scope.docData.containerCount){input['biddoc.containerCount']=$scope.docData.containerCount;}
				 if(!!$scope.docData.dangerousTip){input['biddoc.dangerousTip']=$scope.docData.dangerousTip;}
				 httpService.doPost('./struts/submitBidDoc.action', input,function(ret){
					 alertService.myAlert("success!", "success");
					 $scope.booleanData.recommendShow = true;
					 $scope.$apply();
				 });
			 });
		 };
		 
		 //init the controler
		 initData();
	 }]);
})();