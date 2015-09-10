<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
<s:include value="../public/include/header.jsp"></s:include>
<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="../public/javascript/directive.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./js/bidDocController.js"></s:url>'></script>
</head>
<body>
	<s:include value="../public/include/navbar.jsp"></s:include>
	<input type="hidden" id="docid" value="<s:property value='#parameters.docid'/>">
	<div>
	<div class="container"  ng-controller="addBidBookCtrl">
		<div class="row">
			<div class="col-sm-7 col-sm-offset-3">
			  <form class="form-horizontal" role="form">
			  	<div class="form-group">
		            <label class="control-label col-sm-2">出发港口:</label>
			           <div ng-if="!!tempData.biddoc.departPort" class="col-sm-3">
			           		<font ng-bind="docData.departPort[name]"></font>
			           </div>
		            <div ng-show="!!!tempData.biddoc.departPort" class="{{tempData.showSelect.departPort}}">
		            	<div class="col-sm-3">
				            <select required class="form-control" ng-model="tempData.port.departure.zero" ng-options="port.id as port.cnName for port in dataList.portZeroLevel" ng-change="selectPort(0,0)">
				            <option value="">-请选择-</option>
					        </select>
				      	</div>
				      	<div class="col-sm-3">			      		
				            <select required class="form-control" ng-model="tempData.port.departure.first" ng-options="port.id as port.cnName for port in dataList.departurePortFirstLevel" ng-change="selectPort(0,1)">
				             <option value="">-请选择-</option>
					      	</select>
				      	</div>
				      	<div class="col-sm-3">
				            <select required class="form-control" ng-model="docData.departurePortID" ng-options="port.id as port.cnName for port in dataList.departurePortSecondLevel">
				             <option value="">-请选择-</option>
					      	</select>
				      	</div>
		            </div>
		        </div>
			  	<div class="form-group">
		            <label class="control-label col-sm-2">到达港口:</label>
		            <div ng-if="!!tempData.biddoc.arrivalPort" class="col-sm-3">
		            	<font ng-bind="docData.arrivalPort[name]"></font>
		            </div>
		            <div ng-show="!!!tempData.biddoc.arrivalPort" class="{{tempData.showSelect.arrivalPort}}">
		            <div class="col-sm-3">
			            <select required class="form-control" ng-model="tempData.port.arrival.zero" ng-options="port.id as port.cnName for port in dataList.portZeroLevel" ng-change="selectPort(1,0)">
			            <option value="">-请选择-</option>
				        </select>
			      	</div>
			      	<div class="col-sm-3">			      		
			            <select required class="form-control" ng-model="tempData.port.arrival.first" ng-options="port.id as port.cnName for port in dataList.arrivalPortFirstLevel" ng-change="selectPort(1,1)">
			             <option value="">-请选择-</option>
				      	</select>
			      	</div>
			      	<div class="col-sm-3">
			            <select required class="form-control" ng-model="docData.arrivalPortID" ng-options="port.id as port.cnName for port in dataList.arrivalPortSecondLevel">
			             <option value="">-请选择-</option>
				      	</select>
			      	</div>
			      	</div>
		          </div>
				
			  <div class="form-group">
			            <label class="control-label col-sm-2">出发日期:</label>
			            
			            <div class="col-sm-9">
			           		<font ng-if="!!tempData.biddoc.departureDate" ng-bind="tempData.biddoc.departureDate"></font>
			          	 	<input ng-if="!!!tempData.biddoc.departureDate" required type="date" ng-model="docData.departureDate" format-date ng-change="selectDate()"></input>
				      	</div>
			   </div>
			    <div class="form-group">
		            <label class="control-label col-sm-2">到达日期:</label>
		            <div class="col-sm-9">
		            	<font  ng-if="!!tempData.biddoc.arrivalDate" ng-bind="docData.arrivalDate"></font>
		           		<input ng-if="!!!tempData.biddoc.arrivalDate" type="date" ng-model="docData.arrivalDate" format-date ng-change="selectDate()"></input>
			      	</div>
			   </div>
			   
			   <div class="form-group">
		            <label class="control-label col-sm-2">船期:</label>
		            <div class="col-sm-9">
		            	<font ng-if="!!tempData.biddoc.transportTime" ng-bind="docData.transportTime">&nbsp;天</font>
		           		<input ng-if="!!!tempData.biddoc.departureDate" type="number" ng-model="docData.transportTime">&nbsp;天</input>
			      	</div>
			   </div>
			   
			   <div class="form-group">
		            <label class="control-label col-sm-2">有效期:</label>
		            <div class="col-sm-3">
		            	<font ng-if="!!tempData.biddoc.validateTime" ng-bind="docData.validateTime"></font>
		            	<select ng-if="!!!tempData.biddoc.validateTime" required class="form-control" ng-model="docData.validateTime" ng-options="time.value as time.label for time in dataList.validateTime">
			             <option value="">-请选择-</option>
				      	</select>
			      	</div>
			   </div>
			   
			   <div class="form-group">
		            <label class="control-label col-sm-2">到款日期:</label>
		            <div class="col-sm-9">
		            	<font ng-if="!!tempData.biddoc.paymentDate" ng-bind="docData.paymentDate"></font>
		            	<input ng-if="!!!tempData.biddoc.paymentDate" required type="date" ng-model="docData.paymentDate" format-date></input>
			      	</div>
			   </div>
			   <div class="form-group">
		            <label class="control-label col-sm-2">运输模式:</label>
		            <div class="col-sm-3">
		            	<font ng-if="!!tempData.biddoc.transportMode" ng-bind="docData.transportMode[name]"></font>
		            	<select ng-show="!!!tempData.biddoc.transportMode" required class="form-control {{tempData.showSelect.transportMode}}" ng-model="docData.transportModeID" ng-options="mode.id as mode[name] for mode in dataList.transMode">
				            <option value="">-请选择-</option>
						</select>
			      	</div>
			   </div>
			   <div class="form-group">
				  		<label class="control-label col-sm-2">货运方式:</label>
					  		<div class="col-sm-3">
				            	<font ng-if="!!tempData.biddoc.transportType" ng-bind="docData.transportType.name"></font>
				            	<select ng-show="!!!tempData.biddoc.transportType" required class="form-control {{tempData.showSelect.transporType}}" ng-model="docData.transportType" ng-options="trans as trans.name for trans in dataList.transType">
					             <option value="">-请选择-</option>
					            </select>
				      	</div>
				    </div>
				    <div class="form-group">
				  		<label class="control-label col-sm-2">装柜方式:</label>
					  	<div class="col-sm-3">
				            	<font ng-if="!!tempData.biddoc.boxedType" ng-bind="docData.boxedType"></font>
				            	 <select ng-show="!!!tempData.biddoc.boxedType" required class="form-control {{tempData.showSelect.boxedType}}" ng-model="docData.boxedType" ng-options="trans.class as trans.name for trans in dataList.boxType[docData.transportType.value]" ng-change="selectType()">
						            <option value="">-请选择-</option>
								</select>
				      	</div>    
					</div>
					<div ng-show="{{booleanData.containerShow}}">
					 <div class="form-group">
				  		<label class="control-label col-sm-2">集装箱类别:</label>
				  		<div class="col-sm-3">
				  			<font ng-if="!!tempData.biddoc.container" ng-bind="docData.container[name]"></font>
					  		<select ng-show="!!!tempData.biddoc.container" required class="form-control {{tempData.showSelect.containerType}}" ng-model="docData.containerID" ng-options="container.cnName for container in dataList.containerType" ng-change="selectContainer()">
				         	   <option value="">-请选择-</option>
					        </select>
					     </div>
				      </div>    
					
					 <div class="form-group">
				  		<label class="control-label col-sm-2">集装箱数量:</label>
					  	<div class="col-sm-3">
					  	<font ng-if="!!tempData.biddoc.containerCount" ng-bind="docData.containerCount"></font>
					  	<input ng-if="!!!tempData.biddoc.containerCount" type="number" ng-model="docData.containerCount"/>
				      	</div>    
					</div>
					</div>
					<div class="form-group">
				  		<label class="control-label col-sm-2">交货方式:</label>
					  	<div class="col-sm-3">
					  	<select required class="form-control" ng-model="docData.qhfs" ng-options="qhfs.value as qhfs.name for qhfs in dataList.qhfsType">
				            <option value="">-请选择-</option>
					     </select>
				      	</div>    
					</div>
					<div class="form-group">
				  		<label class="control-label col-sm-2">交货时间:</label>
					  	<div class="col-sm-3">
					  	<input type="date" ng-model="docData.hwbhsj" format-date/>
				      	</div>    
					</div>
					<div class="form-group" ng-if="docData.qhfs==='SHANGMEN'">
				  		<label class="control-label col-sm-2">交货地点:</label>
					  	<div class="col-sm-3">
					  	<input type="text" ng-model="docData.ckdz"/>
				      	</div>    
					</div>
			</form>			
			</div>
		</div>
		<div class="row-fluid" ng-if="booleanData.goodFormShow">
			<div class="col-sm-7 col-sm-offset-3">
			  	<form class="form-horizontal" role="form">
			  		<div class="form-group">
				  		<label class="control-label col-sm-2">商品类别:</label>
					  		<div class="col-sm-5">
				            <select required class="form-control" ng-model="goodData.goodsClass1ID" ng-options="goodC.id as goodC.cnName for goodC in dataList.goodsClassList1" ng-change="selectGoodsClass(1)">
				            <option value="">-请选择-</option>
					        </select>
				      	</div>
				      	<div class="col-sm-3">			      		
				            <select  required class="form-control {{tempData.showSelect.goodsClass2}}" ng-model="goodData.goodsClass2ID" ng-options="goodC.cnName for goodC in dataList.goodsClassList2" ng-change="selectGoodsClass(3)">
				             <option value="">-请选择-</option>
					      	</select>
				      	</div>	        
					</div>
					<div class="form-group">
				  		<label class="control-label col-sm-2">名称:</label>
					  	<div class="col-sm-9">
				            <input required type='text' ng-model="goodData.name"/>
				      	</div>	        
					</div>
					<div class="form-group">
				  		<label class="control-label col-sm-2">真实名称:</label>
					  	<div class="col-sm-9">
				            <input required type='text' ng-model="goodData.trueName"/>
				      	</div>	        
					</div>
					<div class="form-group">
				  		<label class="control-label col-sm-2">真实类别:</label>
					  		<div class="col-sm-5">
				            <select required class="form-control" ng-model="goodData.trueGoodsClassID1" ng-options="goodC.id as goodC.cnName for goodC in dataList.goodsClassList1" ng-change="selectGoodsClass(2)">
				            <option value="">-请选择-</option>
					        </select>
				      	</div>
				      	<div class="col-sm-3">			      		
				            <select  required class="form-control {{tempData.showSelect.trueGoodsClass2}}" ng-model="goodData.trueGoodsClassID2" ng-options="goodC.cnName for goodC in dataList.trueGoodsClassList2">
				             <option value="">-请选择-</option>
					      	</select>
				      	</div>	        
					</div>
					<div class="form-group">
				  		<label class="control-label col-sm-2">打包方式:</label>
					  	<div class="col-sm-3">
				            <select required class="form-control" ng-model="goodData.packingStyleID" ng-options="pack.id as pack[name] for pack in dataList.packingStyle">
				            <option value="">-请选择-</option>
					        </select>
				      	</div>
				      	<div class="col-sm-3" ng-if="goodData.packingStyleID===-1"><input type="text" required ng-model="goodData.packingStyleOther"></div>    
					</div>
					<div class="form-group">
				  		<label class="control-label col-sm-2">描述:</label>
					  	<div class="col-sm-9">
				            <input required type='textarea' ng-model="goodData.description"/>
				      	</div>	        
					</div>
					<div class="form-group">
				  		<label class="control-label col-sm-2">数量:</label>
					  	<div class="col-sm-9">
				            <input required type='number' ng-model="goodData.count"/>
				      	</div>	        
					</div>
					<div class="form-group">
				  		<label class="control-label col-sm-2">毛重:</label>
					  	<div class="col-sm-9">
				            <input type='input' ng-model="goodData.grossWeight"/>吨
				      	</div>	        
					</div>
					<div class="form-group">
				  		<label class="control-label col-sm-2">体积:</label>
					  	<div class="col-sm-9">
				            <input type='input' ng-model="goodData.volume"/>立方米
				      	</div>	        
					</div>
					<div class="form-group">
				  		<label class="control-label col-sm-2">长宽高:</label>
					  	<div class="col-sm-3">
				            <input type='input' ng-model="goodData.length"/>米
				      	</div>
				      	<div class="col-sm-3">
				            <input type='input' ng-model="goodData.width"/>米
				      	</div>
				      	<div class="col-sm-3">
				            <input type='input' ng-model="goodData.height"/>米
				      	</div>	        
					</div>
					<div ng-if="goodData.goodsClass2ID.dangerous===1">
					<div class="col-sm-11 col-sm-offset-2">您的商品可能是危险品，请根据www.chemicalbook.com填写一下内容</div>	
					<div class="form-group" >
				  		<label class="control-label col-sm-2">危险品:</label>
					  	<div class="col-sm-9">
				            <input type='checkbox' ng-model="goodData.isDangerous"/>危险
				      	</div>       
					</div>
					<div class="form-group" ng-if="goodData.isDangerous">
				  		<label class="control-label col-sm-2">危险品类别:</label>
					  	<div class="col-sm-3">
				            <select required class="form-control" ng-model="goodData.dangerousClassID" ng-options="dclass.id as dclass.name for dclass in dataList.dangerousClass">
				            <option value="">-请选择-</option>
					        </select>
				      	</div> 
				      	<div class="col-sm-3">
				            <select required class="form-control" ng-model="goodData.dangerousPACKINGGROUP" ng-options="dclass.id as dclass.name for dclass in dataList.packGroup">
				            <option value="">-请选择-</option>
					        </select>
				      	</div>    
				      	<div class="col-sm-3">
				           <input type="input" ng-model="goodData.dangerousUNNO" placeholder="UNNO" required>
				      	</div>       
					</div>
					</div>
					<div class="form-group" >
					  	<div class="col-sm-9 col-sm-offset-2">
				            <button type="submit" class="btn btn-default" ng-click="addGoodSub()">添加</button>
				      	</div>       
					</div>
			    </form>
			    
		    </div>
		</div>
		<table class="table well" ng-if="goodList.length>0">
		<thead><tr><td>类别</td><td>名称</td><td>描述</td><td>数量</td><td>毛重</td><td>体积</td><td>长</td><td>宽</td><td>高</td><td>危险品</td></tr></thead>
		<tbody>
		<tr ng-repeat="good in goodList"><td ng-bind="good.goodsClass2ID.cnName"></td><td ng-bind="good.name"></td><td  ng-bind="good.description"></td><td  ng-bind="good.count"></td><td  ng-bind="good.grossWeight"></td><td  ng-bind="good.volume"></td><td  ng-bind="good.length"></td><td  ng-bind="good.width"></td><td  ng-bind="good.height"></td><td  ng-bind="good.isDangerous?'是':'否'"></td></tr>
		</tbody>
		</table>
		<form class=" col-sm-7 col-sm-offset-3">
			<div class="form-group">
			      <div class="col-sm-offset-2 col-sm-10">
			         <button type="button" class="btn btn-default" ng-click="addGood()">添加商品</button>
			      </div>
			</div>
			<div class="form-group" >
				<div class="col-sm-offset-2 col-sm-3">
					<button type="submit" class="btn btn-default" ng-click="keepBidBook()">保存标书</button>
				</div> 
				<div class="col-sm-3 col-sm-offset-1">
					<button type="submit" class="btn btn-default" ng-click="submitBidDoc()">发布标书</button>
				</div>
				<div class="col-sm-8 col-sm-offset-2" ng-if="booleanData.recommendShow">
					<button class="btn" ng-click="mailTrans()">通知承运商接标</button>
					<a href="./viewBidTransportList.jsp?docid={{docData.id}}&type=2">查看推荐承运商</a>
				</div>
			</div>
		</form>
	</div>
	</div>
	<s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>