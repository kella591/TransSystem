<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
<s:include value="../public/include/header.jsp"></s:include>
<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./js/docListController.js"></s:url>'></script>
</head>
<body>
	<s:include value="../public/include/navbar.jsp"></s:include>
	
	<div class="container-fluid" ng-controller="docListController">
		<div>
		  	<select required ng-model="state" ng-options="state.value as state.name for state in stateList" ng-change="changeState()">
			<option value="" ng-bind="'ChooseCate' | translate"></option>
			</select>
		</div>
		<div class="row">
		<table class="table">
		<thead><tr><td>ID</td><td ng-bind="'FromDate'|translate"></td><td ng-bind="'ToDate'|translate"></td><td ng-bind="'FromPort'|translate"></td><td ng-bind="'ToPort'|translate"></td></tr></thead>
		<tbody>
		<tr ng-repeat="doc in docList">
			<td ng-bind="doc.id"></td>
			<td ng-bind="doc.departureDate"></td>
			<td ng-bind="doc.arrivalDate"></td>
			<td ng-bind="doc.arrivalPort[name]"></td>
			<td ng-bind="doc.departPort[name]">
			<td><a href="./viewBidDoc.jsp?docid={{doc.id}}&type=1" ng-bind="'DocDetail'|translate"></a></td>
			<td><a href="./viewBidTransportList.jsp?docid={{doc.id}}" ng-bind="'TransportDetail'|translate">竞标商详情</a>
			</td>
			<td ng-if="doc.state.value==='GOING'"><a href="./timeLine.jsp?docid={{doc.id}}">时间轴</a></td>
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