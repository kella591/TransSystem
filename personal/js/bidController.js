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

    haiyunControllers.controller('bidDetailCtrl',['$scope','redirectService','httpService', function($scope,redirectService,httpService){
        $scope.detailData = {
            'offer':{},
            'offerDetail':[{}],
            'biddoc':{}

    };
        var docid = $('#docid')[0].value||-1;
        var transid = $('#transid')[0].value||-1;

        httpService.doPost('./struts/getBidInfo.action',{'biddoc.id':docid,'biddoc.userid':transid},function(ret){
            $scope.detailData = ret;
            $scope.$apply();
            console.info('bidReturn',ret);
        });
        
        
    }]);

    haiyunControllers.controller('bidCtrl', ['$scope','redirectService','httpService', function($scope,redirectService,httpService) {

        $scope.bidData = {
            'itemList':[//须填写的项目
                {"cnName":"海运费","currency":"USD","enName":"","id":1,"itemClass":"NECESSARY","type":"SEA_LCL","unit":"柜"},
                {"cnName":"运费附加费","currency":"USD","enName":"","id":2,"itemClass":"NECESSARY","type":"SEA_LCL","unit":"柜"},
                {"cnName":"订舱费","currency":"RMB","enName":"","id":3,"itemClass":"NECESSARY","type":"SEA_LCL","unit":"柜"},
                {"cnName":"仓储费","currency":"RMB","enName":"","id":49,"itemClass":"NON_NECESSARY","type":"SEA_LCL","unit":""},
                {"cnName":"单证费","currency":"RMB","enName":"","id":51,"itemClass":"NON_NECESSARY","type":"SEA_LCL","unit":""}
            ],
            'unitList':[{'id':0, 'cnUnit':'单位1', 'enUnit':'unit1'},{'id':1, 'cnUnit':'单位2', 'enUnit':'unit2'}],
            'currencyList':[{'id':0, 'cnCurrency':'货币1', 'enCurrency':'currency1'},{'id':1, 'cnCurrency':'货币2', 'enCurrency':'currency2'}],
            'description':''


        };

        var docid = $('#docid')[0].value||-1;
        var userid = $('#userid')[0].value||-1;
        httpService.doPost('./struts/getItemPrice.action', {},function(ret){
                $scope.bidData.itemList = ret.ItemPrice;
                $scope.$apply();
                $scope.getCurrency();
                $scope.getUnit();
                console.info('bidReturn',ret);
                console.info('bidData',$scope.bidData);
        });

        $scope.getCurrency = function(){
            httpService.doPost('./struts/getCurrency.action', {}, function(ret){
                $scope.bidData.currencyList = ret.currency;
                $scope.$apply();
            });
        };

        $scope.getUnit = function(){
            httpService.doPost('./struts/getUnit.action', {}, function(ret){
                $scope.bidData.unitList = ret.unit;
                $scope.$apply();
            });
        };

        //检查必填项目
        $scope.check = function(){
            //if (para == 1){
            //    if ($scope.item.itemClass == 'NECESSARY') $scope.item.validate = ($scope.item.unitPrice != 0)
            //    else $scope.item.validate = true;
            //}else{
                var validate=true;
                for (var i in $scope.bidData.itemList){
                    $scope.bidData.itemList[i].validate = true;
                    if ($scope.bidData.itemList[i].itemClass == 'NECESSARY') $scope.bidData.itemList[i].validate = ($scope.bidData.itemList[i].unitPrice != 0);
                    validate = validate && $scope.bidData.itemList[i].validate;
                }
                return validate;
            //}
        };
        //$("select").each(function(){$(this).find("option").eq(1).attr("selected","selected")})
        // $("input").val(1)
        $scope.submitHandler = function() {
            if(!$scope.check()){
                sweetAlert("×", "必填项价格不可为空！", "error");
                console.log("false");
            } else{

                var itemList = $scope.bidData.itemList;
                var input = {
                    'biddingDocID': docid,
                    'offerTime': '00-00-00',
                    'description': $scope.bidData.description};
                //input.bidOfferDetail = new array(itemList.length);
                for (var i =0;i<itemList.length;i++){
                        input['bidOfferDetail['+i+'].currency']=itemList[i].currency;
                        input['bidOfferDetail['+i+'].unit']=itemList[i].unit;
                        input['bidOfferDetail['+i+'].count']=itemList[i].count;
                        input['bidOfferDetail['+i+'].unitPrice']=itemList[i].unitPrice;
                        input['bidOfferDetail['+i+'].itemPriceId']=itemList[i].itemPriceId;
                        
                       /* input.bidOfferDetail[i].unit=itemList[i].unit;
                        input.bidOfferDetail[i].count=itemList[i].count;
                        input.bidOfferDetail[i].unitPrice=itemList[i].unitPirce;
                        input.bidOfferDetail[i].itemPriceId=itemList[i].id;*/

                };
                httpService.doPost('./struts/addBidInfo.action', input, function(ret){
                    swal("^-^", "竞标成功！", "success");
                    window.location="./bidingDetail.jsp?docid="+docid+"&transid="+userid;});


            }
        };

    }]);

})();