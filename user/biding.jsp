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

            <h2 >参与个人标书竞标</h2>
            <div class="form-group">
                <label class="control-label col-sm-2">价格:</label>
                <div class="col-sm-9">
                    <input type="text" ng-model="price"/>
                </div>
            </div><div class="form-group">
                <label class="control-label col-sm-2">说明:</label>
                <div class="col-sm-9">
                    <textarea class="" rows="3" ng-model="description"></textarea>
                </div>
            </div>
            <button class="btn btn-primary btn-block " type="submit" ng-click="submitHandler()">竞标</button>
        <!--</div>-->
    </div>
</div>
<s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>