<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
    <s:include value="../public/include/header.jsp"></s:include>
</head>
<body>
<s:include value="../public/include/navbar.jsp"></s:include>

<div>
    <div class="container" >
        <form class="form-horizontal" role="form" novalidate="novalidate" ng-controller="goodDataCtrl">
            <h3>添加常运货物可选数据:</h3>
            <div  class="form-group">
                <label class="control-label col-sm-2">中文名</label>
                <div class="col-sm-3">
                    <input required type="text" class="form-control form-input"  ng-model="favorGoodData.cnName">
                </div>
            </div>
            <div  class="form-group">
                <label class="control-label col-sm-2">英文名</label>
                <div class="col-sm-3">
                    <input required type="text" class="form-control form-input"  ng-model="favorGoodData.enName">
                </div>
            </div>
            <div  class="form-group">
                <label class="control-label col-sm-2"></label>
                <div class="col-sm-4">
                    <button type="submit" class="btn btn-default" ng-click="submitFavorGoodData()"> 提交</button>
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-4"></label>
                <div class="col-sm-7">
                    <label class="txt-item" ng-repeat="x in goodData.favorGoodDataList"
                           ng-bind="x"></label>
                </div>
            </div>

        </form>

        <form class="form-horizontal" role="form" novalidate="novalidate" ng-controller="goodCtrl">
            <div  class="form-group">
                <label class="control-label col-sm-2">添加常运货物:</label>
                <div class="col-sm-3">
                    <select required class="form-control" ng-model="goodData.favorGood"
                            ng-options="x.id as x.cnName for x in goodData.goodList">
                        <option value="">-请选择-</option>
                        <option value="-1">其他服务</option>
                    </select>
                </div>
            </div>

            <div ng-show="goodData.favorGood == -1" class="form-group">
                <label class="control-label col-sm-2">填写服务内容</label>
                <div class="col-sm-3">
                    <input required type="text" class="form-control form-input"  ng-model="goodData.goodRemark">
                </div>
            </div>

            <div  class="form-group">
                <label class="control-label col-sm-2"></label>
                <div class="col-sm-4">
                    <button type="submit" class="btn btn-default"
                            ng-click="submitFavorGood()">提交</button>
                </div>
            </div>
        </form>
    </div>

</div>
<s:include value="../public/include/footer.jsp"></s:include>
<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/javascript/directive.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="./js/admin.js"></s:url>'></script>

</body>
</html>