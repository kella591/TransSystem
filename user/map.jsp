<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
    <s:include value="../public/include/header.jsp"></s:include>
    <style type="text/css">
        #allmap{
            width:50%;
            height:100%;
        }
    </style>
</head>
<body>
<s:include value="../public/include/navbar.jsp"></s:include>


<div>
    <div class="container" ng-controller="mapCtrl">
        <h2><span ng-bind="'Map'| translate">查看地图</span></h2>
        <div class="form-group">
            <label class="control-label col-sm-2" ng-bind="'InputX'| translate">输入经度</label>
            <div class="col-sm-3">
            <input type="text" ng-model="point.x" ng-change="showMap()"/>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" ng-bind="'InputY'| translate">输入纬度</label>
            <div class="col-sm-3">
                <input type="text" ng-model="point.y" ng-change="showMap()"/>
            </div>
        </div>
        <div id="allmap"></div>
    </div>


</div>
<s:include value="../public/include/footer.jsp"></s:include>
<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="./js/mapController.js"></s:url>'></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.4></script>
<!--2.0&ak=etkDCv66X7g1RodkRiZGYmAA"></script>-->

</body>
</html>