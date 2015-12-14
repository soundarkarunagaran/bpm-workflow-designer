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
		
		/**
		 * 1. 初始化 添加 节点拖拽事件 
		 * 2. 缩略图 逻辑 
		 * 3. 根据工具栏 操作 添加 actions
		 * 4. 
		 */
	},
	showModal() {
		// 模态框显示
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