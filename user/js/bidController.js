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

    haiyunControllers.controller('bidDetailCtrl',['$scope','redirectService','httpService','alertService', function($scope,redirectService,httpService,alertService){
        $scope.detailData = {
            'offer':{},
            'offerDetail':[{}],
            'biddoc':{}

    };
        var docid = $('#docid')[0].value||-1;
        var transid = $('#transid')[0].value||-1;

        httpService.doPost('./struts/getBiddingInfoList.action',{'biddoc.id':docid,'biddoc.userid':transid},function(ret){
            $scope.detailData = ret.biddings;
            $scope.$apply();
            console.info('bidReturn',ret);
        });
        
        
    }]);

    haiyunControllers.controller('bidCtrl', ['$scope','redirectService','httpService', function($scope,redirectService,httpService) {

        $scope.price = -1;
        $scope.description = '' ;

        var docid = $('#docid')[0].value||-1;
        var userid = $('#userid')[0].value||-1;


        //检查必填项目
        $scope.check = function(){
                var validate=true;
                if ($scope.price == -1)
                    validate = flase;
                return validate;
            //}
        };
        //$("select").each(function(){$(this).find("option").eq(1).attr("selected","selected")})
        // $("input").val(1)
        $scope.submitHandler = function() {
            if(!$scope.check()){
            	alertService.myAlert("请填写价格！", "error");
                console.log("false");
            } else{

                var itemList = $scope.bidData.itemList;
                var input = {
                    'biding.biddingDocID': docid,
                    'biding.price': $scope.price
                };
                httpService.doPost('./struts/addBidingInfo.action', input, function(ret){
                	alertService.myAlert("^-^,竞标成功！", "success");
                    window.location="./bidingDetail.jsp?docid="+docid+"&transid="+userid;});


            }
        };

    }]);

})();