/**
 * playground
 */
var React = require('react')
var GraphEditor = require('../graph-editor')

var Playground = React.createClass({
	render() {
		return (
			<section className="app-playground">
				<GraphEditor currentFlow={this.props.currentFlow}/>
			</section>
		)
	}
})

module.exports = Playground