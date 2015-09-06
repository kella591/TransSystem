<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
<s:include value="../public/include/header.jsp"></s:include>
<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./js/allDocListController.js"></s:url>'></script>
</head>
<body>
	<s:include value="../public/include/navbar.jsp"></s:include>
	
	<div class="container-fluid" ng-controller="allDocListCtrl" >
		<div class="col-sm-6">
			<table class="table ">
				<thead><tr><td>搜索：</td></tr></thead>
				<tbody>

				<tr><td>标书状态</td><td>
					<select ng-model="input.status" ng-options="type.value as type.name for type in dataList.statusList">
						<option value="">-请选择-</option>
					</select>
				</td></tr>
				<tr><td>出发港口</td><td class="row">
					<div class="col-sm-5">
						<select required class="form-control" ng-model="tempData.port.departure.zero" ng-options="port.id as port.cnName for port in dataList.portZeroLevel" ng-change="selectPort(0,0)">
							<option value="">-请选择-</option>
						</select>
					</div>
					<div class="col-sm-5">
						<select required class="form-control" ng-model="tempData.port.departure.first" ng-options="port.id as port.cnName for port in dataList.departurePortFirstLevel" ng-change="selectPort(0,1)">
							<option value="">-请选择-</option>
						</select>
					</div>
					<div class="col-sm-5">
						<select required class="form-control" ng-model="input.departurePortID" ng-options="port.id as port.cnName for port in dataList.departurePortSecondLevel">
							<option value="">-请选择-</option>
						</select>
					</div>
				</td></tr>
				<tr><td>到达港口</td><td class="row">
					<div class="col-sm-5">
						<select required class="form-control" ng-model="tempData.port.arrival.zero" ng-options="port.id as port.cnName for port in dataList.portZeroLevel" ng-change="selectPort(1,0)">
							<option value="">-请选择-</option>
						</select>
					</div>
					<div class="col-sm-5">
						<select required class="form-control" ng-model="tempData.port.arrival.first" ng-options="port.id as port.cnName for port in dataList.arrivalPortFirstLevel" ng-change="selectPort(1,1)">
							<option value="">-请选择-</option>
						</select>
					</div>
					<div class="col-sm-5">
						<select required class="form-control" ng-model="input.arrivalPortID" ng-options="port.id as port.cnName for port in dataList.arrivalPortSecondLevel">
							<option value="">-请选择-</option>
						</select>
					</div>
				</td></tr>
				<tr><td></td><td><button class="btn" ng-click="searchDoc()">搜索</button></td></tr>
				</tbody>
			</table>
		</div>

		<div class="row">
		<table class="table">
			<thead>
			<tr>
				<td>ID</td>
				<td ng-bind="'FromDate'|translate"></td>
				<td ng-bind="'ToDate'|translate"></td>
				<td ng-bind="'FromPort'|translate"></td>
				<td ng-bind="'ToPort'|translate"></td>
			</tr>
			</thead>
			<tbody>
			<tr ng-repeat="doc in docList">
				<td ng-bind="doc.id"></td>
				<td ng-bind="doc.departureDate"></td>
				<td ng-bind="doc.arrivalDate"></td>
				<td ng-bind="doc.departPort[name]">
				<td ng-bind="doc.arrivalPort[name]"></td>
				<td><a href="./viewBidDoc.jsp?docid={{doc.id}}" ng-bind="'DocDetail'|translate"></a></td>
				<td><a href="./biding.jsp?docid={{doc.id}}"
					   ng-bind="'Bid'|translate"></a></td>
			</tr>
			</tbody>
		</table>
		<div class='col-sm-6 col-sm-offset-4'>
		<ul class="pagination">
		  <li><a ng-click=selectPage(-1)>&laquo;</a></li>
		  <li ng-repeat="a in range(pageSize) track by $index" ng-class="{true: 'active', false: ''}[$index+1==page]"><a ng-bind="$index+1" ng-click="selectPage($index+1)"></a></li>
		  <li><a ng-click=selectPage(0)>&raquo;</a></li>
		</ul>
		</div>
		</div>
	</div>
	<s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>