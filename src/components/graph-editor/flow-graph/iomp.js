/**
 * 创建包装器editor，完成某些graph操作
 */ 
var editor; 
/**
 * 右键菜单全局变量
 */
var rMenu = null;
/**
 * 定义全局APP下拉选项对象
 */
var appArray = null;
/**
 * 定义全局模板类型下拉选项对象
 */
var modelTypeArray = null;
/**
 * 定义流程定义(模板)对象
 */
var templateObject = null;
/**
 * 
 */
var currentEditTemplate;

/**
 * 标示符，指示流程定义(模板)对象为新增还是编辑
 */
var operateType = 'new';
/**
 * 页面初始化
 */
$(document).ready(function() {
	/**
	 * 构造流程控件的Tab页面
	 */
	$("#tabs").tabs();
	/**
	 * 初始化流程模型目录树
	 */
	initTempLateTree();
	/**
	 * 初始化组件信息.暂时显示一级目录形式
	 */
	initComponent();
	main(document.getElementById('graphContainer'),
			document.getElementById('outlineContainer'),
		 	document.getElementById('toolbarContainer'),
			document.getElementById('sidebarContainer'),
			document.getElementById('statusContainer'));
});
/**
 * 初始化组件信息.暂时显示一级目录形式
 */
function initComponent(){
	$.ajax({
	     type : "POST",
	     url : $('#url').val()+"/design/getComponentListAct.action",
	     data : {
	    	 "_fw_service_id":"getComponentListSrv"
	     },
	     async:true,
	     cache:false,
	     success : function(msg) {
	    	 var result = JSON.parse(msg);
	    	 buildComponentList(result);
	     },
	     error : function(e) {
	      	alert("error");
	     }
	 });
}

/**
 * 加载自动化组件列表
 * @param result 自动化组件对象列表
 */
var customNodeDef;
function buildComponentList(result){
	var sidebar = document.getElementById('businessCompContainer');
	/** 循环返回结果，填充业务组件栏 */
	if(result && result.length > 0){
		customNodeDef = {};
		for ( var i = 0; i < result.length; i++) {
			customNodeDef[result[i].componentId] = result[i];
			addSidebarIcon(graph, sidebar, result[i].componentId,$('#url').val()+'/' + result[i].componentIcon);
		}
	}
}

/**
 * 初始化模型目录树数据
 * 模型目录树以应用为顶层目录
 * 通过后台当前用户过滤权限
 */
function initTempLateTree(){
	$.ajax({
	     type : "POST",
	     url : $('#url').val()+"/design/getTemplateTreeAct.action",
	     data : {
	    	 "_fw_service_id":"getTemplateTreeSrv"
	     },
	     async:true,
	     cache:false,
	     success : function(msg) {
	    	 var result = JSON.parse(msg);
	    	 buildTempLateTree(result);
	     },
	     error : function(e) {
	      	alert("error");
	     }
	 });
}
/**
 * 构造模型目录树
 */
function buildTempLateTree(result){
	var setting = {
			view: {
				dblClickExpand: false,
				showLine: true,
				selectedMulti: false
			},
			async: {
				enable: false
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onRightClick : templateRightClick,
				onClick: getTemplateContent
			}
		};
	var zNodesType="[";
	/**
	 * 添加顶层目录
	 * 通过后台参数构造json对象
	 */
	for(var i in result){
		if(result[i][3] =="0"){
			zNodesType += "{ id:'"+result[i][0]+"', pId:'"+result[i][1]+"', name:'"+result[i][2]+"',level:'"+result[i][3]+"',open:true},";
		}else if(result[i][3] =="1"){
			zNodesType += "{ id:'"+result[i][0]+"', pId:'"+result[i][1]+"', name:'"+result[i][2]+"',level:'"+result[i][3]+"',open:false},";
		}else if(result[i][3] =="2"){
			zNodesType += "{ id:'"+result[i][0]+"', pId:'"+result[i][1]+"', name:'"+result[i][2]+"',level:'"+result[i][3]+"',open:false},";
		}
	}
	zNodesType = zNodesType.substring(0, zNodesType.length-1);
	zNodesType+="]";
	var zNodes = eval(zNodesType);
	$.fn.zTree.init($("#templateTree"), setting, zNodes);
	rMenu = $("#rtemplate");
}
/**
 * 左键点击流程定义节点
 * 在底层时才触发操作
 * @param event
 * @param treeId
 * @param treeNode
 */
var lastSelectedNode;
function getTemplateContent(event, treeId, treeNode){
	if(treeNode.level == "2"){
		var isGetTemplate = true;
		//判断选择模板是否是当前编辑模板
		if(templateObject && treeNode.id != templateObject.templateId){
			isGetTemplate = confirm("您正在编辑流程“"+templateObject.templateName+"”，确定替换为“"+treeNode.name+"”？");
		}else if(templateObject && treeNode.id == templateObject.templateId){
			isGetTemplate = confirm("您正在编辑当前选择的模板，是否重新加载？");
		}
		
		if(isGetTemplate){
			lastSelectedNode = treeNode;
			$.ajax({
			     type : "POST",
			     url : $('#url').val()+"/design/getTemplateContentAct.action",
			     data : {
			    	 "_fw_service_id":"getTemplateContentSrv",
			    	 "templateId":treeNode.id
			     },
			     async:true,
			     cache:false,
			     success : function(msg) {
			    	 templateObject = JSON.parse(msg);
			    	 initFromTemp(templateObject.iconxml);
			     },
			     error : function(e) {
			      	alert("error");
			     }
			 });
		}else{
			//让左侧模板树还选择之前的模板
			if(lastSelectedNode){
				var zTree = $.fn.zTree.getZTreeObj("templateTree");
				zTree.selectNode(lastSelectedNode);
			}else{
				alert("没有获得之前选择节点，请刷新重试");
			}
		}
	}
}

/**
 * 重绘流程图
 * @param template
 */
function initFromTemp(template){
	if(template != undefined){
		var doc = mxUtils.parseXml(template);
	    var node = doc.documentElement;
	    editor.readGraphModel(node);
	}else{
		graph.getModel().clear();//清空画布
		editor.undoManager.clear();//清空撤销管理器缓存
	}
}

/**
 * 右键点击流程定义节点
 * 在底层时才触发操作
 * @param event
 * @param treeId
 * @param treeNode
 */
function templateRightClick(event, treeId, treeNode){
	/**
	 * 右键显示隐藏方法
	 */
	showRTemplate(treeNode.level, event.clientX, event.clientY-20);
	//var zTree = $.fn.zTree.getZTreeObj("templateTree");
	//zTree.selectNode(treeNode);
}
/**
 * 新增流程定义
 * 初始化基础数据
 * 只加载一次
 */
