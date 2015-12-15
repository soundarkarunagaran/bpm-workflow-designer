/**
 * sidebar left
 */
import React from 'react'
import FlowList from '../flow-list'
import Stencils from '../stencils' 

var Sidebar = React.createClass({
	render() {
		return (
			<sidebar className="app-sidebar-left">
				<div className="menu-block ">
					<div className="menu-block-title">
						流程列表
					</div>
					<div className="menu-block-content">
						<FlowList />
					</div>
				</div>
				<div className="menu-block">
					<div className="menu-block-title">
						控件（Stencil）
					</div>
					<div className="menu-block-content">
						<Stencils/>
					</div>
				</div>
			</sidebar>
		)
	}
})

module.exports = Sidebar