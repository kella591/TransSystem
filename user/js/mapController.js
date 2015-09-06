(function () {
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

    haiyunControllers.controller('mapCtrl', ['$scope','httpService','alertService', function($scope,httpService,alertService) {
        $scope.point={
            x:116.404,
            y:39.915
        };
        var map = new BMap.Map("allmap");    // 创建Map实例
        var mapPoint = new BMap.Point($scope.point.x,$scope.point.y);
        var marker = new BMap.Marker(mapPoint);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.centerAndZoom(mapPoint, 9);  // 初始化地图,设置中心点坐标和地图级别

        //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        //map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        //map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        //var opts = {
        //    width : 200,     // 信息窗口宽度
        //    height: 100,     // 信息窗口高度
        //    title : "海底捞王府井店" , // 信息窗口标题
        //}
        //var infoWindow = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);  // 创建信息窗口对象
        //marker.addEventListener("click", function() {
        //    map.openInfoWindow(infoWindow, mapPoint); //开启信息窗口
        //})

        $scope.showMap = function(){
            map.clearOverlays();
            var new_point = new BMap.Point($scope.point.x,$scope.point.y);
            var marker = new BMap.Marker(new_point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中
            map.panTo(new_point);
        }

    }]);

    haiyunControllers.controller('t1Ctrl', ['$scope','httpService', function($scope,httpService) {

    }]);
})();