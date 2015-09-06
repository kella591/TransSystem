<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
	<title>海运系统</title>
	<script type="text/javascript" src='<s:url value="./languages/cn.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./languages/en.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./public/library/javascript/jquery.min.js"></s:url>'></script>
	<link rel="stylesheet" type="text/css" href='<s:url value="./public/library/css/sweetalert.css"></s:url>'>
	<link rel="stylesheet" type="text/css" href='<s:url value="./public/library/css/bootstrap.min.css"></s:url>'>
	<link rel="stylesheet" type="text/css" href='<s:url value="./public/css/main-frame.css"></s:url>'>
	<link rel="stylesheet" type="text/css" href='<s:url value="./public/css/sign.css"></s:url>'>
	<script type="text/javascript" src='<s:url value="./public/library/javascript/jquery.cookie.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./public/library/javascript/angular.min.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./public/library/javascript/angular-route.min.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./public/library/javascript/sweetalert.min.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./public/library/javascript/angular-translate.min.js"></s:url>'></script>
    <script type="text/javascript" src='<s:url value="./public/javascript/service.js"></s:url>'></script>
    <script type="text/javascript" src='<s:url value="./common/js/indexCtrl.js"></s:url>'></script>
	<!--[if lt IE 9]>
	<script type="text/javascript" src='<s:url value="./public/library/javascript/json2.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./public/library/javascript/html5shiv.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./public/library/javascript/respond.min.js"></s:url>'></script>
	<![endif]-->
	<script type="text/javascript">
		function changeLan(type){
			if($.cookie("language")===type){
				return;
			}
			$.cookie("language", type,{path: "/"});
			history.go(0);
		}
	</script>
</head>
<body>
<div class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container standard-line">
        <div class="left-side">
            <a href='&lt;s:url value="../help.html"&gt;&lt;/s:url&gt;' class="txt-item" ng-bind="'Help' | translate"></a>
            <a onclick="changeLan('en')">English</a>|<a onclick="changeLan('cn')">中文</a>
        </div>
        <div class="right-side">
            <s:if test="#session.user!=null">
	            <span class="text-plain"><font ng-bind="'Hello' | translate"></font>
	            <s:property value="#session.user.email" /></span>&#160;&#160;
				<a class="navbar-link" href='<s:url value="./user/privateMsg.jsp"></s:url>' ng-bind="'Msg' | translate"></a>
				<a class="navbar-link" href='<s:url value="./user/userAutho.jsp"></s:url>' ng-bind="'Auto' | translate"></a>
				<a class="navbar-link" href='<s:url value="./common/user.jsp"></s:url>' ng-bind="'UserCenter' | translate"></a>
				<a class="navbar-link" href='<s:url value="./userlogout.action"></s:url>' ng-bind="'Quit' | translate"></a>
            </s:if>
            <s:else>
                <a href='<s:url value="./common/signIn.jsp"></s:url>' class="txt-item" ng-bind="'SignIn' | translate"></a>
                <div class="txt-item">|</div>
                <a href='<s:url value="./common/signUp.jsp"></s:url>' class="txt-item" ng-bind="'SignUp' | translate"></a>
            </s:else>
        </div>
    </div>
