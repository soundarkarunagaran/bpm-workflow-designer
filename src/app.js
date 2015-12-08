/**
 * App entry
 */

var App = React.createClass({
	getInitialState() {
		return {
			test: 'tes'
		}
	},
	render() {
		return (<div> 
			hello app
		</div>)
	}
})

React.render(<App/>, document.getElementById('App'))