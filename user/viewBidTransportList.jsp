<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
<s:include value="../public/include/header.jsp"></s:include>
<script type="text/javascript" src='<s:url value="../public/library/javascript/bootstrap.min.js"></s:url>'></script>
<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./js/bidTransportListController.js"></s:url>'></script>
</head>
<body>
	<s:include value="../public/include/navbar.jsp"></s:include>
	
	<div class="container-fluid" ng-controller="bidTransportListController">
	<input type="hidden" id="docid" value="<s:property value='#parameters.docid'/>">
	<input type="hidden" id="type" value="<s:property value='#parameters.type'/>">
		<div class="row">
		<table class="table">
		<thead><tr><td>资质ID</td><td>地址</td><td>公司编号</td><td>名称</td><td>联系人</td><td>总价</td><td>联系方式</td><td>状态</td><td>阅读状态</td></tr></thead>
		<tbody>
		<tr ng-repeat="transport in transportList">
			<td ng-bind="transport.aptitudeCode"></td>
			<td ng-bind="transport.companyAddress"></td>
			<td ng-bind="transport.companyCode"></td>
			<td ng-bind="transport.companyName"></td>
			<td ng-bind="transport.contactName"></td>
			<td ng-bind="transport.totalPrice"></td>
			<td><button ng-if="!!!phoneList[transport.id]" ng-click="getPhone(transport.id)">点击查看</button><label ng-if="!!phoneList[transport.id]" ng-bind="phoneList[transport.id]"></label></td>
			<!--  td><button ng-click="evaluate(transport.id)">点击评价</button></td -->
			<td>
				<select ng-model="transport.state.value" ng-options="state.value as state.name for state in stateList" ng-change="changeState(transport.offerId,transport.state)">
				<option>-请选择-</option>
				</select>
			</td>
			<td ng-bind="transport.readState.name"></td>
			<td><a href="./bidingDetail.jsp?docid={{docid}}&transid={{transport.id}}"><button class="btn">查看详情</button></a>
				<button ng-click="evaluateUser(transport.id)" class="btn" data-toggle="modal" data-target="#myModal">点击评价</button>
			</td>
		</tr>
		</tbody>
		</table>
		<div class='col-sm-6 col-sm-offset-4'>
		<ul class="pagination">
		  <li><a ng-click=selectPage(-1)>&laquo;</a></li>
		  <li ng-repeat="a in range(pageSize) track by $index" ng-class="{true: 'active', false: ''}[$index+1==page]"><a ng-bind="$index+1" ng-click="selectPage($index+1)"></a></li>
		  <li><a ng-click=selectPage(0)>&raquo;</a></li>
		</ul>
		</div>

<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="myModalLabel">
              请评价：
            </h4>
         </div>
         <div class="modal-body">
            <form>
            <input type="text" ng-model="evaluate.rate" placeholder="评分"/><br/>
            <input type="text" ng-model="evaluate.price" placeholder="报价"/><br/>
            <input type="text" ng-model="evaluate.fromDate" placeholder="出发时间"/><br/>
            <input type="text" ng-model="evaluate.arrivalDate" placeholder="到达时间"/>
            </form>
         </div>
         <div class="modal-footer">
            <button id="myModalClose" type="button" class="btn btn-default" 
               data-dismiss="modal">关闭
            </button>
            <button type="button" class="btn btn-primary" ng-click="subEva(1)">
               提交更改
            </button>
         </div>
      </div><!-- /.modal-content -->
</div><!-- /.modal -->
		</div>
	</div>
	</div>
	<s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>