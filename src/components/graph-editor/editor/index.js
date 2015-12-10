/**
 * mxgraph Diagram
 * @param {Element} [config.container] [dom 节点]
 * @param {Boolean} [config.editable] [图形是否可以编辑]
 */

import Style from './style';

var DEBUG_RENDER = true;

var {
	mxConstants,
	mxEdgeStyle,
	mxPerimeter,
	mxEvent,
	mxUtils,
	mxCell,
	mxGeometry,
	mxGraphModel,
	mxCodec,
	mxEditor,
	mxClient,
	mxSwimlaneManager,
	mxStackLayout,
	mxLayoutManager,
	mxPoint
} = window;

function Diagram(config) {
	this.config = config;
	this._init(config);
}

/**
 * [_init description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
Diagram.prototype._init = function(config) {

	var container = config.container;

	/** 检查浏览器兼容性 */
	if (!mxClient.isBrowserSupported()){
		return mxUtils.error('浏览器不支持!', 200, false);
	} 

	/**
	 * [全局设置]
	 * @type {Number}
	 */
	mxConstants.MIN_HOTSPOT_SIZE = 16;
	mxConstants.DEFAULT_HOTSPOT = 1;

	/** 启用参考线 */
	mxGraphHandler.prototype.guidesEnabled = true;

	/** 托转同时按下Alt禁用参考线 */
    mxGuide.prototype.isEnabledForEvent = function(evt){
		return !mxEvent.isAltDown(evt);
	};

	/** 启用吸附到连线末端 */
	mxEdgeHandler.prototype.snapToTerminals = true;


	/**
	 * [创建容器]
	 * @type {mxEditor}
	 */
	var editor = this.editor = new mxEditor(config);
	editor.setGraphContainer(container);
	var graph = this.graph = editor.graph;
	var graphModel = this.graphModel = graph.getModel();

	/** 可编辑 */
	graph.setEnabled(true);
	/** 启用拖放 */
	graph.setDropEnabled(true);
	/** 启用画布拖动 */
	graph.setPanning(true);
	graph.panningHandler.useLeftButtonForPanning = true;
	/** 禁用tooltips */
	graph.setTooltips(false);

	/** 不允许无终点边 */
	graph.setAllowDanglingEdges(false);

	/** 连接指示图 */
	graph.connectionHandler.getConnectImage = function(state){
		return new mxImage('assets/images/connector.gif', 16, 16);
	};

	graph.isCellFoldable = function(cell){
		return false;
	};
	 
	graph.isPool = function(cell) {
        var model = this.getModel();
        var parent = model.getParent(cell);
        return parent !== null && model.getParent(parent) === model.getRoot();
    };

	graph.addListener(mxEvent.CLICK, function(sender, event) {
		var cell = event.getProperty('cell');
		if (cell !== null) {
			// console.log(cell.id);
			// config.clickCellHandler && config.clickCellHandler(cell.id);
		}
	});

	/** 禁用系统右键菜单 */
	mxEvent.disableContextMenu(container);

	/** 设置流程图样式 */
	Style.configureStylesheet(graph);
	graph.setHtmlLabels(true);
}

/**
 * [render 根据数据重新渲染所有节点]
 * @param  {[type]} nodes [description]
 * @return {[type]}       [description]
 */
Diagram.prototype.render = function(data) {
	var graph = this.graph;
	var graphModel = this.graphModel;
	var root  = graph.getDefaultParent();
	graphModel.beginUpdate();
	try {
		insertVertex(root, 'asd', 'asd', 100, 100, 200, 80)
	} finally {
		graphModel.endUpdate();
	}
	function insertVertex(parent, id, value, x, y, width, height, style, relative) {
		return graph.insertVertex(parent, id, value, x, y, width, height, style, relative);
	}
}

/**
 * [initFormXML 根据 XML 绘制流程图] 
 * @param  {[type]} xmlData [description]
 * @return {[type]}         [description]
 */
Diagram.prototype.initFormXML = function (xmlData){
	/** 初始化流程图 */
	xmlData = xmlData || '<?xml version="1.0" encoding="UTF-8"?><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="flow0" source="start" target="receiveTask0" edge="1" value="" parent="1"><mxGeometry as="geometry" relative="1"/></mxCell><mxCell id="flow1" source="receiveTask0" target="receiveTask1" edge="1" value="" parent="1"><mxGeometry as="geometry" relative="1"/></mxCell><mxCell id="flow2" source="receiveTask1" target="receiveTask2" edge="1" value="" parent="1"><mxGeometry as="geometry" relative="1"/></mxCell><mxCell id="flow3" source="receiveTask2" target="end" edge="1" value="" parent="1"><mxGeometry as="geometry" relative="1"/></mxCell><StartNode id="start" Name="Start" Type="start-state" nodeId="start"><mxCell parent="1" style="image=./images/start.png" vertex="1"><mxGeometry as="geometry" x="0.0" y="0.0" width="64" height="64"/></mxCell></StartNode><CustomNode id="receiveTask2" Name="configChange2" Path="222" Type="111" ComponentId="2" nodeId="d7b340f5-cbaa-403d-8724-a24f5bb206f7"><mxCell parent="1" style="image=./images/recieve.png" vertex="1"><mxGeometry as="geometry" x="380.0" y="0.0" width="64" height="64"/></mxCell></CustomNode><CustomNode id="receiveTask1" Name="puppetChange1" Path="222" Type="111" ComponentId="1" nodeId="dd6b5e3d-1649-4934-bbb7-eb82a9a93ae4"><mxCell parent="1" style="image=./images/recieve.png" vertex="1"><mxGeometry as="geometry" x="230.0" y="0.0" width="64" height="64"/></mxCell></CustomNode><CustomNode id="receiveTask0" Name="puppetChange0" Path="222" Type="111" ComponentId="1" nodeId="8cbddaba-7090-428b-8098-5bfe0323bb97"><mxCell parent="1" style="image=./images/recieve.png" vertex="1"><mxGeometry as="geometry" x="80.0" y="0.0" width="64" height="64"/></mxCell></CustomNode><EndNode id="end" Name="End" Type="end-state" nodeId="end"><mxCell parent="1" style="image=./images/end.png" vertex="1"><mxGeometry as="geometry" x="530.0" y="0.0" width="64" height="64"/></mxCell></EndNode></root></mxGraphModel>';
	var graph = this.graph;
	var doc = mxUtils.parseXml(xmlData);
	var dec = new mxCodec(doc);
    dec.decode(doc.documentElement, graph.getModel());
}

module.exports = Diagram
