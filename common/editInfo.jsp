<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
    <s:include value="../public/include/header.jsp"></s:include>
       <script type="text/javascript" src="../public/library/javascript/jquery.md5.js"></script>
    <script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
    <script type="text/javascript" src='<s:url value="../public/javascript/directive.js"></s:url>'></script>
    <script type="text/javascript" src='<s:url value="./js/editInfoCtrl.js"></s:url>'></script>
</head>
<body>
    <s:include value="../public/include/navbar.jsp"></s:include>
    <div class="wrap">
        <div class="container" ng-controller="editInfoCtrl">
            <div class="board-single board-standard left-side col-md-8">
            <form class="form-signup" novalidate="novalidate" autocomplete="off">
            	<input type="text" style="display:none">
            	<input type="password" style="display:none">
                <h2 class="form-signin-heading" ng-bind="'ChangeInfo' | translate"></h2>
                <div class="form-row-item">
                    <label for="inputName" class="form-label" ng-bind="'UserName:' | translate"></label>
                    <input type="hidden" value="<s:property value='#session.user.username'/>" id="username">
                    <input type="text" id="inputName" class="form-control form-input"  ng-model="data.value.username" ng-change="check(1)" placeholder="<s:property value='#session.user.username'/>">
                    <div class="form-tips" ng-bind="'UserNameTip' | translate"></div>
                    <div class="form-signup-errortips" ng-if="data.validate.username" ng-bind="'UserNameTip' | translate"></div>
                </div>

                <div class="form-row-item">
                    <label for="inputPassword" class="form-label" ng-bind="'Password:' | translate"></label>
                    <input type="password" id="inputPassword" class="form-control form-input" required="" ng-model="data.value.password" ng-change="check(4)">
                     <div class="form-tips"  ng-bind="'PasswordTip' | translate" ></div>
                    <div class="form-signup-errortips" ng-if="data.validate.password"  ng-bind="'PasswordTip' | translate"></div>
                </div>

                <div class="form-row-item">
                    <label for="inputEmail" class="form-label" ng-bind="'Mail:' | translate"></label>
                    <input type="hidden" value="<s:property value='#session.user.email'/>" id="email">
                    <input type="text" id="inputEmail" class="form-control form-input"  required="" autofocus="" ng-model="data.value.email" ng-change="check(6)" placeholder="<s:property value='#session.user.email'/>">
                    <div class="form-tips" ng-bind="'MailTip' | translate"></div>
                    <div class="form-signup-errortips" ng-if="data.validate.email" ng-bind="'MailTip' | translate"></div>
                </div>
                <button class="btn btn-lg btn-primary btn-block form-row-signup" type="submit" ng-click="submitHandler()" ng-bind="'Update' | translate"></button>

            </form>
            </div>
            <div class="board-single div-standard right-side">
                <h1>广告预留位</h1>
                <p>广告描述</p>
                <p>这里是一个广告预留位置</p>
                <p>可以放置广告信息</p>
                <p>或者网站描述信息</p>
            </div>
        </div>
    </div>

    <s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>