</div>
<br/>
<br/>

	<div>
    	<ul class="nav nav-tabs">
    		<li id="menu-index" role="presentation"><a href="./" ng-bind="'MainPage' | translate"></a></li>
    		<s:if test="#session.user!=null">
    			<s:if test="#session.user.role.toString().contains('TRADE')||#session.user.role.toString().contains('贸易商') ">
					<!--<li id="menu-user"><a href='<s:url value="./common/user.jsp"></s:url>' ng-bind="'UserCenter' | translate"></a></li>-->
					<li id="menu-viewBidDocList"><a href='<s:url value="./user/viewBidDocList.jsp"></s:url>' ng-bind="'ViewBidDoc' | translate"></a></li>
					<li id="menu-createBidDoc"><a href='<s:url value="./user/createBidDoc.jsp"></s:url>' ng-bind="'CreateBidDoc' | translate"></a></li>
					<!--<li id="menu-userAutho"><a href='<s:url value="./user/userAutho.jsp"></s:url>' ng-bind="'Auto' | translate"></a></li>-->
					<!--<li id="menu-privateMsg"><a href='<s:url value="./user/privateMsg.jsp"></s:url>' ng-bind="'Msg' | translate"></a></li>-->
					<li id="menu-route"><a href='<s:url value="./user/viewRoute.jsp"></s:url>' ng-bind="'ViewGroup' | translate"></a></li>
					<li id="menu-shipper"><a href='<s:url value="./user/viewAllBidDocList.jsp"></s:url>' ng-bind="'ViewAll' | translate"></a></li>
				</s:if><s:if test="#session.user.role.toString().contains('个人')||#session.user.role.toString().contains('PERSON')">
					<!--<li id="menu-user"><a href='<s:url value="./common/user.jsp"></s:url>' ng-bind="'UserCenter' | translate"></a></li>-->
					<li id="menu-viewBidDocList"><a href='<s:url value="./personal/viewBidDocList.jsp"></s:url>' ng-bind="'ViewBidDoc' | translate"></a></li>
					<li id="menu-createBidDoc"><a href='<s:url value="./user/createBidDoc.jsp"></s:url>' ng-bind="'CreateBidDoc' | translate"></a></li>
					<!--<li id="menu-userAutho"><a href='<s:url value="./user/userAutho.jsp"></s:url>' ng-bind="'Auto' | translate"></a></li>-->
					<!--<li id="menu-privateMsg"><a href='<s:url value="./user/privateMsg.jsp"></s:url>' ng-bind="'Msg' | translate"></a></li>-->
					<li id="menu-privateMsg"><a href='<s:url value="./user/viewRoute.jsp"></s:url>' ng-bind="'ViewGroup' | translate"></a></li>
				</s:if>
				<s:elseif test="#session.user.role.toString().contains('TRANSPORT')||#session.user.role.toString().contains('承运商')">
					<!--li id="menu-shipper"><a href='<s:url value="./shipper/shipper.jsp"></s:url>' ng-bind="'UserCenter' | translate"></a></li-->
					<li id="menu-user"><a href='<s:url value="./shipper/user.jsp"></s:url>' ng-bind="'UserCenter' | translate"></a></li>
					<li id="menu-bid"><a href='<s:url value="./shipper/viewAllBidDocList.jsp"></s:url>' ng-bind="'ViewAll' | translate"></a></li>
					<li id="menu-createRoute"><a href='<s:url value="./user/createRoute.jsp"></s:url>' ng-bind="'CreateRoute' | translate"></a></li>
				</s:elseif>
				<s:elseif test="#session.user.role.toString().contains('ADMIN')||#session.user.role.toString().contains('管理员')">
					<li id="menu-admin"><a href='<s:url value="./admin/admin.jsp"></s:url>' ng-bind="'UserCenter' | translate"></a></li>
					<!--li id="menu-autho"><a href='<s:url value="./admin/approveAutho.jsp"></s:url>' ng-bind="'Autho' | translate"></a></li -->
					<!--<li id="menu-edit"><a href='<s:url value="./common/editInfo.jsp"></s:url>' ng-bind="'EditUser' | translate"></a></li>-->
					<li id="menu-userList"><a href='<s:url value="./admin/userList.jsp"></s:url>' ng-bind="'UserList' | translate"></a></li>
					<li id="menu-cms"><a href='<s:url value="./admin/manageCms.jsp"></s:url>' ng-bind="'manageCms' | translate"></a></li>
				</s:elseif>
		  	</s:if>
		</ul>
	</div>
	<div class="wrap">
        <div class="container" ng-controller="indexCtrl">
			<div class="col-sm-offset-3 col-sm-8">
				<table class="well table">
					<tr ng-repeat="cms in cmsList"><td><a href="./common/cmsDetail.jsp?id={{cms.id}}"><font ng-bind="cms.cmsTitle"></font><font ng-bind="cms.postTime"></font></a></td></tr>
				</table>
			</div>
		</div>
	</div>
<s:include value="./public/include/footer.jsp"></s:include>
</body>
</html>