function newTemplate(){
	/**
	 * 判定基础数据是否存在 appArray modelTypeArray
	 * 如果不存在则后台查询并赋值
	 */
	getAppAndModelType();
	showTemplateDialog("新增流程定义", "new");
}

function importTemplate(){
	alert("暂未开放");
}

function exportTemplate(){
	alert("暂未开放");
}

function getAppAndModelType(){
	isAll = 1; // 设置选择所有类别
	initOrderTree();
	if(appArray == null || modelTypeArray == null){
		$.ajax({
		     type : "POST",
		     url : $('#url').val()+"/design/getTemplateBaseDataAct.action",
		     data : {
		    	 "_fw_service_id":"getTemplateBaseDataSrv"
		     },
		     async:false,
		     cache:false,
		     success : function(msg) {
		    	 var result = JSON.parse(msg);
		    	 appArray = result[0];
		    	 modelTypeArray = result[1];
		    	 buildTempLateBaseData();
		     },
		     error : function(e) {
		      	alert("error");
		     }
		 });
	}
}
/**
 * 构建新增流程定义表单
 */
function showTemplateDialog(title,type){
	operateType = type;
	if(type == "new"){
		$('#templateName').val(""),
		$('#orderTypeName').val(""),
		$('#orderTypeId').val(""),
		$('#templateApp').val(""),
		$('#templateModelId').val("");
	}
	$("#template_div").dialog({
		autoOpen : true,
		modal : true,
		width : 350
	});
	$("#template_div").dialog("option", "title", title);
}
/**
 * 新增流程定义初始化基础数据赋值
 * @param data 基础数据对象
 */
function buildTempLateBaseData(){
	/**
	 * 应用选择下拉项初始化
	 */
	$('#templateApp').find("option").remove();
	$("#templateApp").append("<option value='' selected>请选择</option>");
	$("#templateApp").append("<option value='0'>公用定义</option>");
	for(var a in appArray){
		$("#templateApp").append("<option value='"+appArray[a][0]+"' >"+appArray[a][1]+"</option>");  
	}
	/**
	 * 模板类型下拉项初始化
	 */
//	$('#templateType').find("option").remove();
//	$("#templateType").append("<option value='' selected>请选择</option>");
//	for(var b in modelTypeArray){
//		$("#templateType").append("<option value='"+modelTypeArray[b][0]+"' >"+modelTypeArray[b][1]+"</option>");  
//	}
}
/**
 * 保存流程定义
 * @param type new/edit
 */
function saveTemplate(){
	/**
	 * 校验资源类型是否选择
	 */
	var rules = {
		"templateName":{
			required:true,
			maxlength : 50
		},
		"templateModelId":{
			required:true,
			maxlength : 50,
			stringEn : true
		},
		"orderTypeName":{
			required:true
		},
		"templateApp":{
			required:true
		}
	};
	var msgs = {};
	var opts = {
			rules:rules,
			messages:msgs
	};
	result = validateForm("templateForm", opts);
	if(!result){
		 return;
	}
	/**
	 *当前操作位edit，使用currentEditTemplate对象进行更新操作
	 *否则为新建操作，重新构造参数对象
	 */
	var jsonRequest;
	if(operateType == "new"){
		jsonRequest = {
				//templateId:$('#templateId').val() == "-1" ? null : $('#templateId').val(),
				templateName:$('#templateName').val(),
				typeId:$('#orderTypeId').val(),
				appId:$('#templateApp').val(),
				creatorId:null,
				createDate:null,
				iconxml:null,
				filePath:null,
				isActive:'Y',
				modelId:$('#templateModelId').val()
			};
	}else{
		//operateType为copy则将templateId置为null，后台将进行创建而不是更新
		if(operateType == "copy"){
			currentEditTemplate.templateId = null;
		}
		currentEditTemplate.templateName = $('#templateName').val();
		currentEditTemplate.typeId = $('#orderTypeId').val();
		currentEditTemplate.appId = $('#templateApp').val();
		currentEditTemplate.modelId = $('#templateModelId').val();
		jsonRequest = currentEditTemplate;
	}
	/**
	 * 保存模板
	 */
	$.ajax({
	     type : "POST",
	     url :  $('#url').val()+"/design/saveTemplateAct.action",
	     data : {
	    	 "_fw_service_id":"saveTemplateSrv",
	    	 'jsonData' : JSON.stringify(jsonRequest),
	    	 'jsonClass' : 'com.ccb.iomp.cloud.data.po.workflow.BpmTemplatePo'
	     },
	     async:true,
	     cache:false,
	     success : function(data) {
	    	 var msg = '';
	    	 if(operateType == "new") {msg = "新建";}
	    	 else if(operateType == "edit") {msg = "编辑";}
	    	 else if(operateType == "copy") {msg = "复制";}
	    	 alert(msg+"模板成功!");
	    	 /**
	    	  * 判断之前是不是保存或新建了模板，如果是而且新保存模板和之前的不同则让用户确认是使用新保存的模板为当前使用模板
	    	  * 否则直接把新创建模板对象赋值给templateObject
	    	  */
	    	 if(templateObject && currentEditTemplate && templateObject.templateId != currentEditTemplate.templateId){
	    		 if(confirm("当前编辑的流程和选择的流程不同，是否替换？") == true){
	    			 templateObject = JSON.parse(data);
	    			 initFromTemp(templateObject.iconxml);
	    		 }
	    	 }else{ 
	    		 templateObject = JSON.parse(data);
	    	 }
    		
	    	 $("#template_div").dialog("close");
	    	 initTempLateTree();//重新获取模板信息，更新模板树
	     },
	     error : function(e) {
	      	alert("error");
	     }
	 });
}
/**
* 字符串形式转json对象
*/
function stringToJson(stringValue) {
	eval("var theJsonValue = " + stringValue);
	return theJsonValue;
}
/**
 * 显示右键菜单
 * @param type
 * @param x
 * @param y
 */
function showRTemplate(type, x, y) {
	if(type == "2"){
		$("#rMenu").show();
		$("#rMenu li").hide();
		$("#addScriptBtn").show();
		$("#delModuleBtn").show();
		rMenu.css({
			"top" : y + "px",
			"left" : x + "px",
			"visibility" : "visible"
		});
		$("body").on("mousedown", onBodyMouseDown);
	}
}
/**
 * 隐藏右键菜单
 */
function hideRMenu() {
	if (rMenu)
		rMenu.css({
			"visibility" : "hidden"
		});
	$("body").off("mousedown", onBodyMouseDown);
}
/**
 * 鼠标位置变换时隐藏右键菜单
 * @param event
 */
function onBodyMouseDown(event) {
	if (!(event.target.id == "rtemplate" || $(event.target).parents("#rtemplate").length > 0)) {
		hideRMenu();
	}
}
/**
 * 点击开始节点的回调函数
 * @param 节点id
 * @param 节点name
 * @param 节点数据串json
 */
