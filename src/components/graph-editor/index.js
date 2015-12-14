/**
 * 工作流图形显示器
 */
var React = require('react')
var ReactDOM = require('react-dom')

var FlowGraph = require('./flow-graph')

var GraphEditor = React.createClass({
	componentDidMount() {
		var $dom = ReactDOM.findDOMNode(this)
		var flowGraph = new FlowGraph({
			container: $dom
		})
		flowGraph.render()
		
		/**
		 * 1. 根据工具栏 操作 添加 actions
		 * 2. 初始化 添加事件 
		 * 3. 缩略图 逻辑 
		 */
		
		$('header .menu-list').delegate('.menu-item', 'click', function(ev) {
			var $target = $(this)
			var action = $target.attr('data-action')
			flowGraph.editor.execute(action)	
		})
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