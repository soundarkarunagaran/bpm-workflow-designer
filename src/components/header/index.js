/**
 * Top Header
 */
var React = require('react')
var Header = React.createClass({
	render() {
		return (
			<header className="app-header block align-items-stretch">
				<div className="block shrink center brand-logo-container">
					workflow
				</div>
				<div className="block menu-container content">
					<Menu/>
				</div>
			</header>
		)
	}
})

var Menu = React.createClass({
	render() {
		return (
			<div className="menu-list">
				<div className="menu-item" data-action="undo">
					<a className="mbtn mbtn-circle mbtn-icon-only"> <i className="fa fa-arrow-left"></i></a>
				</div>
				<div className="menu-item" data-action="redo">
					<a className="mbtn mbtn-circle mbtn-icon-only"><i className="fa fa-arrow-right"></i></a>
				</div>
				<div className="menu-item" data-action="delete">
					<a className="mbtn mbtn-circle mbtn-icon-only"><i className="fa fa-trash"></i></a>
				</div>
				<div className="menu-gap"></div>
				<div className="menu-item icon-up" data-action="group">
					<i className="fa fa-object-group"></i> <br/>
					<label>分组</label>
				</div>
				<div className="menu-item icon-up" data-action="ungroup">
					<i className="fa fa-object-ungroup"></i> <br/>
					<label>取消分组</label>
				</div>
				<div className="menu-gap"></div>
				<div className="menu-item icon-up" data-action="cut">
					<i className="fa fa-cut"></i> <br/>
					<label>剪切</label>
				</div>
				<div className="menu-item icon-up" data-action="copy">
					<i className="fa fa-copy"></i> <br/>
					<label>复制</label>
				</div>
				<div className="menu-item icon-up" data-action="paste">
					<i className="fa fa-paste"></i> <br/>
					<label>粘贴</label>
				</div>
				<div className="menu-gap"></div>
				<div className="menu-item" data-action="show">
					<a className="mbtn mbtn-circle mbtn-icon-only"><i className="fa fa-eye"></i></a>
				</div>
				<div className="menu-gap"></div>
				<div className="menu-group pull-right">
					<div className="menu-item" data-action="export">
						<a className="mbtn mbtn-circle"> <i className="fa fa-send"/> 导出</a>
					</div>
					<div className="menu-item" data-action="deploy">
						<a className="mbtn mbtn-circle"> <i className="fa fa-rocket"/> 部署</a>
					</div>
					<div className="menu-item" data-action="save">
						<a className="mbtn mbtn-circle mbtn-primary "> <i className="fa fa-save"/> 保存</a>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = Header