function startStateClick(id,name,json){
	var param = "/pages/workflow/formPage/globalParamsForm.jsp?state=design&id="+id;
	$('#globalParamsFrame').attr("src",$('#url').val()+param);
	$("#startComponent_div").dialog({
		autoOpen : true,
		modal : true,
		width : 700
	});
	$("#startComponent_div").dialog("option", "title", "定义全局参数");
}
/**
 * 点击选择节点的回调函数
 * @param 节点id
 * @param 节点name
 * @param 节点数据串json
 */
function decisionClick(id,name,json){
	var param = "/pages/workflow/formPage/decisionForm.jsp?state=design&id="+id;
	$('#decisionFrame').attr("src",$('#url').val()+param);
	$("#decisionComponent_div").dialog({
		autoOpen : true,
		modal : true,
		width : 700
	});
	$("#decisionComponent_div").dialog("option", "title", "选择路由定义");
}
/**
 * 点击分支节点的回调函数
 * @param 节点id
 * @param 节点name
 * @param 节点数据串json
 */
function forkClick(id,name,json){
	var param = "/pages/workflow/formPage/forkForm.jsp?state=design&id="+id;
	$('#forkFrame').attr("src",$('#url').val()+param);
	$("#forkComponent_div").dialog({
		autoOpen : true,
		modal : true,
		width : 700
	});
	$("#forkComponent_div").dialog("option", "title", "分支路由定义");
}
/**
 * 点击聚合节点的回调函数
 * @param 节点id
 * @param 节点name
 * @param 节点数据串json
 */
function joinClick(id,name,json){
	var param = "/pages/workflow/formPage/joinForm.jsp?state=design&id="+id;
	$('#joinFrame').attr("src",$('#url').val()+param);
	$("#joinComponent_div").dialog({
		autoOpen : true,
		modal : true,
		width : 700,
		title : "聚合定义"
	});
}

/**
 * 获取开始节点里面配置的全局变量
 */
function getGlobalParams(){
	var model = graph.getModel();
	var cell = null;
	for ( var index in model.cells) {
		cell = model.cells[index];
		if(cell.getAttribute(TYPE) == "start-state"){
			return JSON.parse(cell.getAttribute(DATA));
		}
	}
}
/**
 * 获取可用跳转节点：排除聚合节点本身和开始节点
 * @param currentNodeId
 * @returns {Array}
 */
function getNavNodeList(currentNodeId){
	var vertices = graph.getModel().getChildVertices(graph.getDefaultParent());
	var vertice = null;
	var nodeList = [];
	for(var i=0;i<vertices.length;i++){
		vertice = vertices[i];
		if(vertice.id != currentNodeId && vertice.getAttribute(TYPE) != "start-state"){
			nodeList.push({nodeId:vertice.id,nodeName:vertice.getAttribute(NAME)});
		}
	}
	return nodeList;
}

/**
 * 点击容器节点的回调函数
 * @param 节点id
 * @param 节点name
 * @param 节点数据串json
 */
function containerClick(id,name,json){
	$("#containerComponent_div").dialog({
		autoOpen : true,
		modal : true,
		width : 700
	});
	var param = "/pages/workflow/formPage/containerForm.jsp?state=design&id="+id;
	$('#containerComponentFrame').attr("src",$('#url').val()+param);
	$("#containerComponent_div").dialog("option", "title", "分组信息配置");
}
/**
 * 点击子流程节点的回调函数
 * @param 节点id
 * @param 节点name
 * @param 节点数据串json
 */
function subProcessClick(id,name,json){
	var param = "/pages/workflow/formPage/subprocessForm.jsp?state=design&id="+id;
	$('#subprocessFrame').attr("src",$('#url').val()+param);
	$("#subprocessComponent_div").dialog({
		autoOpen : true,
		modal : true,
		width : 700,
		height: 200
	});
	$("#subprocessComponent_div").dialog("option", "title", "嵌套子流程");
}
/**
 * 点击结束节点回调函数
 * @param 节点id
 * @param 节点name
 * @param 节点数据串json
 */
function endStateClick(id,name,json){
	$("#endComponent_div").dialog({
		autoOpen : true,
		modal : true,
		width : 500
	});
	$("#endComponent_div").dialog("option", "title", "结束动作");
}

function setFrameHeight(height){
	$('#userComponentFrame').height(height);//重新设置iframe高度
	//重新设置对话框高度
	$("#userComponent_div").dialog({"height": height+60});
}

/**
 * 点击组件节点的回调函数
 * @param 节点id
 * @param 节点name
 * @param 节点数据串json
 * @param 组件Id
 * @param 组件表单路径
 */
function businessCompClick(id,name,json,compId,page){
	var param = "?state=design&id="+id;
	$('#userComponentFrame').attr("src",$('#url').val()+page+param);
	showUserComponentDialog(name);
}
function getNextNodes(id){
	var nodesArr = new Array();
	var cell = graph.getModel().getCell(id);
	if(cell.edges){
		for(var i = 0; i < cell.edges.length; i++){
			if(cell.edges[i].source == cell){
				var cellTarget = cell.edges[i].target;
				var jsonRequest = {
					"nodeId":cellTarget.id,
					"nodeName":cellTarget.getAttribute(NAME),
					"nodeExpression":""
				};
				nodesArr[nodesArr.length] = jsonRequest;
			}
		}
	}
	
	return nodesArr;
}
/**
 * 子页面根据组件id获取组件信息
 * @param id
 * @returns
 */
function getComponentContent(id){
	var cell = graph.getModel().getCell(id);
	var objTemp = {
		"name":cell.getAttribute(NAME),
		"json":cell.getAttribute(DATA),
		"compId":cell.getAttribute(CID),
		"typeCode":templateObject.typeId
	};
	return objTemp;
}

function getBaseComponentContent(id){
	var cell = graph.getModel().getCell(id);
	var objTemp = {
		"name":cell.getAttribute(NAME),
		"json":cell.getAttribute(DATA),
		"type":cell.getAttribute(TYPE)
	};
	return objTemp;
}
/**
 * 构建自定义组件数据定义表单
 */
function showUserComponentDialog(title){
	$("#userComponent_div").dialog({
		autoOpen : true,
		modal : true,
		width : 750
	});
	$("#userComponent_div").dialog("option", "title", title);
}
/**
 * 保存节点名字及属性数据
 */
function saveComponentNameData(id,name,data){
	onSubmitComponent(id,name,data);
	$("#userComponent_div").dialog("close");
}
function closeComponentDialog(id){
	$("#"+id).dialog("close");
}
/**
 * 保存整个流程模板
 */
