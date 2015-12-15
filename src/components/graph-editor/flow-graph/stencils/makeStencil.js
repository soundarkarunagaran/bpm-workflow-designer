import createNode from './createNode'

/**
 * [makeStencil description]
 * @param  {[type]} image    [description]
 * @param  {[type]} nodeType [description]
 * @return {[type]}          [description]
 */
function makeStencil(img, dragEl, nodeType) {
    var graph = this.graph
    var node = createNode(nodeType)
        /**
         * 当图片被拖放到画布上时的执行函数
         * graph 画布 
         * evt   触发的事件
         * cell  目标节点
         * x|y   当前坐标
         */
    var funct = function(graph, evt, cell, x, y) {
        /** 是否新建流程图，是才允许添加组件到画布 */
        // if (templateObject == null) {
        //     alert("请先新建或选择流程定义再添加控件!");
        //     return;
        // }
        /** 节点合法性检查 */
        if (doValid(graph, nodeType)) {
            var parent = null;
            var model = graph.getModel();
            var v1 = null;
            model.beginUpdate();
            try {
                /**
                 * 如果目标是泳道，则将新节点父节点设置为该泳道
                 * 同时设置添加节点坐标为相对泳道的坐标
                 * 否则将新节点父节点设置为根节点
                 */
                if (graph.isSwimlane(cell)) {
                    parent = cell;
                    x -= cell.geometry.x;
                    y -= cell.geometry.y;
                } else {
                    parent = graph.getDefaultParent();
                }
                /**
                 * 如果添加节点类型为容器.设置其样式为group.并设置节点折叠大小
                 * 否则设置应用默认节点样式
                 */
                if (nodeType != "container") {
                    v1 = graph.insertVertex(parent, null, createNode(nodeType), x, y, 80, 80, 'image=' + img.src);
                } else {
                    v1 = graph.insertVertex(parent, null, createNode(nodeType), x, y, 80, 80, 'group');
                    v1.geometry.alternateBounds = new mxRectangle(0, 0, 80, 40);
                    v1.setConnectable(false);
                }
            } finally {
                model.endUpdate();
            }
            graph.setSelectionCell(v1);
        } else {
            alert('添加的节点不符合唯一性规则！');
        }
    };

    /**
     * [doValid description]
     * @param  {[type]} graph    [description]
     * @param  {[type]} nodeType [description]
     * @return {[type]}          [description]
     */
    function doValid(graph, nodeType) {
        if (nodeType == 'StartNode' || nodeType == 'EndNode') {
            return checkUniq(graph.getDefaultParent(), nodeType);
        }
        return true;
    }

    /**
     * [checkUniq description]
     * @param  {[type]} parent   [description]
     * @param  {[type]} nodeType [description]
     * @return {[type]}          [description]
     */
    function checkUniq(parent, nodeType) {
        var cells = graph.getChildVertices(parent);
        for (var i = 0; i < cells.length; i++) {
            if (graph.isSwimlane(cells[i])) {
                return checkUniq(cells[i], nodeType);
            } else {
                if (cells[i].value.nodeName == nodeType) {
                    return false;
                }
            }
        }
        return true;
    };

    var ds = mxUtils.makeDraggable(img, graph, funct, dragEl, 0, 0, true, true);
    ds.setGuidesEnabled(true);
}
module.exports = makeStencil