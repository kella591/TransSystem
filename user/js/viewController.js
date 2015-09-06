(function() {
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

    haiyunControllers.controller('viewBidDocCtrl',['$scope','httpService','alertService',function($scope,httpService,alertService){
        $scope.name = name;
        $scope.data = {};
        $scope.stateAfter = null;
        var docid = $('#docid')[0].value||-1;
        console.log('docid',$('#docid'));
        var stateChange =	{'DRAFT':[],'WAITING_BIDS':['DRAFT','NEGOTIATION','WITHDRAW','FAILEDBIDS'],'NEGOTIATION':['GOING','WITHDRAW'],'GOING':['DONE'],'DONE':[],'WITHDRAW':['DRAFT'],'FAILEDBIDS':['DRAFT']};
        var stateList = [{'value':'DRAFT','name':{'cnName':'草稿','enName':'DRAFT'}[name]},
                         {'value':'WAITING_BIDS','name':{'cnName':'待投标','enName':'WAITING_BIDS'}[name]},
                         {'value':'NEGOTIATION','name':{'cnName':'洽谈中','enName':'NEGOTIATION'}[name]},
                         {'value':'GOING','name':{'cnName':'进行中','enName':'GOING'}[name]},
                         {'value':'DONE','name':{'cnName':'已完成','enName':'DONE'}[name]},
                         {'value':'WITHDRAW','name':{'cnName':'已撤销','enName':'WITHDRAW'}[name]},
                         {'value':'FAILEDBIDS','name':{'cnName':'已流标','enName':'FAILEDBIDS'}[name]}];
        var filterStateList = function(){
        	$scope.stateList =  $.grep(stateList,
                    function(n,i){
						return $.inArray(n.value,stateChange[$scope.data.biddoc.state.value])>=0;
				       }
					);
        	$scope.$apply();
        };
        httpService.doPost('./struts/viewBidDoc.action', {'biddoc.id':docid}, function(ret){
                $scope.data = ret;
                filterStateList();
        });

        $scope.selectState = function(){
        	if($scope.stateAfter===$scope.data.biddoc.state){
        		return;
        	}
        	httpService.doPost('./struts/updateBidDoc.action', {'biddoc.id':docid,"state":$scope.stateAfter.value}, function(ret){
        		$scope.data.biddoc.state = $scope.stateAfter;
        		filterStateList();
        	});
        };
    }]);


    /*
     $scope.data = {
     'biddoc':{
     'arrivalDate':'70-0-4',
     'arrivalPortID':107,
     'boxedType':0,
     'containerCount':0,
     'containerID':0,
     'dangerousTip':null,
     'departureDate':'115-5-2',
     'departurePortID':86,
     'id':16,
     'paymentDate':'115-5-2',
     'state':0,
     'transportModeID':0,
     'transportTime':2,
     'transportType':0,
     'userid':2
     ,'validateTime':12
     },
     'goods': [
     {
     'biddingDocumentID':16,
     'count':3,
     'dangerousClassID':1,
     'dangerousPACKINGGROUP':1,
     'dangerousUNNO':'1',
     'description':'无',
     'goodsClassID1':1,
     'goodsClassID2':2,
     'goodsFirstClass': {
     'cnDescription':'',
     'cnName':'活动物；动物产品',
     'dangerous':0,
     'enDescription':'',
     'enName':'live animal;Animal products',
     'id':1,
     'imageURL':'',
     'index':1,'mechanical':0,'pID':0},
     'goodsSecondClass':{
     'cnDescription':'',
     'cnName':'植物产品',
     'dangerous':0,
     'enDescription':'',
     'enName':'Plant products',
     'id':2,
     'imageURL':'',
     'index':2,
     'mechanical':0,
     'pID':0},
     'grossWeight':1.0,
     'height':1.0,
     'id':1,
     'isDangerous':0,
     'length':1.0,
     'name':'口味虾',
     'volume':1,
     'weight':1.0
     },
     {'biddingDocumentID':16,'count':1,'dangerousClassID':2,'dangerousPACKINGGROUP':2,'dangerousUNNO':'2','description':'无','goodsClassID1':2,'goodsClassID2':1,'goodsFirstClass':{'cnDescription':'','cnName':'植物产品','dangerous':0,'enDescription':'','enName':'Plant products','id':2,'imageURL':'','index':2,'mechanical':0,'pID':0},'goodsSecondClass':{'cnDescription':'','cnName':'活动物；动物产品','dangerous':0,'enDescription':'','enName':'live animal;Animal products','id':1,'imageURL':'','index':1,'mechanical':0,'pID':0},'grossWeight':2.0,'height':2.0,'id':2,'isDangerous':2,'length':2.0,'name':'电脑','volume':2,'weight':2.0
     }]
     };

     $scope.data = {
     'biddoc':{
     'arrivalDate':'70-0-4',
     'departureDate':'115-5-2',
     'arrivalPortID':107,//港口也要进一步查
     'departurePortID':86,
     'boxedType':0,//集装箱类型编号需进一步查询
     'containerCount':0,//
     'dangerousTip':null,//有才显示
     'paymentDate':'115-5-2',
     'state':0,//标书状态（草稿0；待投标1；洽谈中2；进行中3；已完成4；已撤销5；已流标6）
     'transportModeID':0,//运输模式编号，需进一步查询
     'transportTime':2,//船期
     'transportType':0,//（海运1；空运2；公路3；铁路4）
     'validateTime':12//标书有效时间
     },
     'goods': [
     {
     'name':'口味虾',
     'count':3,
     'dangerousClassID':1,
     'dangerousPACKINGGROUP':1,
     'dangerousUNNO':'1',
     'description':'无',
     'goodsFirstClass': {
     'cnName':'活动物；动物产品',
     'dangerous':0,
     'enName':'live animal;Animal products',
     'imageURL':'',
     'mechanical':0},
     'goodsSecondClass':{
     'cnName':'植物产品',
     'dangerous':0,
     'enName':'Plant products',
     'imageURL':'',
     'mechanical':0},
     'grossWeight':1.0,
     'volume':1,
     'height':1.0,
     'length':1.0,
     'width':1.0,
     'isDangerous':0
     }
     ]
     };
     */

    haiyun.filter('TinyToBool',function(){
        return function(data){
            if (data == 1) data = '是';
            else data = '否';
            return data;
        }
    });
    haiyun.filter('TypeToName',function(){
        return function(data,item){
            if (item == '运输类别'){//运输类别（海运1；空运2；公路3；铁路4））
                if (data == "SEA") return '海运';
                if (data == "AIR") return '空运';
                if (data == "LAND") return '公路';
                if (data == "RAILWAY") return '铁路';
                else return '未知';
            }
            if (item == '标书状态'){//标书状态（草稿'DRAFT；待投标'WAITING_BIDS'；洽谈中'NEGOTIATION'；进行中'GOING'；已完成'DONE'；已撤销'WITHDRAW'；已流标'FAILEDBIDS'）
                if (data == 'DRAFT') return '草稿';
                if (data == 'WAITING_BIDS') return '待投标';
                if (data == 'NEGOTIATION') return '洽谈中';
                if (data == 'GOING') return '进行中';
                if (data == 'DONE') return '已完成';
                if (data == 'WITHDRAW') return '已撤销';
                if (data == 'FAILEDBIDS') return '已流标';

            }
        }
    })
})();