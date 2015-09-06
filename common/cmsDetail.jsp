<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!doctype html>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
    <s:include value="../public/include/header.jsp"></s:include>
    <script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
    <script type="text/javascript" src='<s:url value="./js/cmsDetailCtrl.js"></s:url>'></script>
</head>
<body>
    <s:include value="../public/include/navbar.jsp"></s:include>
    <div class="wrap">
    	<input type="hidden" id="cmsId" value="<s:property value='#parameters.id'/>">
        <div class="container" ng-controller="cmsDetailCtrl">
        	<h2 ng-bind="cms.cmsTitle"></h2>
        	<div ng-bind="cms.cmsContent"></div>
        	<div ng-bind="cms.postTime"></div>
            <div ng-bind="cms.editTime"></div>
            <div ng-bind="cms.cmsType.name"></div>
        </div>
    </div>
    <s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>