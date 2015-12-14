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
    /**
     * test group style
     */
     style = {};
     style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
     style[mxConstants.STYLE_OPACITY] = '50',
     style[mxConstants.STYLE_FILLCOLOR] = 'aliceblue'; //'#ffdd33';
     style[mxConstants.STYLE_STROKECOLOR] = '#E6EBEF';
     graph.getStylesheet().putCellStyle('layoutBackground', style);
    /**
     * group style
     * @type {Object}
     */
    style = {};
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

    /**
     * default vertex style
     * @type {[type]}
     */
    var style = graph.getStylesheet().getDefaultVertexStyle();
    // style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
    style[mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'none';
    style[mxConstants.STYLE_FONTSIZE] = 11;
    style[mxConstants.STYLE_STARTSIZE] = 30;
    // style[mxConstants.STYLE_HORIZONTAL] = false;
    style[mxConstants.STYLE_FONTCOLOR] = '#333';
    style[mxConstants.STYLE_STROKECOLOR] = '#ccc';
    style[mxConstants.STYLE_FILLCOLOR] = STATE_STYLE.TODO.fill;

    /**
     * process style
     * @type {[type]}
     */
    style = mxUtils.clone(style);
    // style[mxConstants.STYLE_FILLCOLOR] = 'none';
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
    style[mxConstants.STYLE_FONTSIZE] = 10;
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_HORIZONTAL] = true;
    style[mxConstants.STYLE_ARCSIZE] = 55;
    style[mxConstants.STYLE_STROKECOLOR] = STATE_STYLE.TODO.stroke;
    // style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
    style[mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
    delete style[mxConstants.STYLE_STARTSIZE];
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'none';
    graph.getStylesheet().putCellStyle('process', style);
    
    /**
     * state style
     * @type {[type]}
     */
    style = mxUtils.clone(style);
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
    delete style[mxConstants.STYLE_ROUNDED];
    style[mxConstants.STYLE_STROKEWIDTH] = 2;
    graph.getStylesheet().putCellStyle('state', style);
    
    /**
     * condition style
     * @type {[type]}
     */
    style = mxUtils.clone(style);
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RhombusPerimeter;
    style[mxConstants.STYLE_VERTICAL_ALIGN] = 'top';
    style[mxConstants.STYLE_SPACING_TOP] = 40;
    style[mxConstants.STYLE_SPACING_RIGHT] = 64;
    graph.getStylesheet().putCellStyle('condition', style);

    /**
     * end node style
     * @type {[type]}
     */
    style = mxUtils.clone(style);
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_DOUBLE_ELLIPSE;
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
    style[mxConstants.STYLE_SPACING_TOP] = 28;
    style[mxConstants.STYLE_FONTSIZE] = 14;
    style[mxConstants.STYLE_FONTSTYLE] = 1;
    style[mxConstants.STYLE_STROKEWIDTH] = 2;
    style[mxConstants.STYLE_FILLCOLOR] = 'whitesmoke';
    delete style[mxConstants.STYLE_SPACING_RIGHT];
    graph.getStylesheet().putCellStyle('end', style);

    /**
     * default edge style
     * @type {[type]}
     */
    style = graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
    style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_BLOCK;
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_FONTCOLOR] = 'black';
    style[mxConstants.STYLE_STROKECOLOR] = 'black';

    /**
     * default crossover style
     * @type {[type]}
     */
    style = mxUtils.clone(style);
    style[mxConstants.STYLE_DASHED] = true;
    style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_OPEN;
    style[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_OVAL;
    graph.getStylesheet().putCellStyle('crossover', style);

    /**
     * edge style
     * @type {[type]}
     */
    style = graph.stylesheet.getDefaultEdgeStyle();
    style[mxConstants.STYLE_STROKEWIDTH] = '2';
    style[mxConstants.STYLE_STROKECOLOR] = '#aaa';
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_EDGE] =  mxEdgeStyle.ElbowConnector;

    ['process', 'state', 'end', 'defaultVertex', 'layoutBackground'].forEach(styleSheetStates);

    /**
     * [styleSheetStates 在各种状态下面的stylesheet]
     * @return {[type]} [description]
     */
    function styleSheetStates(name) {
        var states = ['ACTIVE', 'DONE', 'WARNING', 'ERROR', 'TODO'];
        var defaultStyle = graph.stylesheet.styles[name];
        // console.log(graph.stylesheet.styles);
        states.forEach(function(state) {
            var style = mxUtils.clone(defaultStyle);
            var sheet = STATE_STYLE[state];

            if (name === 'layoutBackground' && state === 'ACTIVE' ) {
                sheet = STATE_STYLE['DONE'];
            }

            style[mxConstants.STYLE_FILLCOLOR] = sheet.fill;
            style[mxConstants.STYLE_STROKECOLOR] = sheet.stroke;
            style[mxConstants.STYLE_FONTCOLOR] = sheet.textColor;

            if (name === 'layoutBackground' ) {
                style[mxConstants.STYLE_OPACITY] = '50';
                style[mxConstants.STYLE_STROKECOLOR] = 'none';
            }
            graph.getStylesheet().putCellStyle(name + '-' + state, style);
        });
    }    
}

export default {
    getDynamicStyle,
    configureStylesheet,
    STATE_STYLE
};