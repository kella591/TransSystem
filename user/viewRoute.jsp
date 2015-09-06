<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
<s:include value="../public/include/header.jsp"></s:include>
	<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./js/groupRoute.js"></s:url>'></script>
</head>
<body>
	<s:include value="../public/include/navbar.jsp"></s:include>
	
	<div class="container-fluid" ng-controller="groupRouteCtrl">
		<div class="row">
		<div class="col-sm-4">
			<table class="table">
			<thead><tr><td>搜索：</td></tr></thead>
			<tbody>
				<tr><td>装货类型：</td><td>
						<select ng-model="input.typeSearch" ng-options="type.value as type[name] for type in dataList.typeSearchList">
			            <option value="">-请选择-</option>
				        </select>
				</td></tr>
				<tr><td>类别</td><td>
						<select ng-model="input.type" ng-options="type.value as type.name for type in dataList.typeList">
			            <option value="">-请选择-</option>
				        </select>
				</td></tr>
				<tr><td>状态</td><td>
						<select ng-model="input.status" ng-options="type.value as type.name for type in dataList.statusList">
			            <option value="">-请选择-</option>
				        </select>
				</td></tr>
				<tr><td>出发港口</td><td class="row">
						<div class="col-sm-12">
			            <select required class="form-control" ng-model="tempData.port.departure.zero" ng-options="port.id as port.cnName for port in dataList.portZeroLevel" ng-change="selectPort(0,0)">
			            <option value="">-请选择-</option>
				        </select>
				      	</div>
				      	<div class="col-sm-12">			      		
				            <select required class="form-control" ng-model="tempData.port.departure.first" ng-options="port.id as port.cnName for port in dataList.departurePortFirstLevel" ng-change="selectPort(0,1)">
				             <option value="">-请选择-</option>
					      	</select>
				      	</div>
				      	<div class="col-sm-12">
				            <select required class="form-control" ng-model="input.departurePortID" ng-options="port.id as port.cnName for port in dataList.departurePortSecondLevel">
				             <option value="">-请选择-</option>
					      	</select>
				      	</div>
				</td></tr>
				<tr><td>到达港口</td><td class="row">
						<div class="col-sm-12">
			            <select required class="form-control" ng-model="tempData.port.arrival.zero" ng-options="port.id as port.cnName for port in dataList.portZeroLevel" ng-change="selectPort(1,0)">
			            <option value="">-请选择-</option>
				        </select>
				      	</div>
				      	<div class="col-sm-12">			      		
				            <select required class="form-control" ng-model="tempData.port.arrival.first" ng-options="port.id as port.cnName for port in dataList.arrivalPortFirstLevel" ng-change="selectPort(1,1)">
				             <option value="">-请选择-</option>
					      	</select>
				      	</div>
				      	<div class="col-sm-12">
				            <select required class="form-control" ng-model="input.arrivalPortID" ng-options="port.id as port.cnName for port in dataList.arrivalPortSecondLevel">
				             <option value="">-请选择-</option>
					      	</select>
				      	</div>
				</td></tr>
				<tr><td>全程天数</td><td><input type="text" ng-model="input.fullTime"/>天</td></tr>
				<tr><td>线路名称</td><td><input type="text" ng-model="input.shippingLineName"/></td></tr>
				<tr ng-if="input.typeSearch===1"><td>每周班次</td><td><input type="text" ng-model="input.weeklyShift"/></td></tr>
				<tr ng-if="input.typeSearch===2"><td>积载日</td><td><input type="text" ng-model="input.stowageDay"/></td></tr>
				<tr><td></td><td><button class="btn" ng-click="searchRoute()">搜索</button></td></tr>				
			</tbody>
			</table>
		</div>
		<div class="col-sm-8">
		<h4>集装箱</h4>
		<table class="table">
			<thead><tr><th>类别</th><th>状态</th><th>出发港口</th><th>是否直达</th><th>中转站</th><th>全程天数</th><th>到达港口</th><th>线路名称</th><th>每周班次</th></tr></thead>
			<tbody><tr ng-repeat="route in containerRoutes">
						<td ng-bind="route.type.name"></td>
						<td ng-bind="route.status.name"></td>
						<td ng-bind="route.departurePort[name]"></td>
						<td ng-bind="route.isDirect.name"></td>
						<td ng-bind="route.transitPort[name]"></td>
						<td ng-bind="route.fullTime"></td>
						<td ng-bind="route.arrivalPort[name]"></td>
						<td ng-bind="route.shippingLineName"></td>
						<td ng-bind="route.weeklyShift"></td>
						<td><a href="./viewRouteDetail.jsp?route={{route.id}}&type=1"><button class="btn">查看</button></a><button ng-if="route.type.value==='GROUP'" class="btn" ng-click="addGroup(route.id,	1)">参团</button></td>
			</tr></tbody>
		</table>
		<h4>散杂货</h4>
		<table class="table">
		<thead><tr><th>类别</th><th>状态</th><th>出发港口</th><th>是否直达</th><th>中转站</th><th>全程天数</th><th>到达港口</th><th>线路名称</th><th>积载日</th></tr></thead>
			<tbody><tr ng-repeat="route in bulkloadRoute">
						<td ng-bind="route.type.name"></td>
						<td ng-bind="route.status.name"></td>
						<td ng-bind="route.departurePort[name]"></td>
						<td ng-bind="route.isDirect.name"></td>
						<td ng-bind="route.transitPort[name]"></td>
						<td ng-bind="route.fullTime"></td>
						<td ng-bind="route.arrivalPort[name]"></td>
						<td ng-bind="route.shippingLineName"></td>
						<td ng-bind="route.stowageDay"></td>
						<td><a href="./viewRouteDetail.jsp?route={{route.id}}&type=2">查看</a><button class="btn" ng-if="route.type.value==='GROUP'" ng-click="addGroup(route.id,2)">参团</button></td>
			</tr></tbody>
		</table>
		</div>
		</div>
	</div>
	<s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>