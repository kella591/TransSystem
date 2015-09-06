<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
<s:if test="#session.user!=null && (#session.user.role.toString()=='TRANSPORT'||#session.user.role.toString()=='承运商')">
<script>
//location.href="../index.html";
</script>
</s:if>
	<s:include value="../public/include/header.jsp"></s:include>
	<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./js/shipperController.js"></s:url>'></script>
</head>
<body>
	<s:include value="../public/include/navbar.jsp"></s:include>
	
	<div class="container-fluid" ng-controller="shipperController">
		<s:include value="../public/include/userInfo.jsp"></s:include>
		<a class="col-md-offset-9" href="../common/editInfo.jsp"><button>修改</button></a>
		
		<div class="row">
		<table class="table">
		<thead><tr><td>出发日期</td><td>到达</td></tr></thead>
		<tbody>
		</tbody>
		</table>
		<div class='col-sm-6 col-sm-offset-4'>
		<ul class="pagination">
		  <li><a ng-click=selectPage(-1)>&laquo;</a></li>
		  <li ng-repeat="a in range(pageSize) track by $index" ng-class="{true: 'active', false: ''}[$index+1==page]"><a ng-bind="$index+1" ng-click="selectPage($index+1)"></a></li>
		  <li><a ng-click=selectPage(0)>&raquo;</a></li>
		</ul>
		</div>
		<div class='col-sm-6 col-sm-offset-4'>
		<form class="form">
		<h4>增加路线：</h4>
			id:<input ng-model="input['route.id']" type='text'><br/>
			<input type='button' ng-click="addRoute()" value='提交'>
		</form>
		</div>
		</div>
	</div>
	<s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>