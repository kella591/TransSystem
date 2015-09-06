<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!doctype html>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
<s:include value="../public/include/header.jsp"></s:include>
 <script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./js/aptitudeController.js"></s:url>'></script>
	<link rel="stylesheet" type="text/css" href="http://sandbox.runjs.cn/uploads/rs/55/sjckzedf/lanrenzhijia.css">
</head>
<body>
	<s:include value="../public/include/navbar.jsp"></s:include>
	
	<div class="container-fluid" >
		<div class="row">
		<div class=" col-md-7 col-md-offset-2">
			<s:include value="../public/include/userInfo.jsp"></s:include>
			<a class="col-md-offset-9 col-md-1 btn" href="../common/editInfo.jsp" ng-bind="'Change' | translate"></a>
           	<div ng-controller="aptitudeController">
           	<table class="table">
           	<thead ng-bind="'FavoritePortList:' | translate"></thead>
           	<tr><th ng-bind="'FromPort' | translate"></th><th ng-bind="'ToPort' | translate"></th><th ng-bind="'Category' | translate"></th></tr>
           	<tr ng-repeat="port in favoritePorts"><td ng-bind="port.fromPort[name]"></td><td ng-bind="port.toPort[name]"></td><td ng-bind="port.type.name"></td></tr>
           	</table>
           	<ul class="pagination">
			  <li><a ng-click=selectPage(-1)>&laquo;</a></li>
			  <li ng-repeat="a in range(pageSize) track by $index" ng-class="{true: 'active', false: ''}[$index+1==page]"><a ng-bind="$index+1" ng-click="selectPage($index+1)"></a></li>
			  <li><a ng-click=selectPage(0)>&raquo;</a></li>
			</ul>
			<form class="form-horizontal" role="form">
			  	<div class="form-group">
		            <label class="control-label col-sm-2" ng-bind="'FromPort' | translate"></label>
		            <div class="col-sm-3">
			            <select required class="form-control" ng-model="input.fromPortID" ng-options="port.id as port[name] for port in dataList.portZeroLevel">
			           	<option value="" ng-bind="'ChooseCate' | translate"></option>
				        </select>
			      	</div>
		        </div>
			  	<div class="form-group">
		            <label class="control-label col-sm-2" ng-bind="'ToPort' | translate"></label>
		            <div class="col-sm-3">
			            <select required class="form-control" ng-model="input.toPortID" ng-options="port.id as port[name] for port in dataList.portZeroLevel">
			            <option value="" ng-bind="'ChooseCate' | translate"></option>
				        </select>
			      	</div>
		          </div>
		          <div class="form-group">
		          		<label class="control-label col-sm-2" ng-bind="'Category' | translate"></label>
				          <div class="col-sm-3">
				          <select  required ng-model="input.type" ng-options="type.value as type.name for type in typeList">
				            <option value="" ng-bind="'ChooseCate' | translate"></option>
						</select>
				          </div>
		          </div>
		          <div class="form-group">
		          	<div class="col-sm-offset-9"><button class="btn" ng-click="addFavoritePort()" ng-bind="'Add'|translate"></button></div>
		          </div>
		          </form>
           	</div>
		</div>
		</div>
	</div>
	<s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>