function saveTemplateDiagram(){
	if(templateObject){
		if(validateTemplate()){
			var enc = new mxCodec(mxUtils.createXmlDocument());
			var node = enc.encode(graph.getModel());
			templateObject.iconxml = mxUtils.getPrettyXml(node);
			$.ajax({
			     type : "POST",
			     url :  $('#url').val()+"/design/saveTemplateAct.action",
			     data : {
			    	 "_fw_service_id":"saveTemplateSrv",
			    	 'jsonData' : JSON.stringify(templateObject),
			    	 'jsonClass' : 'com.ccb.iomp.cloud.data.po.workflow.BpmTemplatePo'
			     },
			     async:true,
			     cache:false,
			     success : function(msg) {
			    	 alert("保存成功!");
			    	 templateObject = JSON.parse(msg);
			     },
			     error : function(e) {
			      	alert("error");
			     }
			 });
		}
	}else{
		alert('当前没有编辑任何模板');
	}
}

/**
 * 校验模板合法性
 */
function validateTemplate(){
	//遍历所有节点，看是否有开始和结束节点
	var model = graph.getModel();
	var cell = null, counter = 0;
	for ( var index in model.cells) {
		cell = model.cells[index];
		if(cell.getAttribute(TYPE) == "start-state" || cell.getAttribute(TYPE) == "end-state"){
			counter++;
			if(counter == 2){
				return true;
			}
		}
	}
	alert('流程模板必须有唯一的开始节点和结束节点');
	return false;
}

/**
 * 发布右键菜单对应的模板
 */
function publishSpecifiedTemplate(){
	//获取到点击的模板树节点
	var zTree = $.fn.zTree.getZTreeObj("templateTree");
	var selectedNodes = zTree.getSelectedNodes();
	
	if(selectedNodes && selectedNodes.length > 0){
		$.ajax({
		     type : "POST",
		     url :  $('#url').val()+"/design/publishTemplateAct.action",
		     data : {
		    	 "_fw_service_id":"publishTemplateSrv",
		    	 "templateId" : parseInt(selectedNodes[0].id)
		     },
		     async:true,
		     cache:false,
		     success : function(msg) {
		    	 alert(JSON.parse(msg));
		     },
		     error : function(msg) {
		      	alert(JSON.parse(msg));
		     }
		});
 		
		hideRMenu();
	}
}

/**
 * 流程定义的发布
 */
function publishTemplate(tId){
	if(templateObject){
		if(validateTemplate()){
			var enc = new mxCodec(mxUtils.createXmlDocument());
			var node = enc.encode(graph.getModel());
			templateObject.iconxml = mxUtils.getPrettyXml(node);
			$.ajax({
			     type : "POST",
			     url :  $('#url').val()+"/design/saveTemplateAct.action",
			     data : {
			    	 "_fw_service_id":"saveTemplateSrv",
			    	 'jsonData' : JSON.stringify(templateObject),
			    	 'jsonClass' : 'com.ccb.iomp.cloud.data.po.workflow.BpmTemplatePo'
			     },
			     async:true,
			     cache:false,
			     success : function(msg) {
			    	 templateObject = JSON.parse(msg);
			    	 if(templateObject || tId){
		    			templateId = tId ? tId : templateObject.templateId;
		    			$.ajax({
		    			     type : "POST",
		    			     url :  $('#url').val()+"/design/publishTemplateAct.action",
		    			     data : {
		    			    	 "_fw_service_id":"publishTemplateSrv",
		    			    	 "templateId" : templateId
		    			     },
		    			     async:true,
		    			     cache:false,
		    			     success : function(msg) {
		    			    	 alert(JSON.parse(msg));
		    			     },
		    			     error : function(e) {
		    			      	alert("发布失败");
		    			     }
		    			 });
		    		}else{
		    			alert('当前没有编辑任何模板');
		    		}
			     },
			     error : function(e) {
			      	alert("error");
			     }
			 });
		}
	}else{
		alert('当前没有编辑任何模板');
	}
}
/**
 * 编辑流程模型
 */
function editTemplate(){
	getAppAndModelType();
	getTemplateContentFromMenu();
	showTemplateDialog("编辑流程定义", "edit");
	hideRMenu();
}

/**
 * 复制模板
 */
function copyTemplate(){
	getAppAndModelType();
	getTemplateContentFromMenu();
	showTemplateDialog("复制流程定义", "copy");
	hideRMenu();
}

/**
 * 
 */
function getTemplateContentFromMenu(){
	var zTree = $.fn.zTree.getZTreeObj("templateTree");
	var node = zTree.getSelectedNodes()[0];
	
	//获取该节点相关数据，然后弹出模板编辑窗口
	$.ajax({
	     type : "POST",
	     url : $('#url').val()+"/design/getTemplateContentAct.action",
	     data : {
	    	 "_fw_service_id":"getTemplateContentSrv",
	    	 "templateId":node.id
	     },
	     async:true,
	     cache:false,
	     success : function(msg) {
	    	 currentEditTemplate = JSON.parse(msg);
	    	 
	    	 //给表单赋值
	    	 $('#templateName').val(currentEditTemplate.templateName);
	    	 $('#templateId').val(currentEditTemplate.templateId);
	    	 $('#templateModelId').val(currentEditTemplate.modelId);
	    	 $('#orderTypeName').val(getTypeNameById(currentEditTemplate.typeId));
	    	 $('#templateApp').val(currentEditTemplate.appId);
	     },
	     error : function(e) {
	      	alert("error");
	     }
	});
}

/**
 * 删除选择模板
 */
function deleteTemplate(){
	if(confirm("确定删除当前模板？") == true){
		var zTree = $.fn.zTree.getZTreeObj("templateTree");
		var node = zTree.getSelectedNodes()[0];
		
		//根据templateId删除相应模板
		$.ajax({
		     type : "POST",
		     url : $('#url').val()+"/design/deleteTemplateAct.action",
		     data : {
		    	 "_fw_service_id":"deleteTemplateSrv",
		    	 "templateId":node.id
		     },
		     async:true,
		     cache:false,
		     success : function() {
		    	 alert("删除成功！");
		    	 //重新获取模板列表，刷新模板树
		    	 initTempLateTree();
		    	 //如果删除模板是当前使用的模板，则把当前状态重置为初始状态，
		    	 if(templateObject && node.id == templateObject.templateId){
		    		 templateObject = null;//重置模板对象
		    		 graph.getModel().clear();//清空画布
		    		 editor.undoManager.clear();//清空撤销管理器缓存
		    	 }
		     },
		     error : function(e) {
		      	alert("error");
		     }
		});
	}
	hideRMenu();
}

/**
 * 流程设计器mxgraph相关
 */
/** 节点属性常量 */
var NAME = 'Name', TYPE = 'Type', DATA = 'Data', PATH = 'Path', CID = 'ComponentId';
/** 画布对象 */
var graph;

/** 
 * 提交表单回调函数 
 */
