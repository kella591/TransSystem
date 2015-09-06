(function () {
    'use strict';
    var haiyun = angular.module('haiyun', ['ngRoute','pascalprecht.translate','haiyunControllers','haiyunServices','haiyunDirectives']);
    var name = $.cookie("language")||"cn";
    haiyun.config(function($translateProvider) {
		 $translateProvider.translations('en',en).translations('cn',cn);
		 $translateProvider.preferredLanguage(name);
		 name = name+"Name";
   }).config(function($sceProvider){
		 $sceProvider.enabled(false);
   });

    var haiyunControllers = angular.module('haiyunControllers', []);

    haiyunControllers.controller('routeCtrl',['$scope','$location','redirectService','httpService','alertService', function($scope,$location,redirectService,httpService,alertService) {
        //var loadClass=$scope.loadClass=$location.search()['loadClass'];
        //var routeType=$scope.routeType=$location.search()['routeType'];
        $scope.tempData = {};
        $scope.dataList = {};
        //itemlist for pricing
        $scope.itemData =[
                //{
                //'name':'20GP',
                //'basicPrice':0,
                //'salePrice':0
                //},
        ];
        $scope.week = [];
        var loadClass = $scope.loadClass = '';
        var routeType = $scope.routeType = '';
        $scope.dataList.loadClassList = [
            {'value':'CONTAINER','name':{'cnName':'集装箱','enName':'CONTAINER'}[name]},
            {'value':'BULKLOAD','name':{'cnName':'散杂货','enName':'BULKLOAD'}[name]}
        ];
        $scope.dataList.routeTypeList = [
            {'value':'GROUP','name':{'cnName':'团购','enName':'GROUP'}[name]},
            {'value':'STANDARD','name':{'cnName':'标准','enName':'STANDARD'}[name]},
            {'value':'SPECIAL','name':{'cnName':'特殊','enName':'SPECIAL'}[name]}
        ]



        var temp = [{'cnName':'--'}];
        // init dataList
        var initDataList = function(){

            //port
            httpService.doPost('./struts/searchPort.action', {'port.id':0,'port.level':'AREA'}, function(ret){
                $scope.dataList.portZeroLevel = ret.ports;
                $scope.$apply();
            });
            $scope.dataList.departurePortFirstLevel = temp;
            $scope.dataList.departurePortSecondLevel = temp;
            $scope.dataList.arrivalPortFirstLevel = temp;
            $scope.dataList.arrivalPortSecondLevel = temp;
            $scope.dataList.transitPortFirstLevel = temp;
            $scope.dataList.transitPortSecondLevel = temp;
            //$scope.$apply();
            $scope.dataList.itemList = {
                'CONTAINER':['20GP','40GP','40HQ'],
                'BULKLOAD':['FIO','FO','FILO','FLT']
            }[loadClass];



        };

        var initData = function(){


            $scope.tempData.port = {
                'departure' : {'zero':-1,'first':-1},
                'arrival' : {'zero':-1,'first':-1},
                'transit' : {'zero':-1,'first':-1}
            };
            $scope.tempData.stowageDay ='';
            $scope.week = [
                {'day':'周一','shift':0},
                {'day':'周二','shift':0},
                {'day':'周三','shift':0},
                {'day':'周四','shift':0},
                {'day':'周五','shift':0},
                {'day':'周六','shift':0},
                {'day':'周日','shift':0},
            ];

            //init itemData
            var route=$scope.dataList.itemList;
            console.log(route);
            for (var i in route){
                $scope.itemData.push({'name':route[i],'basicPrice':0,'salePrice':0});
            }

            //all data for all kind of route
            $scope.routeData = {
                'departurePortID': 0,
                'arrivalPortID': 0,
                'transitPortID':0,
                'transportTime': 0,
                'company':'',

                'startDate': '',
                'endDate': '',

                'stowageDayList':[],
                'weeklyShift':'0000000',
                'groupDiscountList':[],

                'basicPriceList':[],
                'salePriceList':[],

                'minNumber':1,
                'isInsurance':0,
                'type':'STANDARD',
                'isDirect':1,
                'id': -1
            };
            $scope.actionName = {
                'CONTAINER': "./struts/addContainerRoute.action",
                'BULKLOAD': "./struts/addBulkloadRoute.action"
            }[loadClass];
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
            }else if(type==2){
                if(level===0){
                    id = $scope.tempData.port.transit.zero;
                }else{
                    id = $scope.tempData.port.transit.first;
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
                }else if(type==2){
                    if(level===0){
                        $scope.dataList.transitPortFirstLevel = ret.ports;
                        $scope.dataList.transitPortSecondLevel = temp;
                    }else{
                        $scope.dataList.transitPortSecondLevel = ret.ports;
                    }
                }
                $scope.$apply();
            });
        };

        $scope.init = function(){
            loadClass = $scope.loadClass;
            routeType = $scope.routeType;
            initDataList();
            initData();
            console.log('loadClass:',loadClass,';routeType:',routeType );
        }


        $scope.addStowageDay = function(){
            $scope.routeData.stowageDayList.push($scope.tempData.stowageDay);
            $scope.tempData.stowageDay = '';
            //$scope.$apply();
        };
        $scope.removeStowageDay = function (index) {
            $scope.routeData.stowageDayList.splice(index, 1);
        };

        $scope.addGroupDiscount = function(){
            $scope.routeData.groupDiscountList.push(
                {'minNumber':$scope.tempData.minNumber,
                    'discount':$scope.tempData.discount});
            $scope.tempData.minNumber = '';
            $scope.tempData.discount = '';
            $scope.$apply();
        };
        $scope.removeGroupDiscount = function (index) {
            $scope.routeData.groupDiscountList.splice(index, 1);
        };


        $scope.submitHandler = function(){


            var input;
            console.log(input);
            console.log($scope.itemData)
            if (loadClass == 'BULKLOAD'){
                input = {
                    'bulkloadRoute.type': $scope.routeType,
                    'bulkloadRoute.departurePortID': $scope.routeData.departurePortID,
                    'bulkloadRoute.isDirect': ($scope.routeData.isDirect == 1) ? 'DIRECT' : 'NO_DIRECT',
                    'bulkloadRoute.transitPortID': $scope.routeData.transitPortID,
                    'bulkloadRoute.fullTime': $scope.routeData.transportTime,
                    'bulkloadRoute.arrivalPortID': $scope.routeData.arrivalPortID,
                    'bulkloadRoute.shippingLineName': $scope.routeData.company,
                    'bulkloadRoute.validDateFrom': $scope.routeData.startDate,
                    'bulkloadRoute.validDateTo': $scope.routeData.endDate,
                    'bulkloadRoute.isInsurance': $scope.routeData.isInsurance == 1 ? 'YES' : 'NO',
                    //'bulkloadRoute.minNumber': $scope.routeData.minNumber,
                    'bulkloadRoute.stowageDay': $scope.routeData.stowageDayList.join(';'),
                    'bulkloadRoute.FIO':$scope.itemData[0].basicPrice,
                    'bulkloadRoute.FIONew':$scope.itemData[0].salePrice,
                    'bulkloadRoute.FO':$scope.itemData[1].basicPrice,
                    'bulkloadRoute.FONew':$scope.itemData[1].salePrice,
                    'bulkloadRoute.FILO':$scope.itemData[2].basicPrice,
                    'bulkloadRoute.FILONew':$scope.itemData[2].salePrice,
                    'bulkloadRoute.FLT':$scope.itemData[3].basicPrice,
                    'bulkloadRoute.FLTNew':$scope.itemData[3].salePrice
                }
            }else{
                input = {
                    'containerRoute.type': $scope.routeType,
                    'containerRoute.departurePortID': $scope.routeData.departurePortID,
                    'containerRoute.isDirect': ($scope.routeData.isDirect == 1) ? 'DIRECT' : 'NO_DIRECT',
                    'containerRoute.transitPortID': $scope.routeData.transitPortID,
                    'containerRoute.fullTime': $scope.routeData.transportTime,
                    'containerRoute.arrivalPortID': $scope.routeData.arrivalPortID,
                    'containerRoute.shippingLineName': $scope.routeData.company,
                    'containerRoute.weeklyShift': $scope.routeData.weeklyShift,
                    'containerRoute.validDateFrom': $scope.routeData.startDate,
                    'containerRoute.validDateTo': $scope.routeData.endDate,
                    'containerRoute.isInsurance': $scope.routeData.isInsurance == 1 ? 'YES' : 'NO',
                    //'containerRoute.minNumber': $scope.routeData.minNumber,
                    'containerRoute.20GP':$scope.itemData[0].basicPrice,
                    'containerRoute.20GPNew':$scope.itemData[0].salePrice,
                    'containerRoute.40GP':$scope.itemData[1].basicPrice,
                    'containerRoute.40GPNew':$scope.itemData[1].salePrice,
                    'containerRoute.40HQ':$scope.itemData[2].basicPrice,
                    'containerRoute.40HQNew':$scope.itemData[2].salePrice
                }
            }
            if (routeType == 'GROUP'){
                var itemList = $scope.routeData.groupDiscountList;
                for (var i =0;i<itemList.length;i++){
                    input['groupDiscount['+i+'].number']=itemList[i].minNumber;
                    input['groupDiscount['+i+'].discount']=itemList[i].discount ;
            }}

            httpService.doPost($scope.actionName, input, function(ret){
            	alertService.myAlert("^-^,路线提交成功！", "success");
            });
        }

    }]);

})();