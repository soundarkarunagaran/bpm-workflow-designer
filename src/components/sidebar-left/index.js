/**
 * sidebar left
 */
import React from 'react'
import {Tree} from '../antd'
import velocity from 'velocity-animate'

var TreeNode = Tree.TreeNode

var Sidebar = React.createClass({
	render() {
		return (
			<sidebar className="app-sidebar-left">
				<div className="menu-block">
					<div className="menu-block-title">
						流程列表
					</div>
					<div className="menu-block-content">
						<FlowList />
					</div>
				</div>
			</sidebar>
		)
	}
})

var FlowList = React.createClass({
	render() {
		return (
			<div className="mtree">
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
        duration: 300,
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
            console.log('enter', node);
        return enter.apply(this, arguments);
    },
    appear(node) {
        console.log('appear', node);
        return enter.apply(this, arguments);
    },
    leave(node, done) {
        console.log('leave', node);
        let ok = false;

        function complete() {
            if (!ok) {
                ok = 1;
                done();
            }
        }
        node.style.display = 'block';
        velocity(node, 'slideUp', {
            duration: 300,
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