function onSubmitComponent(id,name,json){
	var rtn = false;
	
	/** 更新节点属性 */
	var cell = graph.getModel().getCell(id);
	if(cell.getAttribute(NAME) != name || cell.getAttribute(DATA) != json){
		graph.getModel().beginUpdate();
		try{
			var edit;
			if(cell.getAttribute(NAME) != name){
				edit = new mxCellAttributeChange(cell, NAME,name);
				graph.getModel().execute(edit);
			}
			if(cell.getAttribute(DATA) != json){
				edit = new mxCellAttributeChange(cell, DATA,json);
				graph.getModel().execute(edit);
			}
			rtn = true;
			
			//如果是“选择”节点，额外处理连线的标签信息，从json数据中拿出“nextNodes”，然后根据节点名获取到相应线条并给其添加标签
//			var jsonData = JSON.parse(json);
//			if(jsonData.nextNodes){
//				for ( var i = 0; i < cell.edges.length; i++) {
//					var edge = cell.getEdgeAt(i);
//					//查找出边，出边的target不是cell
//					if (edge != null && edge.target != cell){
//						for ( var j = 0; j < jsonData.nextNodes.length; j++) {
//							//获取相应的边更新label和value
//							if(edge.getTerminal(false).id == jsonData.nextNodes[j].nodeId){
//								graph.cellLabelChanged(edge,jsonData.nextNodes[j].nodeRoute);//更新label的value
//							}
//						}
//					}
//				}
//			}
		}finally{
			graph.getModel().endUpdate();
		}
		
		/** 保存模板数据 */
		saveTemplateDiagram();
	}
	return rtn;
}

/**
 * onload处理函数.初始化mxGraph
 * container为画布容器.outline为缩略图.toolbar为工具栏.sidebar为侧边栏.status为状态栏
 */ 
