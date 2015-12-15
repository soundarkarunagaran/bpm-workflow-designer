var {
    mxConstants,
    mxEdgeStyle,
    mxPerimeter,
    mxUtils
} = window;


var BRAND_PRIMARY = '#00A0E8';
var BRAND_WARNING = '#FAC450';
var BRAND_DANGER = '#DD5826';
var BRAND_DEFAULT = 'whitesmoke';
var STATE_STYLE = {
    'DONE': {
        fill: 'aliceblue',
        textColor: BRAND_PRIMARY,
        stroke: BRAND_PRIMARY
    },
    'ACTIVE': {
        fill: BRAND_PRIMARY,
        stroke: BRAND_PRIMARY,
        textColor: 'white',
    },
    'TODO': {
        fill: BRAND_DEFAULT,
        stroke: '#666',
        textColor: '#666'
    },
    'WARNING': {
        fill: 'antiquewhite',
        stroke: BRAND_WARNING,
        textColor: '#938872'
    },
    'ERROR': {
        fill: '#FFF0F0',
        stroke: BRAND_DANGER,
        textColor: BRAND_DANGER
    }
};

/**
 * [dynamicStyleSetter description]
 * @param  {[type]} cell [description]
 * @return {[type]}      [description]
 */
function getDynamicStyle(cell, defaultStyle) {
	return defaultStyle
}
/** 
 * 设置流程图样式 
 * createDefaultVertexStyle	Creates and returns the default vertex style.
 * createDefaultEdgeStyle	Creates and returns the default edge style.
 * putDefaultVertexStyle	Sets the default style for vertices using defaultVertex as the stylename.
 * putDefaultEdgeStyle	Sets the default style for edges using defaultEdge as the stylename.
 * getDefaultVertexStyle	Returns the default style for vertices.
 * getDefaultEdgeStyle	Sets the default style for edges.
 * putCellStyle	Stores the given map of key, value pairs under the given name in styles.
 * getCellStyle
 *
 *  usage 
 *  model.setStyle(vertex, 'styleName')
 */
function configureStylesheet(graph) {
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
}

export default {
    getDynamicStyle,
    configureStylesheet,
    STATE_STYLE
}