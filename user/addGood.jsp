<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
<s:include value="../public/include/header.jsp"></s:include>
<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./js/goodController.js"></s:url>'></script>
</head>
<body>
	<s:include value="../public/include/navbar.jsp"></s:include>
	<div>
	<div class="container-fluid" ng-controller="addGoodCtrl">
	<form role='form'>
					<div class="form-group">
			            <label class="control-label col-sm-2">选择大类:</label>
			            <div class="col-sm-9">
			           	<div class="row">
							 <div class="col-sm-2">
							    <div class="thumbnail">
							      <img src="..." alt="...">
							      <div class="caption">
							        <h3>Thumbnail label</h3>
							        <p>...</p>
							        <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
							      </div>
							    </div>
							  </div>
							</div>
				      	</div>
				   </div>
		<div class="form-group" >
		<div class="col-sm-offset-2 col-sm-10">
			<button type="submit" class="btn btn-default">添加商品</button>
		</div>
		</div>
		<!--  <div class="col-sm-10" >
			            <div  class="col-sm-3" ng-repeat="goodC in goodData.goodsClassList1">
							    <div class="thumbnail">
							      <img ng-src={{goodC.imageURL}} alt="...">
							      <div class="caption">
							        <label>{{goodC.cnName}}</label>
							        <p>{{goodC.cnDescription}}</p>
							        <p><button class="btn btn-primary" role="button">选择</button> <button class="btn btn-default" role="button">取消</button></p>
							      </div>
							</div>
						</div>	
						</div>	 -->
	</form>
	<input type="input"  value='<s:property value="#parameters.docID" />'>
	</div>
	</div>
	<s:include value="../public/include/footer.jsp"></s:include>
</body>
</html>