/**
 * App entry
 */
var React = require('react')
var ReactDOM = require('react-dom')
var Header = require('./components/header')
var SidebarLeft = require('./components/sidebar-left')
var Playground = require('./components/playground')
var SidebarRight = require('./components/sidebar-right')

var Fluxxor = require('fluxxor')
var AppStore = require('./store')
var AppAction = require('./action')
var flux = new Fluxxor.Flux({
	    AppStore: new AppStore()
	}, AppAction)

var App = React.createClass({
	mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("AppStore")],
	getStateFromFlux() {
        var flux = this.getFlux()
        return flux.store('AppStore').getState()
    },
	getInitialState() {
		return {
			test: 'tesz'
		}
	},
	render() {
		var data = this.state 
		return (<div className="app-container"> 
			<Header/>
			<div className="app-body">
				<SidebarLeft data={data}/>
				<Playground currentFlow={data.currentFlow}/>
				<SidebarRight currentNode={data.currentNode}/>
			</div>
		</div>)
	}
})

ReactDOM.render(<App flux={flux}/>, document.getElementById('App'))