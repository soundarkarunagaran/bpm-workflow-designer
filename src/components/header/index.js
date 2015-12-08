/**
 * Top Header
 */

var Header = React.createClass({
	render() {
		return (
			<header className="app-header block align-items-stretch">
				<div className="block shrink center brand-logo-container">
					workflow
				</div>
				<div className="block menu-container content">
					menus
				</div>
			</header>
		)
	}
})

module.exports = Header