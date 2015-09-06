<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
    <s:include value="../public/include/header.jsp"></s:include>
    <script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
    <script type="text/javascript" src='<s:url value="./js/bidController.js"></s:url>'></script>
    
</head>
<body>
<s:include value="../public/include/navbar.jsp"></s:include>

<div ng-app='haiyun'>
    <div class="container" ng-controller="bidDetailCtrl">
        <input type="hidden" id="docid" value="<s:property value='#parameters.docid'/>">
        <!--<div class="board-single board-standard left-side col-md-8">-->

        <h2 >查看竞标详情</h2>
        <div class="form-group">
            <label class="control-label col-sm-2">承运商</label>
            <div class="col-sm-9" ng-bind="detailData.offer.userID"></div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2">总价</label>
            <div class="col-sm-9" ng-bind="detailData.offer.totalPrice"></div>
        </div>

        <div class="form-group">
        <div class="col-sm-offset-1 col-sm-11">
            <table class="table">
                <thead>
                <tr>
                    <td>项目名称</td>
                    <td>类型</td>
                    <td>数量</td>
                    <td>单价</td>
                    <td>货币</td>
                </tr>
                </thead>
                <tbody>
                <tr ng-repeat="item in detailData.offerDetail">
                    <td ng-bind="item.cnName + item.enName"></td>
                    <td ng-bind="item.unit"></td>
                    <td ng-bind="item.count"></td>
                    <td ng-bind="item.unitPrice"></td>
                    <td ng-bind="item.currency"></td>
                    <!--<td class="form-signup-errortips" ng-if="!item.validate">此项目为必填项目！</td>-->
                </tr>
                </tbody>
            </table>

        </div>
        </div>

        <div class="form-group">
            <label class="control-label col-sm-2">说明</label>
            <div class="col-sm-9" ng-bind="detailData.offer.description"></div>
        </div>
    </div>
</div>
<s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>