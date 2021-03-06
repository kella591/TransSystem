<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
<s:include value="../public/include/header.jsp"></s:include>
	<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./js/timeLineController.js"></s:url>'></script>
<link href='<s:url value="./css/timeLine.css"></s:url>' rel="stylesheet" type="text/css"/>
</head>
<body>
	<s:include value="../public/include/navbar.jsp"></s:include>
	
	<div class="container-fluid" ng-controller="timeLineController">
	<input type="hidden" id="docid" value="<s:property value='#parameters.docid'/>">
		<div class="row">
		<div class='col-sm-3 col-sm-offset-1'>
		<div class="timeLine">
			<div class="tlEnd"><div class="tlLine"></div></div>
			<div class="tlCurrent" ng-click="showStep(-1)"><div class="tlCurrentImg"></div><div><font ng-bind="data.currentStepName"></font></div><div class="tlLine"></div></div>
			<div class="tlPoint" ng-repeat="step in data.specificStepEasyInfor" ng-click="showStep(step.specificStepIndex)"><div class="tlPointImg"></div><div><font ng-bind="step.specificStepName"></font></div><div class="tlLine"></div></div>
			<div class="tlStart"><div class="tlStartImg"></div></div>
		</div>
		</div>
		<div class="col-sm-7"  ng-show="showCurrent" class="{{show.showCurrent}}">
			<h3 ng-bind="data.currentStepName"></h3>
			<form class="form-horizontal" role="form" id="currentForm">
			</form>
			<button class="btn col-sm-offset-3" ng-click="subForm()" ng-if="showReady" ng-bind="'submit'|translate"></button>
		</div>
		<div class="col-sm-7" ng-show="!showCurrent" class="{{show.showCurrentFalse}}">
			<h3 ng-bind="step.specificTimeLinePhase.stepName"></h3>
			<table>
				<tr><td ng-bind="'UpdateTime'|translate"></td><td ng-bind="step.specificTimeLine.updateTime"></td></tr>
				<tr ng-repeat="field in step.fields"><td ng-bind="field.name"></td><td ng-bind="field.value"></td></tr>
			</table>
		</div>
		<div class="col-sm-7">
			<div class="form-group">
					<label class="control-label col-sm-2" ng-bind="'extraFee'|translate"></label>
					<div class="col-sm-3">
						<input type="text" ng-model="extraFeeCount"/>
					</div> 
					<div class="col-sm-3">
						<input type="text" ng-model="extraFeeText"/>
					</div>
					<div class="col-sm-3">
						<button role="button" ng-click="subFee()" ng-bind="'submit'|translate"></button>
					</div>    
				</div>
		</div>
		</div>
	</div>
	<s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>