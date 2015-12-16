/**
 * app store
 */
var Fluxxor = require("fluxxor")
var service = require('./service')

var Store = Fluxxor.createStore({
	initialize: function() {
		this.data = {
			flowList: null,
			currentFlow: null,
			loading: true
		}
		this.loadPageData()
		this.bindActions('change-flow', this.changeFlow)
	},
	getState: function() {
		var d = this.data
		return {
			flowList: d.flowList,
			loading: d.loading,
			currentFlow: d.currentFlow
		}
	},
	loadPageData: function() {
		this.data.flowList = service.getFlowList()
		this.data.loading = false
		this.emit('change')
	},
	changeFlow: function(data) {
		this.data.currentFlow = {
			meta: data.flow,
			data: service.getFlow()
		}
		this.emit('change')
	}

})
module.exports = Store