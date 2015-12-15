import React from 'react'
import {Tree} from '../antd'
import velocity from 'velocity-animate'

var TreeNode = Tree.TreeNode

/**
 * [Flowlist description]
 * @param  {[type]} {	render( [description]
 * @return {[type]}            [description]
 */
var FlowList = React.createClass({
	render() {
        var data = this.props.data
        var flowList = data.flowList
		return (
			<div className="flow-list">
				<Tree 
                    defaultExpandAll={false}
		            openAnimation={animation}>
    		        {this.renderTreeNode(flowList)}
    		    </Tree>
			</div>
		)
	},
    renderTreeNode(node) {
        if (!node) {
            return null
        }
        var _this = this
        var children = node.children
        if (children && children.length > 0) {
            return (<TreeNode title={node.name} key={node.id} expanded={true}>
                        {children.map((node) => {
                            return _this.renderTreeNode(node)
                        })}
                    </TreeNode>)
        } else {
            return <TreeNode title={node.name} key={node.id}/>
        }
    }
})


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

/**
 * [enter description]
 * @param  {[type]}   node [description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
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
module.exports = FlowList