<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
    <s:include value="../public/include/header.jsp"></s:include>
    <link rel="stylesheet" type="text/css" href='<s:url value="../public/css/sign.css"></s:url>'>
</head>
<body>
<s:include value="../public/include/navbar.jsp"></s:include>
<div class="wrap">
    <div class="container" ng-controller="editInfoCtrl">
        <input type="hidden" id="userid" value="<s:property value='#parameters.userid'/>">
        <div class="board-single board-standard left-side col-md-8">
            <form class="form-signup" novalidate="novalidate" autocomplete="off">
                <h2 class="form-signin-heading" ng-bind="'ChangeInfo' | translate">修改信息</h2>
                <div class="form-row-item">
                    <input type="hidden" value="<s:property value='#session.user.username'/>" id="username">
                    <label for="inputName" class="form-label" ng-bind="'UserName:' | translate">用户名：</label>
                    <span ng-model="data.value.username" ng-bind="<s:property value='#session.user.username'/>"></span>
                </div>

                <div class="form-row-item">
                    <input type="hidden" value="<s:property value='#session.user.role'/>" id="userrole">
                    <label for="inputRole" class="form-label" ng-bind="'ChangeRole:' | translate">选择身份：</label>
                    <select type="number" id="inputRole" class="form-control form-input" required ng-model="data.value.role" ng-options="role.value as role.name for role in roleList" >
                    </select>
                </div>
                <!--<div class="form-row-item">-->
                    <!--<input type="hidden" value="<s:property value='#session.user.state'/>" id="userState">-->
                    <!--<label for="inputRole" class="form-label" ng-bind="'ChangeState:' | translate">状态修改：</label>-->
                    <!--<select type="number" id="inputState" class="form-control form-input" required ng-model="data.value.state" ng-options="state.value as state.name for role in stateList" >-->
                    <!--</select>-->
                <!--</div>-->

                <button class="btn btn-lg btn-primary btn-block form-row-signup" type="submit" ng-click="submitHandler()" ng-bind="'Update' | translate">更新</button>
            </form>
        </div>
    </div>
</div>

<s:include value="../public/include/footer.jsp"></s:include>
<script type="text/javascript" src="../public/library/javascript/jquery.md5.js"></script>
<script type="text/javascript" src='<s:url value="../public/library/javascript/angular.min.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/library/javascript/angular-route.min.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/javascript/directive.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../admin/js/editUserController.js"></s:url>'></script>
</body>
</html>