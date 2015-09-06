<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
    <s:include value="../public/include/header.jsp"></s:include>
    <script type="text/javascript" src="http://cdn.bootcss.com/angular-file-upload/1.1.5/angular-file-upload.min.js"></script>
<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="./js/authoController.js"></s:url>'></script>
    <link rel="stylesheet" type="text/css" href='<s:url value="./css/autho.css"></s:url>'>
</head>
<body>
<s:include value="../public/include/navbar.jsp"></s:include>

<div>
    <div class="container" ng-controller="authoCtrl">
        <div id="form1" class="board-single board-standard">
            <h2>用户认证</h2>
            <h3 class="heading-small">您还需完成以下几步通过认证</h3>
            <div class="row line">
                <label class="autho-label col-md-4">手机号</label>
                <div class="autho-context col-md-4"><i class="icon-check"></i>136****8375 </div>
                <div class="autho-state col-md-4" >已认证</div>
            </div>

            <div ng-repeat="apt in authoData.aptitudeList" class="row file" >
                <label class="autho-label col-md-4" ng-bind="apt.aptitudeName"></label>

                <div class="col-md-4" >
                    <input ng-if="(apt.aptitudeName != 'Email ')&&(apt.aptitudeName != '邮箱')" ng-controller="UploadController" type="file" class="input" nv-file-select uploader="uploader" multiple /><br />
                    <div ng-if="(apt.aptitudeName == 'Email ')||(apt.aptitudeName == '邮箱')" ><s:property value="#session.user.email" /></div>
                    <img ng-if="apt.state.value != 'UNVALIDATE'" alt="" src="{{apt.imageUrl}}" class="autho-thumb">
                </div>
                <div class="col-md-4" ng-bind="apt.state.name "></div>
            </div>
            <button class="btn autho-offset"  type="submit" ng-click="submitHandler()">提交认证</button>
        </div>
    </div>
</div>
<s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>