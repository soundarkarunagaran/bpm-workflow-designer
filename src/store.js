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
	},
	getState: function() {
		return this.data
	},
	loadPageData: function() {
		this.data.flowList = service.getFlowList()
		this.data.loading = false
		this.emit('change')
	}

})
module.exports = Store