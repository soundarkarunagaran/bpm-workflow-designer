(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * App entry
 */

var Header = require('./components/header')
var SidebarLeft = require('./components/sidebar-left')
var Playground = require('./components/playground')
var SidebarRight = require('./components/sidebar-right')

var App = React.createClass({displayName: "App",
	getInitialState() {
		return {
			test: 'tes'
		}
	},
	render() {
		return (React.createElement("div", {className: "app-container"}, 
			React.createElement(Header, null), 
			React.createElement("div", {className: "app-body"}, 
				React.createElement(SidebarLeft, null), 
				React.createElement(Playground, null), 
				React.createElement(SidebarRight, null)
			)
		))
	}
})

React.render(React.createElement(App, null), document.getElementById('App'))

},{"./components/header":2,"./components/playground":3,"./components/sidebar-left":4,"./components/sidebar-right":5}],2:[function(require,module,exports){
/**
 * Top Header
 */

var Header = React.createClass({displayName: "Header",
	render() {
		return (
			React.createElement("header", {className: "app-header block align-items-stretch"}, 
				React.createElement("div", {className: "block shrink center brand-logo-container"}, 
					"workflow"
				), 
				React.createElement("div", {className: "block menu-container content"}, 
					React.createElement(Menu, null)
				)
			)
		)
	}
})

var Menu = React.createClass({displayName: "Menu",
	render() {
		return (
			React.createElement("div", {className: "menu-list"}, 
				React.createElement("div", {className: "menu-item"}, 
					React.createElement("a", {className: "mbtn mbtn-circle mbtn-icon-only"}, " ", React.createElement("i", {className: "fa fa-arrow-left"}))
				), 
				React.createElement("div", {className: "menu-item"}, 
					React.createElement("a", {className: "mbtn mbtn-circle mbtn-icon-only"}, React.createElement("i", {className: "fa fa-arrow-right"}))
				), 
				React.createElement("div", {className: "menu-item"}, 
					React.createElement("a", {className: "mbtn mbtn-circle mbtn-icon-only"}, React.createElement("i", {className: "fa fa-trash"}))
				), 
				React.createElement("div", {className: "menu-gap"}), 
				React.createElement("div", {className: "menu-item icon-up"}, 
					React.createElement("i", {className: "fa fa-object-group"}), " ", React.createElement("br", null), 
					React.createElement("label", null, "分组")
				), 
				React.createElement("div", {className: "menu-item icon-up"}, 
					React.createElement("i", {className: "fa fa-object-ungroup"}), " ", React.createElement("br", null), 
					React.createElement("label", null, "取消分组")
				), 
				React.createElement("div", {className: "menu-gap"}), 
				React.createElement("div", {className: "menu-item icon-up"}, 
					React.createElement("i", {className: "fa fa-cut"}), " ", React.createElement("br", null), 
					React.createElement("label", null, "剪切")
				), 
				React.createElement("div", {className: "menu-item icon-up"}, 
					React.createElement("i", {className: "fa fa-copy"}), " ", React.createElement("br", null), 
					React.createElement("label", null, "复制")
				), 
				React.createElement("div", {className: "menu-item icon-up"}, 
					React.createElement("i", {className: "fa fa-paste"}), " ", React.createElement("br", null), 
					React.createElement("label", null, "粘贴")
				), 
				React.createElement("div", {className: "menu-gap"}), 
				React.createElement("div", {className: "menu-item"}, 
					React.createElement("a", {className: "mbtn mbtn-circle mbtn-icon-only"}, React.createElement("i", {className: "fa fa-eye"}))
				), 
				React.createElement("div", {className: "menu-gap"}), 
				React.createElement("div", {className: "menu-group pull-right"}, 
					React.createElement("div", {className: "menu-item"}, 
						React.createElement("a", {className: "mbtn mbtn-circle"}, " ", React.createElement("i", {className: "fa fa-send"}), " 导出")
					), 
					React.createElement("div", {className: "menu-item"}, 
						React.createElement("a", {className: "mbtn mbtn-circle"}, " ", React.createElement("i", {className: "fa fa-rocket"}), " 部署")
					), 
					React.createElement("div", {className: "menu-item"}, 
						React.createElement("a", {className: "mbtn mbtn-circle mbtn-primary "}, " ", React.createElement("i", {className: "fa fa-save"}), " 保存")
					)
				)
			)
		)
	}
})

module.exports = Header

},{}],3:[function(require,module,exports){
/**
 * playground
 */

var Playground = React.createClass({displayName: "Playground",
	render() {
		return (
			React.createElement("section", {className: "app-playground"}, 
				"playground"
			)
		)
	}
})

module.exports = Playground

},{}],4:[function(require,module,exports){
/**
 * sidebar left
 */

var Sidebar = React.createClass({displayName: "Sidebar",
	render() {
		return (
			React.createElement("sidebar", {className: "app-sidebar-left"}, 
				"sidebar-left"
			)
		)
	}
})

module.exports = Sidebar

},{}],5:[function(require,module,exports){
/**
 * sidebar left
 */

var Sidebar = React.createClass({displayName: "Sidebar",
	render() {
		return (
			React.createElement("sidebar", {className: "app-sidebar-right"}, 
				"sidebar-right"
			)
		)
	}
})

module.exports = Sidebar

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZG1pbi93d3cvaWRjb3Mvd29ya2Zsb3ctZGVzaWduZXIvYnBtLXdvcmtmbG93LWRlc2lnbmVyL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9hZG1pbi93d3cvaWRjb3Mvd29ya2Zsb3ctZGVzaWduZXIvYnBtLXdvcmtmbG93LWRlc2lnbmVyL3NyYy9hcHAuanMiLCIvVXNlcnMvYWRtaW4vd3d3L2lkY29zL3dvcmtmbG93LWRlc2lnbmVyL2JwbS13b3JrZmxvdy1kZXNpZ25lci9zcmMvY29tcG9uZW50cy9oZWFkZXIvaW5kZXguanMiLCIvVXNlcnMvYWRtaW4vd3d3L2lkY29zL3dvcmtmbG93LWRlc2lnbmVyL2JwbS13b3JrZmxvdy1kZXNpZ25lci9zcmMvY29tcG9uZW50cy9wbGF5Z3JvdW5kL2luZGV4LmpzIiwiL1VzZXJzL2FkbWluL3d3dy9pZGNvcy93b3JrZmxvdy1kZXNpZ25lci9icG0td29ya2Zsb3ctZGVzaWduZXIvc3JjL2NvbXBvbmVudHMvc2lkZWJhci1sZWZ0L2luZGV4LmpzIiwiL1VzZXJzL2FkbWluL3d3dy9pZGNvcy93b3JrZmxvdy1kZXNpZ25lci9icG0td29ya2Zsb3ctZGVzaWduZXIvc3JjL2NvbXBvbmVudHMvc2lkZWJhci1yaWdodC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLEdBQUc7O0FBRUgsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDO0FBQzNDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQztBQUN0RCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUM7QUFDbkQsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDOztBQUV4RCxJQUFJLHlCQUF5QixtQkFBQTtD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LENBQUMsU0FBQSxFQUFTLENBQUMsbUJBQW9CLENBQUEsRUFBQTtBQUFBLElBQUEsZUFBQTtBQUFBLEdBRTdCLENBQUE7R0FDVjtFQUNEO0FBQ0YsQ0FBQyxDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBBcHAgZW50cnlcbiAqL1xuXG52YXIgSGVhZGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2hlYWRlcicpXG52YXIgU2lkZWJhckxlZnQgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2lkZWJhci1sZWZ0JylcbnZhciBQbGF5Z3JvdW5kID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3BsYXlncm91bmQnKVxudmFyIFNpZGViYXJSaWdodCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9zaWRlYmFyLXJpZ2h0JylcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0ZXN0OiAndGVzJ1xuXHRcdH1cblx0fSxcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJhcHAtY29udGFpbmVyXCI+IFxuXHRcdFx0PEhlYWRlci8+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFwcC1ib2R5XCI+XG5cdFx0XHRcdDxTaWRlYmFyTGVmdCAvPlxuXHRcdFx0XHQ8UGxheWdyb3VuZCAvPlxuXHRcdFx0XHQ8U2lkZWJhclJpZ2h0IC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj4pXG5cdH1cbn0pXG5cblJlYWN0LnJlbmRlcig8QXBwLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBcHAnKSkiLCIvKipcbiAqIFRvcCBIZWFkZXJcbiAqL1xuXG52YXIgSGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxoZWFkZXIgY2xhc3NOYW1lPVwiYXBwLWhlYWRlciBibG9jayBhbGlnbi1pdGVtcy1zdHJldGNoXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYmxvY2sgc2hyaW5rIGNlbnRlciBicmFuZC1sb2dvLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdHdvcmtmbG93XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJsb2NrIG1lbnUtY29udGFpbmVyIGNvbnRlbnRcIj5cblx0XHRcdFx0XHQ8TWVudS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9oZWFkZXI+XG5cdFx0KVxuXHR9XG59KVxuXG52YXIgTWVudSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtbGlzdFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtaXRlbVwiPlxuXHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cIm1idG4gbWJ0bi1jaXJjbGUgbWJ0bi1pY29uLW9ubHlcIj4gPGkgY2xhc3NOYW1lPVwiZmEgZmEtYXJyb3ctbGVmdFwiPjwvaT48L2E+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtaXRlbVwiPlxuXHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cIm1idG4gbWJ0bi1jaXJjbGUgbWJ0bi1pY29uLW9ubHlcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1hcnJvdy1yaWdodFwiPjwvaT48L2E+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtaXRlbVwiPlxuXHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cIm1idG4gbWJ0bi1jaXJjbGUgbWJ0bi1pY29uLW9ubHlcIj48aSBjbGFzc05hbWU9XCJmYSBmYS10cmFzaFwiPjwvaT48L2E+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtZ2FwXCI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVudS1pdGVtIGljb24tdXBcIj5cblx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1vYmplY3QtZ3JvdXBcIj48L2k+IDxici8+XG5cdFx0XHRcdFx0PGxhYmVsPuWIhue7hDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtaXRlbSBpY29uLXVwXCI+XG5cdFx0XHRcdFx0PGkgY2xhc3NOYW1lPVwiZmEgZmEtb2JqZWN0LXVuZ3JvdXBcIj48L2k+IDxici8+XG5cdFx0XHRcdFx0PGxhYmVsPuWPlua2iOWIhue7hDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtZ2FwXCI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVudS1pdGVtIGljb24tdXBcIj5cblx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1jdXRcIj48L2k+IDxici8+XG5cdFx0XHRcdFx0PGxhYmVsPuWJquWIhzwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtaXRlbSBpY29uLXVwXCI+XG5cdFx0XHRcdFx0PGkgY2xhc3NOYW1lPVwiZmEgZmEtY29weVwiPjwvaT4gPGJyLz5cblx0XHRcdFx0XHQ8bGFiZWw+5aSN5Yi2PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVudS1pdGVtIGljb24tdXBcIj5cblx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1wYXN0ZVwiPjwvaT4gPGJyLz5cblx0XHRcdFx0XHQ8bGFiZWw+57KY6LS0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVudS1nYXBcIj48L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZW51LWl0ZW1cIj5cblx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJtYnRuIG1idG4tY2lyY2xlIG1idG4taWNvbi1vbmx5XCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtZXllXCI+PC9pPjwvYT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVudS1nYXBcIj48L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZW51LWdyb3VwIHB1bGwtcmlnaHRcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtaXRlbVwiPlxuXHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwibWJ0biBtYnRuLWNpcmNsZVwiPiA8aSBjbGFzc05hbWU9XCJmYSBmYS1zZW5kXCIvPiDlr7zlh7o8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZW51LWl0ZW1cIj5cblx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cIm1idG4gbWJ0bi1jaXJjbGVcIj4gPGkgY2xhc3NOYW1lPVwiZmEgZmEtcm9ja2V0XCIvPiDpg6jnvbI8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZW51LWl0ZW1cIj5cblx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cIm1idG4gbWJ0bi1jaXJjbGUgbWJ0bi1wcmltYXJ5IFwiPiA8aSBjbGFzc05hbWU9XCJmYSBmYS1zYXZlXCIvPiDkv53lrZg8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlciIsIi8qKlxuICogcGxheWdyb3VuZFxuICovXG5cbnZhciBQbGF5Z3JvdW5kID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxzZWN0aW9uIGNsYXNzTmFtZT1cImFwcC1wbGF5Z3JvdW5kXCI+XG5cdFx0XHRcdHBsYXlncm91bmRcblx0XHRcdDwvc2VjdGlvbj5cblx0XHQpXG5cdH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWdyb3VuZCIsIi8qKlxuICogc2lkZWJhciBsZWZ0XG4gKi9cblxudmFyIFNpZGViYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PHNpZGViYXIgY2xhc3NOYW1lPVwiYXBwLXNpZGViYXItbGVmdFwiPlxuXHRcdFx0XHRzaWRlYmFyLWxlZnRcblx0XHRcdDwvc2lkZWJhcj5cblx0XHQpXG5cdH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gU2lkZWJhciIsIi8qKlxuICogc2lkZWJhciBsZWZ0XG4gKi9cblxudmFyIFNpZGViYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PHNpZGViYXIgY2xhc3NOYW1lPVwiYXBwLXNpZGViYXItcmlnaHRcIj5cblx0XHRcdFx0c2lkZWJhci1yaWdodFxuXHRcdFx0PC9zaWRlYmFyPlxuXHRcdClcblx0fVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBTaWRlYmFyIl19
