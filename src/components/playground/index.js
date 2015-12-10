/**
 * playground
 */
var React = require('react')
var GraphEditor = require('../graph-editor')

var Playground = React.createClass({
	render() {
		return (
			<section className="app-playground">
				<GraphEditor/>
			</section>
		)
	}
})

module.exports = Playground