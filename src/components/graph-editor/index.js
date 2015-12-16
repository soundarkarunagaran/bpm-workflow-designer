/**
 * 工作流图形显示器
 */
var React = require('react')
var ReactDOM = require('react-dom')

var FlowGraph = require('./flow-graph')

var GraphEditor = React.createClass({
	componentWillReceiveProps(props) {
		this.flowGraph.update(props.currentFlow)
	},
	shouldComponentUpdate(nextProps, nextState) {
		return false
	},
	componentDidMount() {
		var currentFlow = this.props.currentFlow 
		var $dom = ReactDOM.findDOMNode(this)

		var flowGraph = this.flowGraph = new FlowGraph({
			container: $dom,
			currentFlow: currentFlow
		})

		// flowGraph.render()
		
		/**
		 * 根据工具栏 操作 添加 actions
		 */
		$('header .menu-list').delegate('.menu-item', 'click', function(ev) {
			var $target = $(this)
			var action = $target.attr('data-action')
			flowGraph.editor.execute(action)	
		})

		/**
		 *  stencils 添加
		 */
		var stencils = $('.stencil-list .stencil-item') 
		stencils.each(function(index, it) {
			var $it = $(it)
			var nodeType = $(it).attr('data-alias')
			var img = $(it).find('img')
			var dragEl = $('<img/>')

			dragEl.attr('src', img.attr('src'))
			dragEl.css({
				width: '80px',
				height: '80px',
				opacity: 0.5
			})

			flowGraph.makeStencil(img[0], dragEl[0], nodeType)
		})
		
	},
	render() {
		return (
			<div className="graph-editor" style={{
				height: '100%',
				width: '100%',
				overflow: 'scroll'
			}}>
			</div>
		)
	}
})

module.exports = GraphEditor