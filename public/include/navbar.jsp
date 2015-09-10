<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@taglib prefix="s" uri="/struts-tags"%>
<input type="hidden" id="userRoleSpecial" value="<s:property value='#session.user.role'/>">
<script type="text/javascript">
//var href = window.location.href;
//var userRoleSpec = $('#userRoleSpecial')[0].value;
//var reg0 = /^.*((((signIn)|(signUp))\.jsp)|userlogout\.action).*$/;
//var reg1 = /^.*((PERSON)|(TRADE)).*$/;
//var reg2 = /^.*(TRANSPORT).*$/;
//var reg3 = /^.*(ADMINISTOR).*$/;
//var reg4 = /^.*((viewBidDocList)|(createBidDoc)|(userAutho)|(privateMsg)|(viewRoute)|(user)|(bidingDetail)|(evaluate)|(map)|(timeLine)|(viewBidDoc)|(viewBidTransportList)|(viewRoute)|(viewRouteDetail))\.jsp.*$/;
//var reg5 = /^.*((user)|(viewAllBidDocList)|(createRoute)|(biding)|(bidingDetail)|(privateMsg)|(timeLine)|(viewBidDoc)|(viewRoute)||(viewRouteDetail))\.jsp.*$/;
//var reg6 = /^.*((admin)|(editUser)|(userList)|(approveAutho))\.jsp.*$/;
//if(reg0.test(href)){}
//else if(!((reg4.test(href)&&reg1.test(userRoleSpec))||(reg5.test(href)&&reg2.test(userRoleSpec))||(reg6.test(href)&&reg3.test(userRoleSpec)))){console.log(href+":"+userRoleSpec);window.location="../index.jsp";}
function changeLan(type){
	if($.cookie("language")===type){
		return;
	}
	$.cookie("language", type,{path: "/"});
	history.go(0);
}
</script>
<div class="navbar navbar-default navbar-fixed-top" role="navigation">
<!--  h1><%=request.getContextPath()%></h1> -->
    <div class="container standard-line">
        <div class="left-side">
            <a href='&lt;s:url value="../help.html"&gt;&lt;/s:url&gt;' class="txt-item" ng-bind="'Help' | translate"></a>
            <a onclick="changeLan('en')">English</a>|<a onclick="changeLan('cn')">中文</a>
        </div>
        <div class="right-side">
            <s:if test="#session.user!=null">
	            <span class="text-plain"><font ng-bind="'Hello' | translate"></font>
	            <s:property value="#session.user.email" /></span>&#160;&#160;
            	<a class="navbar-link" href='<s:url value="../user/privateMsg.jsp"></s:url>' ng-bind="'Msg' | translate"></a>
				<a class="navbar-link" href='<s:url value="../user/userAutho.jsp"></s:url>' ng-bind="'Auto' | translate"></a>
				<a class="navbar-link" href='<s:url value="../common/user.jsp"></s:url>' ng-bind="'UserCenter' | translate"></a>
				<a class="navbar-link" href='<s:url value="./userlogout.action"></s:url>' ng-bind="'Quit' | translate"></a>
            </s:if>
            <s:else>
                <a href='<s:url value="../common/signIn.jsp"></s:url>' class="txt-item" ng-bind="'SignIn' | translate"></a>
                <div class="txt-item">|</div>
                <a href='<s:url value="../common/signUp.jsp"></s:url>' class="txt-item" ng-bind="'SignUp' | translate"></a>
            </s:else>
        </div>
    </div>
</div>
<br/>
<br/>
	<div>
		<ul class="nav nav-tabs">
			<li id="menu-index" role="presentation"><a href="../" ng-bind="'MainPage' | translate"></a></li>
			<s:if test="#session.user!=null">
				<s:if test="#session.user.role.toString().contains('TRADE')||#session.user.role.toString().contains('贸易商') ">
					<li id="menu-viewBidDocList"><a href='<s:url value="../user/viewBidDocList.jsp"></s:url>' ng-bind="'ViewBidDoc' | translate"></a></li>
					<li id="menu-createBidDoc"><a href='<s:url value="../user/createBidDoc.jsp"></s:url>' ng-bind="'CreateBidDoc' | translate"></a></li>
					<li id="menu-viewRoute"><a href='<s:url value="../user/viewRoute.jsp"></s:url>' ng-bind="'ViewGroup' | translate"></a></li>
					<li id="menu-viewAllBidDocList"><a href='<s:url value="../user/viewAllBidDocList.jsp"></s:url>' ng-bind="'ViewAll' | translate"></a></li>
				</s:if>
				<s:if test="#session.user.role.toString().contains('个人')||#session.user.role.toString().contains('PERSON')">
					<li id="menu-viewBidDocList"><a href='<s:url value="../personal/viewBidDocList.jsp"></s:url>' ng-bind="'ViewBidDoc' | translate"></a></li>
					<li id="menu-createBidDoc"><a href='<s:url value="../user/createBidDoc.jsp"></s:url>' ng-bind="'CreateBidDoc' | translate"></a></li>
					<li id="menu-viewRoute"><a href='<s:url value="../user/viewRoute.jsp"></s:url>' ng-bind="'ViewGroup' | translate"></a></li>
				</s:if>
				<s:elseif test="#session.user.role.toString().contains('TRANSPORT')||#session.user.role.toString().contains('承运商')">
					<!--li id="menu-shipper"><a href='<s:url value="../shipper/shipper.jsp"></s:url>' ng-bind="'UserCenter' | translate"></a></li-->
					<!--<li id="menu-user"><a href='<s:url value="../shipper/user.jsp"></s:url>' ng-bind="'UserCenter' | translate"></a></li>-->
					<li id="menu-shipper"><a href='<s:url value="../user/viewAllBidDocList.jsp"></s:url>' ng-bind="'ViewAll' | translate"></a></li>
					<li id="menu-createRoute"><a href='<s:url value="../user/createRoute.jsp"></s:url>' ng-bind="'CreateRoute' | translate"></a></li>
				</s:elseif>
				<s:elseif test="#session.user.role.toString().contains('ADMIN')||#session.user.role.toString().contains('管理员')">
					<li id="menu-admin"><a href='<s:url value="../admin/admin.jsp"></s:url>' ng-bind="'UserCenter' | translate"></a></li>
					<!--li id="menu-autho"><a href='<s:url value="../admin/approveAutho.jsp"></s:url>' ng-bind="'Autho' | translate"></a></li -->
					<!--<li id="menu-edit"><a href='<s:url value="../common/editInfo.jsp"></s:url>' ng-bind="'EditUser' | translate"></a></li>-->
					<li id="menu-userList"><a href='<s:url value="../admin/userList.jsp"></s:url>' ng-bind="'UserList' | translate"></a></li>
					<li id="menu-cms"><a href='<s:url value="../admin/manageCms.jsp"></s:url>' ng-bind="'manageCms' | translate"></a></li>
				</s:elseif>
			</s:if>
		</ul>
	</div>
