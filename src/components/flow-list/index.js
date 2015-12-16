import React from 'react'
import {Tree, Modal} from '../antd'
import velocity from 'velocity-animate'
import Fluxxor from 'fluxxor'

const confirm = Modal.confirm

var TreeNode = Tree.TreeNode
/**
 * [Flowlist description]
 * @param  {[type]} {	render( [description]
 * @return {[type]}            [description]
 */
var FlowList = React.createClass({
    mixins: [Fluxxor.FluxMixin(React)],
	render() {
        var flowList = this.props.data.flowList
        var rootId = flowList.rootId
        var flowHash = flowList.hash
        var tree = flowHash[rootId]
		return (
			<div className="flow-list">
				<Tree 
                    defaultExpandAll={false}
                    onSelect={this.onSelect}
		            openAnimation={animation}>
    		        {this.renderTreeNode(tree)}
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
    },
    onSelect(ev) {
        var _this = this
        var flowHash = this.props.data.flowList.hash
        var currentFlow = this.props.data.currentFlow
        var selectId = ev.selectedKeys[0] 

        var flow = flowHash[selectId]
        if (!flow) {
            return 
        }

        if (flow.children && flow.children.length > 0) {
            return 
        }

        if (currentFlow) {
            confirm({
                title: '您正在编辑' + currentFlow.name + '，是否要替换为' + flow.name + '?',
                content: '',
                onOk: function() {
                    dispatch()
                },
                onCancel: function() {}
            })
        } else {
            dispatch()
        }

        function dispatch() {
            var flux = _this.getFlux()
            flux.actions.dispatch('change-flow', {
                flow: flow 
            })
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