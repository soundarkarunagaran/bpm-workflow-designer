/**
 * sidebar left
 */
import React from 'react'
import {Tree} from '../antd'
import velocity from 'velocity-animate'
var stencilsConfig = require('../graph-editor/stencils/config')
var TreeNode = Tree.TreeNode

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

/**
 * [Flowlist description]
 * @param  {[type]} {	render( [description]
 * @return {[type]}            [description]
 */
var FlowList = React.createClass({
	render() {
		return (
			<div className="flow-list">
				<Tree defaultExpandAll={false}
		          openAnimation={animation}>
		      <TreeNode title="parent 1" key="p1">
		        <TreeNode key="p10" title="leaf"/>
		        <TreeNode title="parent 1-1" key="p11">
		          <TreeNode title="parent 2-1" key="p21">
		            <TreeNode title="leaf"/>
		            <TreeNode title="leaf"/>
		          </TreeNode>
		          <TreeNode key="p22" title="leaf"/>
		        </TreeNode>
		      </TreeNode>
		    </Tree>
			</div>
		)
	}
})

/**
 * [Stencils description]
 * @param  {[type]} {	render( [description]
 * @return {[type]}            [description]
 */
var Stencils = React.createClass({
	render() {
		var _this = this 
		return (
			<div className="stencils">
				 {stencilsConfig.groups.map((group) => {
				 	return _this.renderGroup(group)
				 })}
			</div>
		)
	},
	renderGroup(group) {
		var _this = this
		return (<div className="stencil-group" key={group.name}>
					<div className="group-name">  
						<a className="mbtn mbtn-circle mbtn-icon-only mbtn-small">
							<i className="fa fa-minus"></i>
						</a>
						{group.name}
					</div>
					<div className="stencil-list">
						<ul>
							{group.stencils.map((it) => {
								return _this.renderItem(it)
							})}
						</ul>
					</div>
				</div>)
	},
	renderItem(it) {
		var stencils = stencilsConfig.stencils
		it = stencils[it]
		return (<li className="stencil-item" key={it.alias} data-alias={it.alias}>
				<image src={it.image}/> <br/>
				<label>{it.name}</label>
			</li>)
	}
})

function enter(node, done) {
    let ok = false;

    function complete() {
        if (!ok) {
            ok = 1;
            done();
        }
    }
    node.style.display = 'none';
    velocity(node, 'slideDown', {
        duration: 100,
        complete: complete,
    });
    return {
        stop: function() {
            velocity(node, 'finish');
            // velocity complete is async
            complete();
        },
    };
}
const animation = {
    enter(node) {
        return enter.apply(this, arguments);
    },
    appear(node) {
        return enter.apply(this, arguments);
    },
    leave(node, done) {
        let ok = false;
        function complete() {
            if (!ok) {
                ok = 1;
                done();
            }
        }
        node.style.display = 'block';
        velocity(node, 'slideUp', {
            duration: 100,
            complete: complete,
        });
        return {
            stop: function() {
                velocity(node, 'finish');
                // velocity complete is async
                complete();
            },
        };
    }
}

module.exports = Sidebar