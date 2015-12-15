/**
 * app store
 */
var Fluxxor = require("fluxxor")

var Store = Fluxxor.createStore({
	initialize: function() {
		this.data = {
			flowList: null,
			currentFlow: null,
			loading: false
		}
	},
	getState: function() {
		return this.data
	}

})
module.exports = Store