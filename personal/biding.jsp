<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
    <s:include value="../public/include/header.jsp"></s:include>
    <script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="./js/bidController.js"></s:url>'></script>
    <style>
        .form-input{
            height: auto;
            width: 8em;
        }
    </style>
</head>
<body>
<s:include value="../public/include/navbar.jsp"></s:include>

<div>
    <div class="container" ng-controller="bidCtrl">
        <input type="hidden" id="docid" value="<s:property value='#parameters.docid'/>">
        <input type="hidden" id="userid" value="<s:property value='#parameters.userid'/>">
        <!--<div class="board-single board-standard left-side col-md-8">-->

            <h2 >参与竞标</h2>
            <table class="table">
            <thead>
            <tr>
                <td>货运类别(运输方式&装箱类别)</td>
                <td>项目名称</td>
                <td>类型</td>
                <td>数量</td>
                <td>单价</td>
                <td>货币</td>
            </tr>
            </thead>
            <tbody>
            <tr ng-repeat="item in bidData.itemList">
                <td ng-bind="item.type.name"></td>
                <td ng-bind="item.cnName + item.enName"></td>
                <td >
                    <span ng-if="item.itemClass.value=='NECESSARY'"  ng-bind="item.unit"></span>
                    <!-- ng-model="item.unitInput" -->
                    <select ng-if="item.itemClass.value=='NON_NECESSARY'" class="form-control form-input" required ng-model="item.unit" ng-options=" unit.cnUnit for unit in bidData.unitList">
                        <option value="">选择单位</option>
                    </select>
                </td>
                <td><input class="form-control form-input"  type="number" ng-model="item.count"/></td>
                <td><input class="form-control form-input"  type="text" ng-model="item.unitPirce" ng-change="check(1)"/></td>
                <td >
                    <span ng-if="item.itemClass.value=='NECESSARY'" ng-bind="item.currency"></span>
                    <!-- ng-model="item.currencyInput" ng-bind="item.currency"-->
                    <select ng-if="item.itemClass.value=='NON_NECESSARY'" class="form-control form-input" required ng-model="item.currency" ng-options=" currency.cnCurrency for currency in bidData.currencyList">
                        <option value="">选择货币</option>
                    </select>
                </td>
                <!--<td class="form-signup-errortips" ng-if="!item.validate">此项目为必填项目！</td>-->
            </tr>
            </tbody>
            </table>
            <textarea class="form-control" rows="3" ng-model="bidData.description"></textarea>
            <button class="btn btn-primary btn-block " type="submit" ng-click="submitHandler()">竞标</button>
        <!--</div>-->
    </div>
</div>
<s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>