function main(container, outline, toolbar, sidebar, status){
	/** 检查浏览器兼容性 */
	if (!mxClient.isBrowserSupported()){
		mxUtils.error('浏览器不支持!', 200, false);
	}else{
		/** 设置全局常量.hotspot为热点大小 */
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

		/** ie特殊设置 */
		if (mxClient.IS_QUIRKS){
			document.body.style.overflow = 'hidden';
			new mxDivResizer(container);
			new mxDivResizer(outline);
			new mxDivResizer(toolbar);
			new mxDivResizer(sidebar);
			new mxDivResizer(status);
		}
		
		/** 创建包装器editor.完成某些graph操作 */
		editor = new mxEditor();
		graph = editor.graph;
		editor.validation = false;

		/**
		 * 节点输入输出校验
		 */ 
		/** 开始结束不能有输入 */
		//graph.multiplicities.push(new mxMultiplicity(false,"StartNode",null,null,0,0,null,'开始节点不能有输入!',null));
		/** 结束节点不能有输出 */
		//graph.multiplicities.push(new mxMultiplicity(true,"EndNode",null,null,0,0,null,'结束节点不能有输出!',null));
		/** 自定义节点单进单出 */
		//graph.multiplicities.push(new mxMultiplicity(true,"CustomNode",null,null,1,1,null,'只能有一个输出!',null));
		//graph.multiplicities.push(new mxMultiplicity(false,"CustomNode",null,null,1,1,null,'只能有一个输入!',null));
		/** 聚合节点多进单出 */
		//graph.multiplicities.push(new mxMultiplicity(true,"JoinNode",null,null,1,1,null,'聚合节点有且只能有一个输出!',null));
		//graph.multiplicities.push(new mxMultiplicity(false,"JoinNode",null,null,1,100,null,'聚合节点至少要有一个输入!',null));
		/** 分支节点单进多出 */
		//graph.multiplicities.push(new mxMultiplicity(true,"ForkNode",null,null,1,100,null,'分支节点至少要有一个输出!',null));
		//graph.multiplicities.push(new mxMultiplicity(false,"ForkNode",null,null,1,1,null,'分支节点有且只能有一个输入!',null));
		/** 选择节点单进多出 */
		//graph.multiplicities.push(new mxMultiplicity(true,"DecisionNode",null,null,1,100,null,'分支节点至少要有一个输出!',null));
		//graph.multiplicities.push(new mxMultiplicity(false,"DecisionNode",null,null,1,1,null,'分支节点有且只能有一个输入!',null));
		
		/** 启用拖放 */
		graph.setDropEnabled(true);
		/** 启用画布拖动 */
		graph.setPanning(true);

		/** 禁用tooltips */
		graph.setTooltips(false);
		
		/** 连接指示图 */
		graph.connectionHandler.getConnectImage = function(state){
			return new mxImage('images/connector.gif', 16, 16);
		};

		/** 不允许无终点边 */
		graph.setAllowDanglingEdges(false);

		/** 设置graph容器div */
		editor.setGraphContainer(container);
		
		/** 设置快捷键配置文件 */
		var config = mxUtils.load('editors/config/keyhandler-commons.xml').getDocumentElement();
		editor.configure(config);
		
		/** 定义默认组用于分组，同时也用于侧边栏容器按钮 */
		var containerNode = createNode("Container");
		
		var group = new mxCell(containerNode, new mxGeometry(), 'group');
		group.setVertex(true);
		group.geometry.alternateBounds = new mxRectangle(0, 0, 50, 30);
		editor.defaultGroup = group;
		editor.groupBorderSize = 20;
		
		/** 只有泳道才被允许作为拖放目标 */
		graph.isValidDropTarget = function(cell, cells, evt){
			return this.isSwimlane(cell);
		};
		graph.isValidRoot = function(cell){
			return this.isValidDropTarget(cell);
		};

		/** 转换对象值为标签 */
		graph.convertValueToString = function(cell){
			var lbl = mxUtils.isNode(cell.value) ? cell.value.getAttribute(NAME) : cell.value;
	        return lbl;
	    };
	    
		/** 标签更改响应函数.更新 */
	  	var cellLabelChanged = graph.cellLabelChanged;
	    graph.cellLabelChanged = function(cell, newValue, autoSize){
	      if (mxUtils.isNode(cell.value)){
	        /** 为undo/redo的目的克隆当前值 */
	        var elt = cell.value.cloneNode(true);
	        elt.setAttribute(NAME, newValue);
	        newValue = elt;
	      }
	
	      cellLabelChanged.apply(this, arguments);
	    }; 
			
		/** 如果是分组则可以折叠 */
		graph.isCellFoldable = function(cell){
			return this.isSwimlane(cell);
		};

		/** 双击节点弹出一个窗口 */
		var dblClick = graph.dblClick;
		graph.dblClick = function(evt, cell){
			if(cell && cell.isVertex()){
				if (this.isEnabled() &&	!mxEvent.isConsumed(evt) &&	cell != null &&	this.isCellEditable(cell)){
					/** 根据节点属性创建表单 */
					if(mxUtils.isNode(cell.value)){
						switch(cell.value.getAttribute(TYPE)){
							case "start-state":
								startStateClick(cell.id,cell.value.getAttribute(NAME),cell.value.getAttribute(DATA));
								break;
							case "end-state":
								endStateClick(cell.id,cell.value.getAttribute(NAME),cell.value.getAttribute(DATA));
								break;
							case "decision":
								decisionClick(cell.id,cell.value.getAttribute(NAME),cell.value.getAttribute(DATA));
								break;
							case "fork":
								forkClick(cell.id,cell.value.getAttribute(NAME),cell.value.getAttribute(DATA));
								break;
							case "join":
								joinClick(cell.id,cell.value.getAttribute(NAME),cell.value.getAttribute(DATA));
								break;
							case "container":
								containerClick(cell.id,cell.value.getAttribute(NAME),cell.value.getAttribute(DATA));
								break;
							case "sub-process":
								subProcessClick(cell.id,cell.value.getAttribute(NAME),cell.value.getAttribute(DATA));
								break;
							default : //业务组件回调
								businessCompClick(cell.id,
										cell.value.getAttribute(NAME),
										cell.value.getAttribute(DATA),
										cell.value.getAttribute(CID),
										cell.value.getAttribute(PATH));
								break;
						}
					}
				}
				/** 取消双击更改标签的默认行为 */
				mxEvent.consume(evt);
			}else{
				dblClick.apply(this,arguments);
			}
		};
		
		/** 启用连接性 */
		graph.setConnectable(true);
		
		/** 添加graph样式 */
		configureStylesheet(graph);

		/** 添加侧边栏图标 */
		addSidebarIcon(graph, sidebar,"StartNode",'../images/component-start-icon.png');
		addSidebarIcon(graph, sidebar, "EndNode", '../images/component-end-icon.png');
		addSidebarIcon(graph, sidebar, "DecisionNode",'../images/component-decision-icon.png');
		addSidebarIcon(graph, sidebar,"ForkNode",'../images/component-fork-icon.png');
		addSidebarIcon(graph, sidebar,"JoinNode",'../images/component-join-icon.png');
		//addSidebarIcon(graph, sidebar,"Container",'../images/component-container-icon.png');
		addSidebarIcon(graph, sidebar,"SubProcess",'../images/component-subprocess-icon.png');
		
		/** 显示提示信息 */
		var hints = document.createElement('div');
		hints.style.position = 'absolute';
		hints.style.overflow = 'hidden';
		hints.style.width = '230px';
		hints.style.bottom = '56px';
		hints.style.height = '76px';
		hints.style.right = '20px';
		
		hints.style.background = 'black';
		hints.style.color = 'white';
		hints.style.fontFamily = 'Arial';
		hints.style.fontSize = '10px';
		hints.style.padding = '4px';

		mxUtils.setOpacity(hints, 50);
		
		/** 创建一个div，将工具栏按钮加入其中 */
		var spacer = document.createElement('div');
		spacer.style.display = 'inline';
		spacer.style.padding = '8px';
		
		addToolbarButton(editor, toolbar, 'group', '分组', 'images/navigate_plus.png');
		addToolbarButton(editor, toolbar, 'ungroup', '取消分组', 'images/navigate_minus.png');
		addToolbarButton(editor, toolbar, 'delete', '删除', 'images/delete2.png');
		
		toolbar.appendChild(spacer.cloneNode(true));
		
		addToolbarButton(editor, toolbar, 'cut', '剪切', 'images/cut.png');
		addToolbarButton(editor, toolbar, 'copy', '复制', 'images/copy.png');
		addToolbarButton(editor, toolbar, 'paste', '粘贴', 'images/paste.png');

		toolbar.appendChild(spacer.cloneNode(true));
		
		addToolbarButton(editor, toolbar, 'undo', '撤销', 'images/undo.png');
		addToolbarButton(editor, toolbar, 'redo', '重做', 'images/redo.png');
		
		toolbar.appendChild(spacer.cloneNode(true));
		
		addToolbarButton(editor, toolbar, 'show', '预览', 'images/camera.png');
		
		toolbar.appendChild(spacer.cloneNode(true));

		/** 定义一个新的导出动作 */
		editor.addAction('export', function(editor, cell){
			var textarea = document.createElement('textarea');
			textarea.style.width = '400px';
			textarea.style.height = '400px';
			var enc = new mxCodec(mxUtils.createXmlDocument());
			var node = enc.encode(editor.graph.getModel());
			textarea.value = mxUtils.getPrettyXml(node);
			showModalWindow(graph, 'XML', textarea, 410, 440);
		});

		addToolbarButton(editor, toolbar, 'export', '导出', 'images/export.png');
		
		/** 定义一个新的保存动作 */
		editor.addAction('save', function(editor, cell){
			saveTemplateDiagram();
		});
		addToolbarButton(editor, toolbar, 'save', '保存', 'images/save.png');
		
		/** 定义部署动作 */
		editor.addAction("deploy",function(editor,cell){
			publishTemplate();
		});
		addToolbarButton(editor, toolbar, 'deploy', '部署', 'images/export1.png');
		editor.addAction("addnode",function(editor,cell){
			var parent = graph.getDefaultParent();
			var model = graph.getModel();
			var v1 = null;
			var vertice = graph.getSelectionCell();
			var outgoingEdge = (model.getOutgoingEdges(vertice))[0];
			
			model.beginUpdate();
			try{
				var targetNode = outgoingEdge.getTerminal(false);
				var fromPoint = vertice.getGeometry().getPoint();
				var toPoint   = targetNode.getGeometry().getPoint();
				var computeVerticePointFunc = function(fromPoint,toPoint){
					var pointX,pointY;
					var offset = 0;//垂直或者水平偏移量
					
					//首先判断fromPoint和toPoint两点之间是水平关系还是垂直关系
					var horizontal = (Math.abs(fromPoint.x - toPoint.x) > Math.abs(fromPoint.y - toPoint.y));
					var factor;//系数，由起始点相对位置决定
					if( horizontal ){
						if(toPoint.x - fromPoint.x < 0)
							factor = 1;
						else
							factor = -1;
					}else{
						if(toPoint.y - fromPoint.y < 0)
							factor = 1;
						else
							factor = -1;
					}
					
					//每次偏移量加100不断查找，直到找到合适的位置为止
					while(true){
						offset += 100;
						//判断1号选择点：正上
						if(horizontal){
							pointX = fromPoint.x;
							pointY = fromPoint.y + factor * offset;
						}else{
							pointX = fromPoint.x + factor * offset;
							pointY = fromPoint.y;
						}
						
						if(graph.getCells(pointX-10, pointY-10, 100, 100).length == 0){
							return new mxPoint(pointX,pointY);	
						}
						
						//判断2号选择点：右上角
						if(horizontal){
							pointX = (fromPoint.x + toPoint.x)/2;
							pointY = fromPoint.y + factor * offset;
						}else{
							pointX = fromPoint.x + factor * offset;
							pointY = (fromPoint.y + toPoint.y)/2;
						}
						
						if(graph.getCells(pointX-10,pointY-10,100,100).length == 0){
							return new mxPoint(pointX,pointY);
						}
						
						//判断3号选择点：正下
						if(horizontal){
							pointX = fromPoint.x;
							pointY = fromPoint.y - factor * offset;
						}else{
							pointX = fromPoint.x - factor * offset;
							pointY = fromPoint.y;
						}
						if(graph.getCells(pointX-10,pointY-10,100,100).length == 0){
							return new mxPoint(pointX,pointY);
						}
						
						//判断4号选择点：右下角
						if(horizontal){
							pointX = (fromPoint.x + toPoint.x)/2;
							pointY = fromPoint.y - factor * offset;
						}else{
							pointX = fromPoint.x - factor * offset;
							pointY = (fromPoint.y + toPoint.y)/2;
						}
						
						if(graph.getCells(pointX-10,pointY-10,100,100).length == 0){
							return new mxPoint(pointX,pointY);
						}
					}
				};
				var verticePoint = computeVerticePointFunc(fromPoint,toPoint);
				
				v1 = graph.insertVertex(parent, null, createNode(3645704), verticePoint.x, verticePoint.y, 80, 80, 'image=../images/component-hand-icon.png');
				model.setTerminal(outgoingEdge, v1, true);
			   // graph.insertEdge(parent, null, '',vertice , v1, 'strokeColor=blue');
			    var e1 = graph.insertEdge(parent, null, '', vertice, v1);
				var e2 = graph.insertEdge(parent, null, '', v1, vertice);
				e1.getGeometry().points = [new mxPoint(verticePoint.x+20,verticePoint.y+80)];
				e2.getGeometry().points = [new mxPoint(verticePoint.x+60,verticePoint.y+80)];
			}finally{
				model.endUpdate();
			}
			graph.setSelectionCell(v1);
			
		});
		//addToolbarButton(editor, toolbar, 'addnode', '动态添加节点', 'images/export1.png');
		
		/** 添加按钮到状态栏 */
		addToolbarButton(editor, status, 'collapseAll', 'Collapse All', 'images/navigate_minus.png', true);
		addToolbarButton(editor, status, 'expandAll', 'Expand All', 'images/navigate_plus.png', true);

		status.appendChild(spacer.cloneNode(true));
		
		addToolbarButton(editor, status, 'enterGroup', 'Enter', 'images/view_next.png', true);
		addToolbarButton(editor, status, 'exitGroup', 'Exit', 'images/view_previous.png', true);

		status.appendChild(spacer.cloneNode(true));

		addToolbarButton(editor, status, 'zoomIn', '', 'images/zoom_in.png', true);
		addToolbarButton(editor, status, 'zoomOut', '', 'images/zoom_out.png', true);
		addToolbarButton(editor, status, 'actualSize', '', 'images/view_1_1.png', true);
		addToolbarButton(editor, status, 'fit', '', 'images/fit_to_size.png', true);
		
		/** 创建大纲窗口 */
		new mxOutline(graph, outline);
		/** UI加载完毕.淡出加载画面 */
		var splash = document.getElementById('splash');
		if (splash != null){
			try{
				mxEvent.release(splash);
				mxEffects.fadeOut(splash, 100, true);
			}catch (e){
				splash.parentNode.removeChild(splash);
			}
		}
	}
};
/**
 * 添加工具栏
 * @param editor
 * @param toolbar
 * @param action
 * @param label
 * @param image
 * @param isTransparent
 */
