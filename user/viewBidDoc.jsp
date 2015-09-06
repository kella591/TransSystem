<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
 <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="haiyun" class="ng-app:haiyun" ng-cloak>
<head>
<s:include value="../public/include/header.jsp"></s:include>
 <script type="text/javascript" src='<s:url value="../public/javascript/service.js"></s:url>'></script>
	<script type="text/javascript" src='<s:url value="./js/viewController.js"></s:url>'></script>
</body>
</head>
<body>
	<s:include value="../public/include/navbar.jsp"></s:include>

	<div>
        <div class="container" ng-controller="viewBidDocCtrl">
            <input type="hidden" id="docid" value="<s:property value='#parameters.docid'/>">
			<!--
		id	int	自增，主键
		userid	int	用户id
		departurePortID	int	出发港口id（tbl_port)
		arrivalPortID	int	到达港口id（tbl_port)

		departureDate	varchar(50)	出发日期
		arrivalDate	varchar(50)	到达日期

		transportTime	int	船期（运输需要的时间，天数）
		validateTime	int	标书有效期（以小时为单位）

		paymentDate	varchar(50)	付款日期
		state	int	标书状态（草稿0；待投标1；洽谈中2；进行中3；已完成4；已撤销5；已流标6）

		transportModeID	int	运输模式id（tbl_transport_mode)
		transportType	tinynit	运输类别（海运1；空运2；公路3；铁路4））

		boxedType	tinynit	装箱类别（tbl_loading_class）

		containerID	int	集装箱ID
		containerCount	int	集装箱数量

		dangerousTip	varchar(2000)	危险品提示信息

		-->
        <div class="board-single board-standard">
            <h3><span ng-bind="'BidDocDetail'| translate">标书详情</span></h3>


            <table class="table table-striped">
                <tr>
                    <td><span ng-bind="'BidDocState'| translate">标书状态</span></td>
                    <td ng-bind="data.biddoc.state.name  "></td>
                    <td>
                        <select ng-model="stateAfter" ng-options="state as state.name for state in stateList" ng-change="selectState()">
                            <option value="" ng-bind="'ChangeState'| translate">-更改状态-</option>
                        </select>
                    </td>
                    <td ng-show="(data.biddoc.state.value =='GOING') || (data.biddoc.state.value =='DONE')"><span ng-bind="'PayDate'| translate">付款日期</span></td>
                    <td ng-show="(data.biddoc.state.value =='GOING') || (data.biddoc.state.value =='DONE')" ng-bind="data.biddoc.paymentDate"></td>
                </tr>
                <tr>
                    <td><span ng-bind="'DeparturePort'| translate">出发港口</span></td>
                    <td ng-bind="data.biddoc.departPort[name]"></td>
                    <td><span ng-bind="'ArrivalPort'| translate">到达港口</span></td>
                    <td ng-bind="data.biddoc.arrivalPort[name]"></td>
                </tr>

                <tr>
                    <td><span ng-bind="'DepartureDate'| translate">出发日期</span></td>
                    <td ng-bind="data.biddoc.departureDate"></td>
                    <td><span ng-bind="'ArrivalDate'| translate">到达日期</span></td>
                    <td ng-bind="data.biddoc.arrivalDate"></td>
                </tr>
                <tr>
                    <td><span ng-bind="'FullTime'| translate">船期</span></td>
                    <td><span ng-bind="data.biddoc.transportTime"></span><span ng-bind="'Day'| translate">天</span></td>
                    <td><span ng-bind="'ValidateTime'| translate">标书有效期</span></td>
                    <td><span ng-bind="data.biddoc.validateTime"></span><span ng-bind="'Hour'| translate">小时</span></td>
                </tr>
                <tr>
                    <td><span ng-bind="'TransportMode'| translate">运输模式</span></td>
                    <td ng-bind="data.biddoc.transportMode[name]"></td>
                    <td><span ng-bind="'TransportType'| translate">运输类别</span></td>
                    <td ng-bind="data.biddoc.transportType.name"></td>
                </tr>
                <tr>
                    <td><span ng-bind="'BoxedType'| translate">装箱类别</span></td>
                    <td ng-bind="data.biddoc.boxed[name]"></td>
                    <td><span ng-bind="'ContainerInfo'| translate">集装箱信息<span/></td>
                    <td><span ng-bind="data.biddoc.container[name]"></span><span>*</span><span ng-bind="data.biddoc.containerCount"></span></td>
                </tr>
            </table>
            <!--
            商品
			goodsClassID1	int	商品一级分类ID
			goodsClassID2	int	商品二级分类ID

			name	varchar(2000)	商品名称

			description	varchar(2000)	商品描述

			count	int	商品数量

			grossWeight	float	商品单件毛重

			volume	int	商品单件体积
			length	float	长
			weight	float	宽
			height	float	高

			isDangerous	tinyint	是否危险品
			dangerousClassID	tinyint	危险品类别
			dangerousPACKINGGROUP	tinyint	PACKINGGROUP类别
			dangerousUNNO	varchar(20)	危险品UNNO
			-->
            <table class="table">
                <tr>
                    <th>商品</th>
                    <th>描述</th>
                    <th>类别</th>
                    <th>数量</th>
                    <th>单件毛重</th>
                    <th>单件体积</th>
                    <th>是否危险品</th>
                </tr>
                <tr  ng-repeat="x in data.goods">
                    <td ng-bind="x.name"></td>
                    <td ng-bind="x.description"></td>
                    <td><span ng-bind="x.goodsFirstClass.cnName"></span><span>></span><span ng-bind="x.goodsSecondClass.cnName"></span></td>
                    <td ng-bind="x.count"></td>
                    <td><span ng-bind="x.grossWeight"></span><span>t</span></td>
                    <td>
                        <span ng-bind="x.volume"></span><span>m³</span>
                        <ul>
                            <li><span ng-bind="x.length"></span><span>m*</span><span ng-bind="x.width"></span><span>m*</span><span ng-bind="x.height"></span><span>m</span></li>
                        </ul>
                    </td>
                    <td>
                        <span ng-bind="x.isDangerous | TinyToBool"></span>
                        <ul ng-show="x.isDangerous == 1">

                            <li><span ng-show="x.isDangerous==1" ></span><span>危险品类别：</span><span ng-bind="x.dangerousClassID"></span></li>
                            <li><span ng-show="x.isDangerous==1" ></span><span>PACKINGGROUP类别：</span><span ng-bind="x.dangerousPACKINGGROUP"></span></li>
                            <li><span ng-show="x.isDangerous==1" ></span><span>危险品UNNO：</span><span ng-bind="x.dangerousUNNO"></span></li>
                        </ul>

                    </td>
                </tr>
            </table>
        </div>
        </div>
    </div>
	

    <s:include value="../public/include/footer.jsp"></s:include>
   
</html>