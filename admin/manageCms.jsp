<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
    <s:include value="../public/include/header.jsp"></s:include>
</head>
<body>
<s:include value="../public/include/navbar.jsp"></s:include>

<div class="container" ng-controller="manageCmsCtrl">
    <div class="row">
    	<table class="table col-sm-3 col-sm-offset-1">
    		<tr><td class="col-sm-4">ID</td><td class="col-sm-6 col-sm-offset-1"><input type="text" ng-model = "searchData.ID"/></td></tr>
    		<tr><td class="col-sm-4">类别</td><td class="col-sm-6 col-sm-offset-1">
    			<select ng-model="searchData.cmsType" ng-options="type.value as type.name for type in typeList">
        			<option value="">-请选择-</option>
        		</select>
        	</td></tr>
        	<tr><td class="col-sm-4"></td><td class="col-sm-6 col-sm-offset-1"><button ng-click="getCmsList()">搜索</button></td></tr>
    	</table>
        <table class="table col-sm-6 col-sm-offset-1">
            <thead><tr>
                <td>ID</td>
                <td>标题</td>
                <td>内容</td>
                <td>发布时间</td>
                <td>发布人</td>
                <td>最后编辑时间</td>
                <td>最后编辑IP</td>
                <td>类别</td>
            </tr></thead>
            <tbody>
            <tr ng-repeat="cms in cmsList">
                <td ng-bind="cms.id"></td>
                <td ng-bind="cms.cmsTitle"></td>
                <td ng-bind="cms.cmsContent"></td>
                <td ng-bind="cms.postTime"></td>
                <td ng-bind="cms.adminID"></td>
                <td ng-bind="cms.editTime"></td>
                <td ng-bind="cms.postIP"></td>
                <td ng-bind="cms.cmsType"></td>
                <td><a href="../common/cmsDetail.jsp?id={{cms.id}}">查看</a><button ng-click="deleteCms(cms.id)">删除</button></td>
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
        <form  class='col-sm-6 col-sm-offset-4'>
        	<input type="text" ng-model="input.cmsTitle" placeholder="title"/>
        	<input type="textArea" ng-model="input.cmsContent"  placeholder="content"/>
        	<select ng-model="input.cmsType" ng-options="type.value as type.name for type in typeList">
        	<option value="">-请选择-</option>
        	</select>
        	<button class="btn" ng-click="addCms()">添加</button>
        </form>
    </div>
</div>
<s:include value="../public/include/footer.jsp"></s:include>
<script type="text/javascript" src='<s:url value="../public/library/javascript/angular.min.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/library/javascript/angular-route.min.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
<!--<script type="text/javascript" src='<s:url value="../public/javascript/directive.js"></s:url>'></script>-->
<script type="text/javascript" src='<s:url value="./js/manageCmsCtrl.js"></s:url>'></script>

</body>
</html>