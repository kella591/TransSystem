<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
<s:include value="../public/include/header.jsp"></s:include>
	<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./js/routeDetail.js"></s:url>'></script>
<link href='<s:url value="./css/timeLine.css"></s:url>' rel="stylesheet" type="text/css"/>
</head>
<body>
	<s:include value="../public/include/navbar.jsp"></s:include>
	
	<div class="container-fluid" ng-controller="routeDetailCtrl">
	<input type="hidden" id="route" value="<s:property value='#parameters.route'/>">
	<input type="hidden" id="type" value="<s:property value='#parameters.type'/>">
		<div class="row">
		<div class="col-sm-8 col-sm-offset-2">
			<table ng-if="type==1" class="table">
				<tr><td>种类</td><td ng-bind="route.type.name"></td></tr>
				<tr><td>是否直达</td><td ng-bind="route.isDirect.name"></td></tr>
				<tr><td>状态</td><td ng-bind="route.status.name"></td></tr>
				<tr><td>保险</td><td ng-bind="route.isInsurance.name"></td></tr>
				<tr><td>名称</td><td ng-bind="route.shippingLineName"></td></tr>
				<tr><td>有效期</td><td ng-bind="route.validDateFrom+'	~	'+route.validDateTo"></td></tr>
				<tr><td>出发港口</td><td ng-bind="route.departurePort[name]"></td></tr>
				<tr><td>到达港口</td><td ng-bind="route.arrivalPort[name]"></td></tr>
				<tr><td>全程日期</td><td ng-bind="route.fullTime"></td></tr>
				<tr><td>更新日期</td><td ng-bind="route.updateTime"></td></tr>
				<tr><td>20集装箱</td><td ng-bind="route.container_20GP+' : '+route.container_20GPNew"></td></tr>
				<tr><td>40集装箱</td><td ng-bind="route.container_40GP+' : '+route.container_40GPNew"></td></tr>
				<tr><td>40HD集装箱</td><td ng-bind="route.container_40HQ+' : '+route.container_40HQNew"></td></tr>
				<tr><td>描述</td><td ng-bind="route.description"></td></tr>
				<tr><td>最小成团人数</td><td ng-bind="route.minNumber"></td></tr>
			</table>
			<table ng-if="type==2" class="table">
				<tr><td>种类</td><td ng-bind="route.type.name"></td></tr>
				<tr><td>是否直达</td><td ng-bind="route.isDirect.name"></td></tr>
				<tr><td>状态</td><td ng-bind="route.status.name"></td></tr>
				<tr><td>保险</td><td ng-bind="route.isInsurance.name"></td></tr>
				<tr><td>名称</td><td ng-bind="route.shippingLineName"></td></tr>
				<tr><td>有效期</td><td ng-bind="route.validDateFrom+'	~	'+route.validDateTo"></td></tr>
				<tr><td>出发港口</td><td ng-bind="route.departurePort[name]"></td></tr>
				<tr><td>到达港口</td><td ng-bind="route.arrivalPort[name]"></td></tr>
				<tr><td>全程日期</td><td ng-bind="route.fullTime"></td></tr>
				<tr><td>更新日期</td><td ng-bind="route.updateTime"></td></tr>
				<tr ng-if="!!route.weeklyShift"><td>班次</td><td ng-bind="route.weeklyShift"></td></tr>
				<tr ng-if="!!route.stowageDay"><td>积载日</td><td ng-bind="route.stowageDay"></td></tr>
				<tr ng-if="!!route.container_20GP"><td>20集装箱</td><td ng-bind="route.container_20GP+' : '+route.container_20GPNew"></td></tr>
				<tr ng-if="!!route.container_40GP"><td>40集装箱</td><td ng-bind="route.container_40GP+' : '+route.container_40GPNew"></td></tr>
				<tr ng-if="!!route.container_40HQ"><td>40HD集装箱</td><td ng-bind="route.container_40HQ+' : '+route.container_40HQNew"></td></tr>
				<tr ng-if="!!route.bulkload_FILO"><td>FILO</td><td ng-bind="route.bulkload_FILO+' : '+route.bulkload_FILONew"></td></tr>
				<tr ng-if="!!route.bulkload_FIO"><td>FIO</td><td ng-bind="route.bulkload_FIO+' : '+route.bulkload_FIONew"></td></tr>
				<tr ng-if="!!route.bulkload_FLT"><td>FLT</td><td ng-bind="route.bulkload_FLT+' : '+route.bulkload_FLTNew"></td></tr>
				<tr ng-if="!!route.bulkload_FO"><td>FO</td><td ng-bind="route.bulkload_FO+' : '+route.bulkload_FONew"></td></tr>
				<tr><td>描述</td><td ng-bind="route.description"></td></tr>
				<tr><td>最小成团人数</td><td ng-bind="route.minNumber"></td></tr>
			</table>
		</div>
		</div>
	</div>
	<s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>