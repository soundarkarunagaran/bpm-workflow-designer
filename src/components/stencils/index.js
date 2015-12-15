import React from 'react'
import velocity from 'velocity-animate'
var stencilsConfig = require('../graph-editor/flow-graph/stencils/config')

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

module.exports= Stencils