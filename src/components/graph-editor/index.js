/**
 * 工作流图形显示器
 */
var React = require('react')
var ReactDOM = require('react-dom')

var Editor = require('./editor')

var GraphEditor = React.createClass({
	componentDidMount() {
		var $dom = ReactDOM.findDOMNode(this)
		var editor = new Editor({
			container: $dom
		})
		editor.render()
	},
	render() {
		return (
			<div className="graph-editor" style={{
				height: '100%',
				width: '100%'
			}}>

			</div>
		)
	}
})

module.exports = GraphEditor