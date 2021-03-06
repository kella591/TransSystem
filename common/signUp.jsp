<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
    <s:include value="../public/include/header.jsp"></s:include>
     <script type="text/javascript" src="../public/library/javascript/jquery.md5.js"></script>
   <script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
    <script type="text/javascript" src='<s:url value="../public/javascript/directive.js"></s:url>'></script>
    <script type="text/javascript" src='<s:url value="./js/signUpCtrl.js"></s:url>'></script>
</head>
<body>
    <s:include value="../public/include/navbar.jsp"></s:include>
    <div class="wrap">
        <div class="container" ng-controller="signUpCtrl">
            <div class="board-single board-standard left-side col-md-8">
            <form class="form-signup" novalidate="novalidate">
            	<input type="text" style="display:none">
            	<input type="password" style="display:none">
                <h2 class="form-signin-heading" ng-bind="'JoinNow:' | translate"></h2>
                <div class="form-row-item">
                    <label for="inputName" class="form-label" ng-bind="'UserName:' | translate"></label>
                    <input type="text" id="inputName" class="form-control form-input"  required="" autofocus="" ng-model="data.value.username" ng-change="check(1)">
                    <div class="form-tips" ng-bind="'UserNameTip' | translate"></div>
                    <div class="form-signup-errortips" ng-if="data.validate.username" ng-bind="'UserNameWarn' | translate"></div>
                </div>

                <div class="form-row-item">
                    <label for="inputTelno" class="form-label" ng-bind="'Phone:' | translate"></label>
                    <input type="text" id="inputTelno" class="form-control form-input"  required="" autofocus="" ng-model="data.value.phone" ng-change="check(2)">
                    <div class="form-tips" ng-bind="'PhoneTip' | translate"></div>
                    <div class="form-signup-errortips" ng-if="data.validate.phone" ng-bind="'PhoneWarn' | translate"></div>
                </div>

                <div class="form-row-item">
                    <label for="inputChecknum" class="form-label" ng-bind="'SMS:' | translate"></label>
                    <input type="text" id="inputChecknum" class="form-control form-input form-input-short" required="" autofocus="" ng-model="data.value.checkNum" ng-change="check(3)">
                    <button class="btn btn-default btn-checkno left-side" ng-click="getCheckNum()" ng-bind="'GetCheckNum' | translate"></button>
                    <div class="form-tips"  ng-bind="'GetCheckNum' | translate"></div>
                    <div class="form-signup-errortips" ng-if="data.validate.checkNum"  ng-bind="'CheckNumWarn' | translate"></div>
                </div>

                <div class="form-row-item">
                    <label for="inputPassword" class="form-label" ng-bind="'Password:' | translate"></label>
                    <input type="password" id="inputPassword" class="form-control form-input" required="" ng-model="data.value.password" ng-change="check(4)">
                    <div class="form-tips"  ng-bind="'PasswordTip' | translate" ></div>
                    <div class="form-signup-errortips" ng-if="data.validate.password"  ng-bind="'PasswordWarn' | translate"></div>
                </div>

                <div class="form-row-item">
                    <label for="inputRole" class="form-label" ng-bind="'ChooseRole:' | translate"></label>
                    <select type="number" id="inputRole" class="form-control form-input" required ng-model="data.value.role" ng-options="role.value as role.name for role in roleList" ng-change="check(5)">
				            <option value=""  ng-bind="'ChooseRole' | translate"></option>
					</select>
                    <div class="form-tips"  ng-bind="'RoleTip' | translate"></div>
                    <div class="form-signup-errortips" ng-if="data.validate.role" ng-bind="'RoleWarn' | translate"></div>
                </div> 

                <div class="form-row-item">
                    <label for="inputEmail" class="form-label" ng-bind="'Mail:' | translate"></label>
                    <input type="text" id="inputEmail" class="form-control form-input"  required="" autofocus="" ng-model="data.value.email" ng-change="check(6)">
                    <div class="form-tips" ng-bind="'MailTip' | translate"></div>
                    <div class="form-signup-errortips" ng-if="data.validate.email" ng-bind="'MailWarn' | translate"></div>
                </div>

                <div class="checkbox form-row-signup">
                    <label><input type="checkbox" value="agree" ng-model="data.agree"><font ng-bind="'AgreeRegist' | translate"></font></label>
                </div>

                <button class="btn btn-lg btn-primary btn-block form-row-signup" type="submit" ng-click="submitHandler()" ng-bind="'Regist' | translate"></button>

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