<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
    <s:include value="../public/include/header.jsp"></s:include>
</head>
<body>
<s:include value="../public/include/navbar.jsp"></s:include>

<div>

    <div class="container" ng-controller="userListCtrl">
        <table class="table">
            <thead><tr>
                <td ng-bind="'ID'|translate">ID</td>
                <td ng-bind="'UserName'|translate">用户名</td>
                <td ng-bind="'Phone'|translate">手机</td>
                <td ng-bind="'Mail'|translate">邮箱</td>
                <td ng-bind="'Role'|translate">身份</td>
                <td ng-bind="创建时间"></td>
            </tr></thead>
            <tbody>
            <tr ng-repeat="user in userList">
                <td ng-bind="user.id"></td>
                <td ng-bind="user.username"></td>
                <td ng-bind="user.telephone"></td>
                <td ng-bind="user.email"></td>
                <td ng-bind="user.role.name"></td>
                <td ng-bind="user.createTime"></td>
                <!--<td><a href="./approveAutho.jsp?userid={{user.id}}" ng-bind="'Qualification' | translate">资质认证</a></td>-->
                <td><a href="./editUser.jsp?userid={{user.id}}" ng-bind="'EditInfo' | translate">修改信息</a></td>
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

    <div class="container" ng-controller="authUserListCtrl">
        <table class="table">
            <thead><tr>
                <td ng-bind="'ID'|translate">ID</td>
                <td ng-bind="'UserName'|translate">用户名</td>
                <td ng-bind="'Phone'|translate">手机</td>
                <td ng-bind="'Mail'|translate">邮箱</td>
                <td ng-bind="'Role'|translate">身份</td>
                <td ng-bind="'LogDate'|translate">最后登录</td>
            </tr></thead>
            <tbody>
            <tr ng-repeat="user in userList">
                <td ng-bind="user.id"></td>
                <td ng-bind="user.username"></td>
                <td ng-bind="user.telephone"></td>
                <td ng-bind="user.email"></td>
                <td ng-bind="user.role.name"></td>
                <td ng-bind="user.loginTime"></td>
                <td><a href="./approveAutho.jsp?userid={{user.id}}" ng-bind="'Qualification' | translate">资质认证</a></td>
                <!--<td><a href="./editUser.jsp?userid={{user.id}}" ng-bind="'EditInfo' | translate">修改信息</a></td>-->
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
<script type="text/javascript" src='<s:url value="../public/library/javascript/angular.min.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/library/javascript/angular-route.min.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
<!--<script type="text/javascript" src='<s:url value="../public/javascript/directive.js"></s:url>'></script>-->
<script type="text/javascript" src='<s:url value="./js/userListController.js"></s:url>'></script>

</body>
</html>