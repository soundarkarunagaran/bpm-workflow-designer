/**
 * editor actions
 */

var addNode = require('./addNode')

function initActions(diagram) {
	var editor = diagram.editor
	var graph = diagram.graph
	editor.addAction('addnode', addNode)
	// editor.addAction('export', exportGraph)
	// editor.addAction('save', saveGraph)
	// editor.addAction('deploy', deployGraph)
}

module.exports = initActions
