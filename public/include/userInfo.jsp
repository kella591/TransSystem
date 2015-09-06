<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@taglib prefix="s" uri="/struts-tags"%>
<s:if test="#session.user!=null">
				<div >
		            <table class="table table-hover">
	           		<thead ng-bind="'BasicInfo' | translate"></thead>
	           		<tr><td class="col-md-3 text-right" ng-bind="'Phone' | translate"></td><td><s:property value="#session.user.telephone" /></td></tr>
	           		<tr><td class="col-md-3 text-right" ng-bind="'Mail' | translate"></td><td><s:property value="#session.user.email" /></td></tr>
	           		<tr><td class="col-md-3 text-right" ng-bind="'Role' | translate"></td><td><s:property value="#session.user.role.name" /></td></tr>
	           		<tr><td class="col-md-3 text-right" ng-bind="'LogDate' | translate"></td><td><s:property value="#session.user.loginTime" /></td></tr>
					</table>
	</div>
	<script>
var name = $.cookie("language");
if(name==='undefined'){
	name = "cn";
}
</script>
 </s:if>