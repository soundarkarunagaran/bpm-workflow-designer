/**
 * [saveTemplateDiagram description]
 * @return {[type]} [description]
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

module.exports = saveTemplateDiagram