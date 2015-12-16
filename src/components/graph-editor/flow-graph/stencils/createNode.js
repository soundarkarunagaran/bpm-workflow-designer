/**
 * 返回需要节点xml标签
 * @param nodeType StartNode/EndNode/DecisionNode/ForkNode/JoinNode/Container/SubProcess/CustomNode
 * @returns xmlNode
 */
var ATTIBUTE_NAMES = require('../attributeNames')
var config = require('./config')
var {
    NAME,
    TYPE,
    DATA,
    PATH,
    CID
} = ATTIBUTE_NAMES

module.exports = function createNode(nodeType) {
    var doc = mxUtils.createXmlDocument();
    var node;
    switch (nodeType) {
        case "start":
            node = doc.createElement("StartNode");
            node.setAttribute(NAME, "开始");
            node.setAttribute(TYPE, "start-state");
            node.setAttribute(DATA, "{}");
            break;
        case "end":
            node = doc.createElement("EndNode");
            node.setAttribute(NAME, "结束");
            node.setAttribute(TYPE, "end-state");
            node.setAttribute(DATA, "{}");
            break;
        case "decision":
            node = doc.createElement("DecisionNode");
            node.setAttribute(NAME, "选择");
            node.setAttribute(TYPE, "decision");
            node.setAttribute(DATA, "{}");
            break;
        case "fork":
            node = doc.createElement("ForkNode");
            node.setAttribute(NAME, "分支");
            node.setAttribute(TYPE, "fork");
            node.setAttribute(DATA, "{}");
            break;
        case "join":
            node = doc.createElement("JoinNode");
            node.setAttribute(NAME, "聚合");
            node.setAttribute(TYPE, "join");
            node.setAttribute(DATA, "{}");
            break;
        case "Container":
            node = doc.createElement("CustomNode");
            node.setAttribute(NAME, "容器");
            node.setAttribute(TYPE, "container");
            node.setAttribute(DATA, "{}");
            break;
        case "subprocess":
            node = doc.createElement("CustomNode");
            node.setAttribute(NAME, "嵌套子流");
            node.setAttribute(TYPE, "sub-process");
            node.setAttribute(DATA, "{}");
            break;
        default:
            var comp = config.stencils[nodeType];
            node = doc.createElement("CustomNode");
            node.setAttribute(CID, comp.alias);
            node.setAttribute(NAME, comp.name);
            node.setAttribute(TYPE, comp.alias);
            node.setAttribute(DATA, "{}");
            node.setAttribute(PATH, comp.pagePathName);
            break;
    }
    return node;
}