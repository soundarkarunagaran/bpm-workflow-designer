/**
 * sidebar left
 */
import React from 'react'
import FlowList from '../flow-list'
import Stencils from '../stencils' 
import { Menu, Dropdown, Button, Icon } from '../antd';

var Sidebar = React.createClass({
	render() {
		var data = this.props.data
		return (
			<sidebar className="app-sidebar-left">
				<div className="menu-block ">
					<div className="menu-block-title">
						流程列表 <NewFlowDropdown/>
					</div>
					<div className="menu-block-content">
						<FlowList data={data}/>
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

var NewFlowDropdown = React.createClass({
	render() {
		const menu = (<Menu>
						<Menu.Item key="0">
						    <a href="">新建</a>
						</Menu.Item>
						<Menu.Item key="1">
						    <a href="">导入</a>
						</Menu.Item>
					</Menu>)
		return (
			<Dropdown overlay={menu}>
			    <Button>
			       <Icon type="plus" />
			    </Button>
			</Dropdown>
		)
	}
})

module.exports = Sidebar