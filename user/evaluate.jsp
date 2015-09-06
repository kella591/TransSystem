<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
    <s:include value="../public/include/header.jsp"></s:include>

</head>
<body>

<s:include value="../public/include/navbar.jsp"></s:include>

<div>
    <div class="container" ng-controller="evaluateCtrl">
        <input type="hidden" id="docid" value="<s:property value='#parameters.docid'/>">
        <div class="board-single board-standard">
            <h2 ng-bind="'Evaluate'| translate"></h2>

            <form class="form-horizontal" role="form" novalidate="novalidate">
                <div class="form-group">
                    <label class="control-label col-sm-2" ng-bind="'Score' | translate" ></label>
                        <div class="col-sm-2">
                        <select required class="form-control " ng-model="scoreData.score">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        </div>

                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" ng-bind="'ScoreDescription' | translate"></label>

                    <div class="col-sm-9">
                        <textarea cols="50" rows="5" ng-model="scoreData.description"></textarea>
                    </div>
                </div>

                <div class="form-group ">
                    <div class="col-sm-offset-1">
                        <button type="submit" class="btn btn-default" ng-click="submitHandler()">提交评价</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<s:include value="../public/include/footer.jsp"></s:include>
<script type="text/javascript" src='<s:url value="../public/library/javascript/angular.min.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/library/javascript/angular-route.min.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/javascript/directive.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="./js/evaluateController.js"></s:url>'></script>

</body>
</html>