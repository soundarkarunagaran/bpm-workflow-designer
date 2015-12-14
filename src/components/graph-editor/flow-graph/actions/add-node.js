/**
 * add node handler
 */
function addNodeHandler(editor, cell) {
    var parent = graph.getDefaultParent();
    var model = graph.getModel();
    var v1 = null;
    var vertice = graph.getSelectionCell();
    var outgoingEdge = (model.getOutgoingEdges(vertice))[0];
    model.beginUpdate();
    try {
        var targetNode = outgoingEdge.getTerminal(false);
        var fromPoint = vertice.getGeometry().getPoint();
        var toPoint = targetNode.getGeometry().getPoint();
        var computeVerticePointFunc = function(fromPoint, toPoint) {
            var pointX, pointY;
            var offset = 0; //垂直或者水平偏移量
            //首先判断fromPoint和toPoint两点之间是水平关系还是垂直关系
            var horizontal = (Math.abs(fromPoint.x - toPoint.x) > Math.abs(fromPoint.y - toPoint.y));
            var factor; //系数，由起始点相对位置决定
            if (horizontal) {
                if (toPoint.x - fromPoint.x < 0) factor = 1;
                else factor = -1;
            } else {
                if (toPoint.y - fromPoint.y < 0) factor = 1;
                else factor = -1;
            }
            //每次偏移量加100不断查找，直到找到合适的位置为止
            while (true) {
                offset += 100;
                //判断1号选择点：正上
                if (horizontal) {
                    pointX = fromPoint.x;
                    pointY = fromPoint.y + factor * offset;
                } else {
                    pointX = fromPoint.x + factor * offset;
                    pointY = fromPoint.y;
                }
                if (graph.getCells(pointX - 10, pointY - 10, 100, 100).length == 0) {
                    return new mxPoint(pointX, pointY);
                }
                //判断2号选择点：右上角
                if (horizontal) {
                    pointX = (fromPoint.x + toPoint.x) / 2;
                    pointY = fromPoint.y + factor * offset;
                } else {
                    pointX = fromPoint.x + factor * offset;
                    pointY = (fromPoint.y + toPoint.y) / 2;
                }
                if (graph.getCells(pointX - 10, pointY - 10, 100, 100).length == 0) {
                    return new mxPoint(pointX, pointY);
                }
                //判断3号选择点：正下
                if (horizontal) {
                    pointX = fromPoint.x;
                    pointY = fromPoint.y - factor * offset;
                } else {
                    pointX = fromPoint.x - factor * offset;
                    pointY = fromPoint.y;
                }
                if (graph.getCells(pointX - 10, pointY - 10, 100, 100).length == 0) {
                    return new mxPoint(pointX, pointY);
                }
                //判断4号选择点：右下角
                if (horizontal) {
                    pointX = (fromPoint.x + toPoint.x) / 2;
                    pointY = fromPoint.y - factor * offset;
                } else {
                    pointX = fromPoint.x - factor * offset;
                    pointY = (fromPoint.y + toPoint.y) / 2;
                }
                if (graph.getCells(pointX - 10, pointY - 10, 100, 100).length == 0) {
                    return new mxPoint(pointX, pointY);
                }
            }
        };
        var verticePoint = computeVerticePointFunc(fromPoint, toPoint);
        v1 = graph.insertVertex(parent, null, createNode(3645704), verticePoint.x, verticePoint.y, 80, 80, 'image=../images/component-hand-icon.png');
        model.setTerminal(outgoingEdge, v1, true);
        // graph.insertEdge(parent, null, '',vertice , v1, 'strokeColor=blue');
        var e1 = graph.insertEdge(parent, null, '', vertice, v1);
        var e2 = graph.insertEdge(parent, null, '', v1, vertice);
        e1.getGeometry().points = [new mxPoint(verticePoint.x + 20, verticePoint.y + 80)];
        e2.getGeometry().points = [new mxPoint(verticePoint.x + 60, verticePoint.y + 80)];
    } finally {
        model.endUpdate();
    }
    graph.setSelectionCell(v1);
}


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
        default            :var comp = customNodeDef[nodeType];
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

module.exports = addNodeHandler