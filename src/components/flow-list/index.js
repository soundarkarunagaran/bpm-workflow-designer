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