function addToolbarButton(editor, toolbar, action, label, image, isTransparent){
	var button = document.createElement('button');
	button.style.fontSize = '10';
	if (image != null){
		var img = document.createElement('img');
		img.setAttribute('src', image);
		img.style.width = '16px';
		img.style.height = '16px';
		img.style.verticalAlign = 'middle';
		img.style.marginRight = '2px';
		button.appendChild(img);
	}
	if (isTransparent){
		button.style.background = 'transparent';
		button.style.color = '#FFFFFF';
		button.style.border = 'none';
	}
	mxEvent.addListener(button, 'click', function(evt){
		editor.execute(action);
	});
	mxUtils.write(button, label);
	toolbar.appendChild(button);
};

function showModalWindow(graph, title, content, width, height){
	var background = document.createElement('div');
	background.style.position = 'absolute';
	background.style.left = '0px';
	background.style.top = '0px';
	background.style.right = '0px';
	background.style.bottom = '0px';
	background.style.background = 'black';
	mxUtils.setOpacity(background, 50);
	document.body.appendChild(background);
	
	if (mxClient.IS_IE){
		new mxDivResizer(background);
	}
	var x = Math.max(0, document.body.scrollWidth/2-width/2);
	var y = Math.max(10, (document.body.scrollHeight || document.documentElement.scrollHeight)/2-height*2/3);
	var wnd = new mxWindow(title, content, x, y, width, height, false, true);
	wnd.setClosable(true);
	
	/** Fades the background out after after the window has been closed */
	wnd.addListener(mxEvent.DESTROY, function(evt){
		graph.setEnabled(true);
		mxEffects.fadeOut(background, 50, true, 
			10, 30, true);
	});

	graph.setEnabled(false);
	graph.tooltipHandler.hide();
	wnd.setVisible(true);
	
	return wnd;
};

/**
 * 添加侧边栏图标
 */
