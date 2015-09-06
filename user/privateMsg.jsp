<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
<s:include value="../public/include/header.jsp"></s:include>
<script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="../public/javascript/directive.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./js/msgController.js"></s:url>'></script>
	<link rel="stylesheet" type="text/css" href='<s:url value="./css/msg.css"></s:url>'>
</head>
<body>
	<s:include value="../public/include/navbar.jsp"></s:include>

	<div>

	<div class="container"  ng-controller="privateMsgCtrl">
	<div class="board-single board-standard">
		<div>
		<select type="number" id="inputRole" ng-model="msgData.state" ng-options="msgState.value as msgState.name for msgState in msgData.stateList" ng-change="selectMsg()">
			<option value="">全部</option>
		</select>
		</div>
		<div class="panel" ng-repeat="msg in msgData.privateMsgs">
			<ol>
				<li><h4  ng-bind="msg.sendTime"></h4></li>
				<li>[<strong ng-bind="msg.type  | TypeToName:'私信类别'"></strong>]<span ng-bind="msg.title"></span></li>
				<li ng-bind="msg.content"></li>
				<li ng-bind="msg.state | TypeToName:'私信状态'"></li>
				<li>
					<a ng-click="changeMsg(msg.id, 'DELETE')">删除</a>|
					<a ng-click="changeMsg(msg.id, 'READ')">标记为已读</a>|
					<a ng-click="changeMsg(msg.id, 'UNREAD')">标记为未读</a>|
					<a ng-click="changeMsg(msg.id, 'LOCK')">锁定</a>
				</li>
			</ol>
			<!--<a  class="theme-login" href="javascript:;">查看详情>></a>-->
			<!--<div class="theme-popover">-->
				<!--<div class="theme-poptit">-->
					<!--<a href="javascript:;" title="关闭" class="close">×</a>-->
					<!--<h3>[{{msg.type}}]{{msg.title}}</h3>-->
				<!--</div>-->
				<!--<div class="theme-popbod dform">-->
					<!--<form class="theme-signin" name="loginform" action="" method="post">-->
						<!--<ol>-->
							<!--<li><h4>{{msg.sendTime}}</h4></li>-->
							<!--<li>{{msg.content}}</li>-->
							<!--<li>{{msg.state | TypeToName:'私信'}}</li>-->
						<!--</ol>-->
					<!--</form>-->
				<!--</div>-->
			<!--</div>-->

		</div>

		<nav>
			<ul class="pager">
				<li><a ng-click="changePage(-1)">上一页</a></li>
				<li><a ng-click="changePage(1)">下一页</a></li>
			</ul>
		</nav>


		<!--<div class="theme-buy">-->
			<!--<a class="btn btn-primary btn-large theme-login" href="javascript:;">点击查看效果</a>-->
		<!--</div>-->
		<!--<div class="theme-popover">-->
			<!--<div class="theme-poptit">-->
				<!--<a href="javascript:;" title="关闭" class="close">×</a>-->
				<!--<h3>登录 是一种态度</h3>-->
			<!--</div>-->
			<!--<div class="theme-popbod dform">-->
				<!--<form class="theme-signin" name="loginform" action="" method="post">-->
					<!--<ol>-->
						<!--<li><h4>你必须先登录！</h4></li>-->
						<!--<li><strong>用户名：</strong><input class="ipt" type="text" name="log" value="lanrenzhijia" size="20" /></li>-->
						<!--<li><strong>密码：</strong><input class="ipt" type="password" name="pwd" value="***" size="20" /></li>-->
						<!--<li><input class="btn btn-primary" type="submit" name="submit" value=" 登 录 " /></li>-->
					<!--</ol>-->
				<!--</form>-->
			<!--</div>-->
		<!--</div>-->
		<!--<div class="theme-popover-mask"></div>-->

	</div>
	</div>
	</div>
	<s:include value="../public/include/footer.jsp"></s:include>
	<script>
		jQuery(document).ready(function($) {
			$('.theme-login').click(function(){//不能用click，冒泡机制，只运行一次；bind delegete
				$('.theme-popover-mask').fadeIn(100);
				$('.theme-popover').slideDown(200);
			})
			$('.theme-poptit .close').click(function(){
				$('.theme-popover-mask').fadeOut(100);
				$('.theme-popover').slideUp(200);
			})

		})


	</script>
</body>
</html>