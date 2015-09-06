<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
<s:include value="../public/include/header.jsp"></s:include>
<script type="text/javascript"
		src='<s:url value="../public/javascript/service.js"></s:url>'></script>
	<script type="text/javascript"
		src='<s:url value="../public/javascript/directive.js"></s:url>'></script>
	<script type="text/javascript"
		src='<s:url value="./js/routeController.js"></s:url>'></script>
	<style>
		.icon-close{
			width: 15px;!important;
			height: 15px;!important;
			background-color: gainsboro;
		}
		.icon-close:hover{
			background-color: gray;
			color: white;
			cursor: pointer;
		}
		.span-item{
			float: left;
			margin: 5px 5px;
			background-color: gainsboro;
		}
	</style>
</head>
<body>
	<s:include value="../public/include/navbar.jsp"></s:include>

	<div>
		<div class="container" ng-controller="routeCtrl">
			<!--<input type="hidden" id="loadClass" value="<s:property value='#parameters.loadClass'/>">-->
			<!--<input type="hidden" id="routeType" value="<s:property value='#parameters.routeType'/>">-->
			<div class="board-single board-standard">
				<h3>添加路线</h3>
				<div class="form-horizontal">
				<div class="form-group">
					<label class="control-label col-sm-2">选择路线类型:</label>
					<div class="col-sm-3">
						<select required class="form-control" ng-model="routeType"
								ng-options="routeType.value as routeType.name for routeType in dataList.routeTypeList"
								ng-change="init()">
							<option value="">-请选择-</option>
						</select>
					</div>
					<label class="control-label col-sm-2">选择装货方式:</label>
					<div class="col-sm-3">
						<select required class="form-control" ng-model="loadClass"
								ng-options="loadClass.value as loadClass.name for loadClass in dataList.loadClassList"
								ng-change="init()">
							<option value="">-请选择-</option>
						</select>
					</div>
				</div>
				</div>

				<h4 >
					<span ng-bind="routeType"></span><span>:</span> <span ng-bind="loadClass"></span>
				</h4>

				<form ng-show="(routeType!='') && (loadClass!='')" class="form-horizontal" role="form" novalidate="novalidate">

					<!--<div ng-show="routeType == 'GROUP'" class="form-group">-->
						<!--<label class="control-label col-sm-2"></label>-->
						<!--<div class="col-sm-9">-->
							<!--<label class="txt-item" ng-repeat="x in routeData.stowageDayList"-->
								   <!--ng-bind="x"></label>-->
						<!--</div>-->
					<!--</div>-->
					<div class="form-group">
						<label class="control-label col-sm-2">出发港口:</label>
						<div class="col-sm-3">
							<select required class="form-control" ng-model="tempData.port.departure.zero"
								ng-options="port.id as port.cnName for port in dataList.portZeroLevel"
								ng-change="selectPort(0,0)">
								<option value="">-请选择-</option>
							</select>
						</div>
						<div class="col-sm-3">
							<select required class="form-control"
								ng-model="tempData.port.departure.first"
								ng-options="port.id as port.cnName for port in dataList.departurePortFirstLevel"
								ng-change="selectPort(0,1)">
								<option value="">-请选择-</option>
							</select>
						</div>
						<div class="col-sm-3">
							<select required class="form-control" ng-model="routeData.departurePortID"
								ng-options="port.id as port.cnName for port in dataList.departurePortSecondLevel">
								<option value="">-请选择-</option>
							</select>
						</div>
					</div>

					<div class="form-group">
						<label class="control-label col-sm-2">到达港口:</label>
						<div class="col-sm-3">
							<select required class="form-control" ng-model="tempData.port.arrival.zero"
								ng-options="port.id as port.cnName for port in dataList.portZeroLevel"
								ng-change="selectPort(1,0)">
								<option value="">-请选择-</option>
							</select>
						</div>
						<div class="col-sm-3">
							<select required class="form-control" ng-model="tempData.port.arrival.first"
								ng-options="port.id as port.cnName for port in dataList.arrivalPortFirstLevel"
								ng-change="selectPort(1,1)">
								<option value="">-请选择-</option>
							</select>
						</div>
						<div class="col-sm-3">
							<select required class="form-control" ng-model="routeData.arrivalPortID"
								ng-options="port.id as port.cnName for port in dataList.arrivalPortSecondLevel">
								<option value="">-请选择-</option>
							</select>
						</div>
					</div>

					<div class="form-group">
						<label class="control-label col-sm-2">是否中转:</label>
						<div class="col-sm-9">
							<label class="radio-inline"><input type="radio"
								name="isD" checked value="1" ng-model="routeData.isDirect">直达</label>
							<label class="radio-inline"><input type="radio"
								name="isD" value="0" ng-model="routeData.isDirect">中转</label>
						</div>
					</div>

					<div class="form-group" ng-show="routeData.isDirect == 0">
						<label class="control-label col-sm-2">中转港口:</label>
						<div class="col-sm-3">
							<select required class="form-control" ng-model="tempData.port.transit.zero"
								ng-options="port.id as port.cnName for port in dataList.portZeroLevel"
								ng-change="selectPort(2,0)">
								<option value="">-请选择-</option>
							</select>
						</div>
						<div class="col-sm-3">
							<select required class="form-control" ng-model="tempData.port.transit.first"
								ng-options="port.id as port.cnName for port in dataList.transitPortFirstLevel"
								ng-change="selectPort(2,1)">
								<option value="">-请选择-</option>
							</select>
						</div>
						<div class="col-sm-3">
							<select required class="form-control" ng-model="routeData.transitPortID"
								ng-options="port.id as port.cnName for port in dataList.transitPortSecondLevel">
								<option value="">-请选择-</option>
							</select>
						</div>
					</div>

					<div class="form-group">
						<label class="control-label col-sm-2">全程时间:</label>
						<div class="col-sm-9">
							<input type="number" ng-model="routeData.transportTime">&nbsp;天</input>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-2">船公司名称</label>
						<div class="col-sm-9">
							<input type="text" ng-model="routeData.company" />
						</div>
					</div>

					<div ng-show="loadClass == 'BULKLOAD'" class="form-group">
						<label class="control-label col-sm-2">积载日:</label>
						<div class="col-sm-3">
							<input required type="date" ng-model="tempData.stowageDay"
								format-date>
						</div>
						<div class="col-sm-4">
							<button type="submit" class="btn btn-default"
								ng-click="addStowageDay()">添加</button>
						</div>
					</div>

					<div ng-show="loadClass == 'BULKLOAD'" class="form-group">
						<label class="control-label col-sm-2"></label>
						<div class="col-sm-9 pull-left" ng-repeat="x in routeData.stowageDayList">
							<label class="txt-item" ng-bind="x"></label>
							<span class="item-close" ng-click = "removeStowageDay($index)">x</span>
						</div>
					</div>

					<div ng-show="loadClass == 'CONTAINER'" class="form-group">
						<label class="control-label col-sm-2">每周班次</label>
						<div class="col-sm-9">
							<label class="checkbox-inline" ng-repeat="x in week"> <input
								type="checkbox" name="weekday" value="" ng-model="x.shift"><span
								ng-bind="x.day"></span>
							</label>
						</div>

					</div>




					<div class="form-group">
						<label class="control-label col-sm-2">开始日期:</label>
						<div class="col-sm-9">
							<input required type="date" ng-model="routeData.startDate" format-date/>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-2">结束日期:</label>
						<div class="col-sm-9">
							<input type="date" ng-model="routeData.endDate" format-date/>
						</div>
					</div>

					<div ng-show="routeType == 'GROUP'" class="form-group">
						<label class="control-label col-sm-2">成团人数:</label>
						<div class="col-sm-3">
							<input required type="number" ng-model="tempData.minNumber">
						</div>
						<label class="control-label col-sm-2">对应折扣:</label>
						<div class="col-sm-3">
							<input required type="number" ng-model="tempData.discount">
						</div>
						<div class="col-sm-4">
						<button type="submit" class="btn btn-default"
								ng-click="addGroupDiscount()">添加</button>
						</div>
					</div>

					<div ng-show="routeType == 'GROUP'" class="form-group">
						<div class="col-sm-9 pull-left" ng-repeat="x in routeData.groupDiscountList">
							<label class="control-label col-sm-2"></label>
							<span class="txt-item" ng-bind="x.minNumber + ':'"></span>
							<span class="txt-item" ng-bind="x.discount + '%'"></span>
							<span class="item-close" ng-click = "removeGroupDiscount($index)">x</span>
						</div>
					</div>

					<div class="form-group">
						<div class="col-sm-offset-1 col-sm-11">
							<table class="table ">
								<tr>
									<th>项目</th>
									<th><span ng-show="routeType == 'STANDARD'">基本价格</span><span ng-show="routeType != 'STANDARD'">原价</span></th>
									<th ng-show="routeType == 'SPECIAL'">优惠价格</th>
								</tr>
								<tr ng-repeat="x in itemData">
									<td ng-bind="x.name"></td>
									<td><input type="text" ng-model="x.basicPrice" /></td>
									<td ng-show="routeType == 'SPECIAL'"><input type="text" ng-model="x.salePrice" /></td>
								</tr>
							</table>
						</div>
					</div>

					<div class="form-group">
						<label class="control-label col-sm-2">是否有保险:</label>
						<div class="col-sm-9">
							<label class="radio-inline"><input type="radio"
								name="isI" checked value="0" ng-model="routeData.isInsurance">没有</label>
							<label class="radio-inline"><input type="radio"
								name="isI" value="1" ng-model="routeData.isInsurance">有</label>
						</div>
					</div>

					<div class="form-group">
						<label class="control-label col-sm-2">其他说明:</label>
						<div class="col-sm-9">
							<textarea class="" rows="3" ng-model="routeData.description"></textarea>
						</div>
					</div>

					<div class="form-group ">
						<div class="col-sm-offset-1">
							<button type="submit" class="btn btn-default"
								ng-click="submitHandler()">发布路线</button>
						</div>
					</div>
				</form>

			</div>
		</div>
	</div>


	<s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>