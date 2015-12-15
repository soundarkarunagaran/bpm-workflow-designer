/**
 * action
 */
var actions = {
	dispatch(type, data) {
		this.dispatch(type, data);
	},
	selectPage(page) {
		self.dispatch('loadAppData', data);
	}
};

module.exports = actions