function addSidebarIcon(graph, sidebar, nodeType, image){
	var node = createNode(nodeType);
	/**
	 * 当图片被拖放到画布上时的执行函数
	 * graph 画布 
	 * evt   触发的事件
	 * cell  目标节点
	 * x|y   当前坐标
	 */
	var funct = function(graph, evt, cell, x, y){
		/** 是否新建流程图，是才允许添加组件到画布 */
		if(templateObject == null){
			alert("请先新建或选择流程定义再添加控件!");
			return;
		}
		/** 节点合法性检查 */
		if(doValid(graph, nodeType)){
			var parent = null;
			var model = graph.getModel();
			var v1 = null;
			
			model.beginUpdate();
			try{
				/**
				 * 如果目标是泳道，则将新节点父节点设置为该泳道
				 * 同时设置添加节点坐标为相对泳道的坐标
				 * 否则将新节点父节点设置为根节点
				 */ 
				if(graph.isSwimlane(cell)){
					parent = cell;
					x -= cell.geometry.x;
					y -= cell.geometry.y;
				}else{
					parent = graph.getDefaultParent();
				}
				
				/**
				 * 如果添加节点类型为容器.设置其样式为group.并设置节点折叠大小
				 * 否则设置应用默认节点样式
				 */ 
				if(nodeType != "container"){
					v1 = graph.insertVertex(parent, null, createNode(nodeType), x, y, 80, 80, 'image='+image);
				}
				else{
					v1 = graph.insertVertex(parent, null, createNode(nodeType), x, y, 80, 80, 'group');
					v1.geometry.alternateBounds = new mxRectangle(0, 0, 80, 40);
					v1.setConnectable(false);
				}
			}finally{
				model.endUpdate();
			}
			graph.setSelectionCell(v1);
		}else{
			alert('添加的节点不符合唯一性规则！');
		}
	};
	
	var doValid = function doValidation(graph,nodeType){
		if(nodeType == 'StartNode' || nodeType == 'EndNode'){
			return checkUniq(graph.getDefaultParent(),nodeType);
		}
		return true;
	};
	
	var checkUniq = function(parent,nodeType){
		var cells = graph.getChildVertices(parent);
		for(var i = 0;i < cells.length; i++){
			if(graph.isSwimlane(cells[i])){
				return checkUniq(cells[i],nodeType);
			}else{
				if(cells[i].value.nodeName == nodeType){
					return false;
				}
			}
		}
		return true;
	};
	/** 创建侧边栏图标 */
	var div = $("<div></div>").css({
		width:"60px",
		height:"60px",
		margin:"5px 5px 5px 5px",
		float:"left"
	})[0];

	var img = $("<img/>").attr({src: image,title:"拖放到画布上将创建该节点"}).css({
		width:"40px",
		height:"40px",
		paddingLeft:"10px",
		cursor:"pointer"
	})[0];

	var lbl = $("<span/>").html(node.getAttribute(NAME)).css({
		display:"block",width:"60px",height:"20px",textAlign:"center"
	})[0];
	
	div.appendChild(img);
	div.appendChild(lbl);
	sidebar.appendChild(div);
	
	var dragElt = document.createElement('img');
	dragElt.setAttribute('src', image);
	dragElt.style.width = '80px';
	dragElt.style.height = '80px';
	dragElt.style.opacity = 0.5;
	  					
	/** 拖放侧边栏图标处理函数 */
	var ds = mxUtils.makeDraggable(img, graph, funct, dragElt, 0, 0, true, true);
	ds.setGuidesEnabled(true);
};

/**
 * 返回需要节点xml标签
 * @param nodeType StartNode/EndNode/DecisionNode/ForkNode/JoinNode/Container/SubProcess/CustomNode
 * @returns xmlNode
 */
function createNode(nodeType){
	var doc = mxUtils.createXmlDocument();
	var node;
	switch(nodeType){
		case "StartNode"   :node = doc.createElement("StartNode");
							node.setAttribute(NAME,"开始");
							node.setAttribute(TYPE,"start-state");
							node.setAttribute(DATA,"{}");
							break;
		case "EndNode"     :node = doc.createElement("EndNode");
							node.setAttribute(NAME,"结束");
							node.setAttribute(TYPE,"end-state");
							node.setAttribute(DATA,"{}");
							break;
		case "DecisionNode":node = doc.createElement("DecisionNode");
							node.setAttribute(NAME,"选择");
							node.setAttribute(TYPE,"decision");
							node.setAttribute(DATA,"{}");
							break;
		case "ForkNode"    :node = doc.createElement("ForkNode");
							node.setAttribute(NAME,"分支");
							node.setAttribute(TYPE,"fork");
							node.setAttribute(DATA,"{}");
							break;
		case "JoinNode"    :node = doc.createElement("JoinNode");
							node.setAttribute(NAME,"聚合");
							node.setAttribute(TYPE,"join");
							node.setAttribute(DATA,"{}");
							break;
		case "Container"   :node = doc.createElement("CustomNode");
							node.setAttribute(NAME,"容器");
							node.setAttribute(TYPE,"container");
							node.setAttribute(DATA,"{}");
							break;
		case "SubProcess"  :node = doc.createElement("CustomNode");
							node.setAttribute(NAME,"嵌套子流");
							node.setAttribute(TYPE,"sub-process");
							node.setAttribute(DATA,"{}");
							break;
		default			   :var comp = customNodeDef[nodeType];
							node = doc.createElement("CustomNode");
							node.setAttribute(CID,comp.componentId);
							node.setAttribute(NAME,comp.componentName);
							node.setAttribute(TYPE,comp.componentType);
							node.setAttribute(DATA,"{}");
							node.setAttribute(PATH,comp.pagePathName);
							break;
	}
	
	return node;
}

/**
 * 配置样式
 */
function configureStylesheet(graph){
	/** 定义默认节点样式 */
	var style = new Object();
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
	style[mxConstants.STYLE_SPACING_TOP] = '50';
	style[mxConstants.STYLE_FONTCOLOR] = '#1d258f';
	style[mxConstants.STYLE_FONTFAMILY] = '微软雅黑';
	style[mxConstants.STYLE_FONTSIZE] = '12';
	style[mxConstants.STYLE_FONTSTYLE] = '1';
	style[mxConstants.STYLE_ROUNDED] = '1';
	style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
	style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
	style[mxConstants.STYLE_OPACITY] = '80';
	graph.getStylesheet().putDefaultVertexStyle(style); 

	style = new Object();
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_BOTTOM;
	style[mxConstants.STYLE_FILLCOLOR] = '#CDE5F6';
	style[mxConstants.STYLE_GRADIENTCOLOR] = '#F8FBFE';
	style[mxConstants.STYLE_STROKECOLOR] = '#C0D3E2';
	style[mxConstants.STYLE_FONTCOLOR] = '#000000';
	style[mxConstants.STYLE_ROUNDED] = false;
	style[mxConstants.STYLE_OPACITY] = '80';
	style[mxConstants.STYLE_STARTSIZE] = '30';
	style[mxConstants.STYLE_FONTSIZE] = '16';
	style[mxConstants.STYLE_FONTSTYLE] = 1;
	graph.getStylesheet().putCellStyle('group', style);
	
	style = new Object();
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
	style[mxConstants.STYLE_FONTCOLOR] = '#774400';
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_PERIMETER_SPACING] = '6';
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
	style[mxConstants.STYLE_FONTSIZE] = '14';
	style[mxConstants.STYLE_FONTSTYLE] = 1;
	style[mxConstants.STYLE_SPACING_BOTTOM] = '56';
	style[mxConstants.STYLE_IMAGE_WIDTH] = '64';
	style[mxConstants.STYLE_IMAGE_HEIGHT] = '64';
	graph.getStylesheet().putCellStyle('port', style);
	
	style = graph.getStylesheet().getDefaultEdgeStyle();
	style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
	style[mxConstants.STYLE_STROKEWIDTH] = '2';
	style[mxConstants.STYLE_ROUNDED] = true;
	style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
};