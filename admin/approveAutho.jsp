<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
    <s:include value="../public/include/header.jsp"></s:include>
    <link rel="stylesheet" type="text/css" href='<s:url value="./css/autho.css"></s:url>'>
</head>
<body>

<s:include value="../public/include/navbar.jsp"></s:include>

<div>
    <div class="container" ng-controller="approveCtrl">
        <input type="hidden" id="userid" value="<s:property value= '#parameters.userid'/>">
        <div class="form-group" ng-repeat="x in authoInfoList">
            <h2><span ng-bind="'UserInfo' | translate"></span></h2>
            <!--"applyTime":"2015-06-27 18:35:41",-->
            <!--"aptitudeID":1,-->
            <!--"aptitudeType":"TRANSPORT",-->
            <!--"attachmentID":12,-->
            <!--"handleTime":"2015-06-26 00:39:14",-->
            <!--"state":"UNHANDLE",-->

            <ul class="list-unstyled" >
                <li><label class="auto-label" ng-bind="'ApplyTime:' | translate"></label><span ng-bind="x.applyTime"></span></li>
                <li> <label class="auto-label" ng-bind="'AptName:' | translate"></label><span ng-bind="x.aptitudeName"></span></li>
                <li> <label class="auto-label" ng-bind="'AptType:' | translate"></label><span ng-bind="x.aptitudeType.name "></span></li>

                <li><img alt="" src="{{x.attachUrl}}" class="autho-thumb"></li>
                <li><button type="submit" class="btn btn-default" ng-bind="'Pass' | translate" ng-click=submitHandler(x.id,'PASS')>通过</button>
                    <button type="submit" class="btn btn-default" ng-bind="'Reject' | translate" ng-click=submitHandler(x.id,'REJECT')>拒绝</button>
                </li>
            </ul>
        </div>

    </div>
</div>
<s:include value="../public/include/footer.jsp"></s:include>
<script type="text/javascript" src='<s:url value="../public/library/javascript/angular.min.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/library/javascript/angular-route.min.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/javascript/directive.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="./js/approveController.js"></s:url>'></script>

</body>
</html>