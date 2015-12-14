/**
 * [export description]
 * @param  {[type]} editor [description]
 * @param  {[type]} cell   [description]
 * @return {[type]}        [description]
 */
function exportGraph(editor, cell) {
    var textarea = document.createElement('textarea');
    textarea.style.width = '400px';
    textarea.style.height = '400px';
    var enc = new mxCodec(mxUtils.createXmlDocument());
    var node = enc.encode(editor.graph.getModel());
    textarea.value = mxUtils.getPrettyXml(node);
    showModalWindow(graph, 'XML', textarea, 410, 440);
}

module.exports = exportGraph