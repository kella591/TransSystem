<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!doctype html>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
    <s:include value="../public/include/header.jsp"></s:include>
     <script type="text/javascript" src="../public/library/javascript/jquery.md5.js"></script>
    <script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
    <script type="text/javascript" src='<s:url value="../public/javascript/directive.js"></s:url>'></script>
    <script type="text/javascript" src='<s:url value="./js/signInCtrl.js"></s:url>'></script>
</head>
<body>
    <s:include value="../public/include/navbar.jsp"></s:include>
    <div class="wrap">
        <div class="container" ng-controller="signInCtrl">
            <div class="board-single left-side col-md-6">
                <h1>广告预留位</h1>
                <p>广告描述</p>
                <p>这里是一个广告预留位置</p>
                <p>可以放置广告信息</p>
                <p>或者网站描述信息</p>
            </div>
            <div class="board-single board-standard right-side">
                <form class="form-signin"  ng-submit="submitHandler()">
                    <h2 class="form-signin-heading" ng-bind="'LogInNow' | translate"></h2>

                    <label for="inputEmail" class="sr-only" ng-bind="'PhoneMail' | translate"></label>
                    <input type="text" id="inputEmail" class="form-control form-signin-input" placeholder="{{'PhoneMail' | translate}}" required="" autofocus="" ng-model="data.value.email">
                    <ng-warning ng-tip="请输入合法邮箱地址" ng-if="data.validate.email"></ng-warning>

                    <label for="inputPassword" class="sr-only" ng-bind="'Password' | translate"></label>
                    <input type="password" id="inputPassword" class="form-control form-signin-input" placeholder="{{'Password' | translate}}" required="" ng-model="data.value.password">
                    <ng-warning ng-tip="密码错误" ng-if="data.validate.password"></ng-warning>

                    <div class="checkbox left-side">
                        <label>
                            <input type="checkbox" value="remember-me" ng-model="state" ><font ng-bind="'RememberMe' | translate"></font>
                        </label>
                    </div>

                    <div class="form-signin-txt right-side"><font ng-bind="'NoAccount' | translate"></font>
                    <a href="signUp.jsp" ng-bind="'JoinNow' | translate">点此免费注册</a></div>

                    <button class="btn btn-lg btn-primary btn-block" type="submit" ng-bind="'SignIn' | translate"></button>
                </form>
            </div>
        </div>
    </div>

    <s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>