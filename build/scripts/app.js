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
					"menus"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZG1pbi93d3cvaWRjb3Mvd29ya2Zsb3ctZGVzaWduZXIvYnBtLXdvcmtmbG93LWRlc2lnbmVyL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9hZG1pbi93d3cvaWRjb3Mvd29ya2Zsb3ctZGVzaWduZXIvYnBtLXdvcmtmbG93LWRlc2lnbmVyL3NyYy9hcHAuanMiLCIvVXNlcnMvYWRtaW4vd3d3L2lkY29zL3dvcmtmbG93LWRlc2lnbmVyL2JwbS13b3JrZmxvdy1kZXNpZ25lci9zcmMvY29tcG9uZW50cy9oZWFkZXIvaW5kZXguanMiLCIvVXNlcnMvYWRtaW4vd3d3L2lkY29zL3dvcmtmbG93LWRlc2lnbmVyL2JwbS13b3JrZmxvdy1kZXNpZ25lci9zcmMvY29tcG9uZW50cy9wbGF5Z3JvdW5kL2luZGV4LmpzIiwiL1VzZXJzL2FkbWluL3d3dy9pZGNvcy93b3JrZmxvdy1kZXNpZ25lci9icG0td29ya2Zsb3ctZGVzaWduZXIvc3JjL2NvbXBvbmVudHMvc2lkZWJhci1sZWZ0L2luZGV4LmpzIiwiL1VzZXJzL2FkbWluL3d3dy9pZGNvcy93b3JrZmxvdy1kZXNpZ25lci9icG0td29ya2Zsb3ctZGVzaWduZXIvc3JjL2NvbXBvbmVudHMvc2lkZWJhci1yaWdodC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLEdBQUc7O0FBRUgsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDO0FBQzNDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQztBQUN0RCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUM7QUFDbkQsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDOztBQUV4RCxJQUFJLHlCQUF5QixtQkFBQTtDQUM1QixlQUFlLEdBQUc7RUFDakIsT0FBTztHQUNOLElBQUksRUFBRSxLQUFLO0dBQ1g7RUFDRDtDQUNELE1BQU0sR0FBRztFQUNSLFFBQVEsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxlQUFnQixDQUFBLEVBQUE7R0FDdEMsb0JBQUMsTUFBTSxFQUFBLElBQUUsQ0FBQSxFQUFBO0dBQ1Qsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxVQUFXLENBQUEsRUFBQTtJQUN6QixvQkFBQyxXQUFXLEVBQUEsSUFBQSxDQUFHLENBQUEsRUFBQTtJQUNmLG9CQUFDLFVBQVUsRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFBO0lBQ2Qsb0JBQUMsWUFBWSxFQUFBLElBQUEsQ0FBRyxDQUFBO0dBQ1gsQ0FBQTtFQUNELENBQUEsQ0FBQztFQUNQO0FBQ0YsQ0FBQyxDQUFDOztBQUVGLEtBQUssQ0FBQyxNQUFNLENBQUMsb0JBQUMsR0FBRyxFQUFBLElBQUUsQ0FBQSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDOzs7QUMzQm5EOztBQUVBLEdBQUc7O0FBRUgsSUFBSSw0QkFBNEIsc0JBQUE7Q0FDL0IsTUFBTSxHQUFHO0VBQ1I7R0FDQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLHNDQUF1QyxDQUFBLEVBQUE7SUFDeEQsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQywwQ0FBMkMsQ0FBQSxFQUFBO0FBQUEsS0FBQSxVQUFBO0FBQUEsSUFFcEQsQ0FBQSxFQUFBO0lBQ04sb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyw4QkFBK0IsQ0FBQSxFQUFBO0FBQUEsS0FBQSxPQUFBO0FBQUEsSUFFeEMsQ0FBQTtHQUNFLENBQUE7R0FDVDtFQUNEO0FBQ0YsQ0FBQyxDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUc7OztBQ25CakI7O0FBRUEsR0FBRzs7QUFFSCxJQUFJLGdDQUFnQywwQkFBQTtDQUNuQyxNQUFNLEdBQUc7RUFDUjtHQUNDLG9CQUFBLFNBQVEsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsZ0JBQWlCLENBQUEsRUFBQTtBQUFBLElBQUEsWUFBQTtBQUFBLEdBRTFCLENBQUE7R0FDVjtFQUNEO0FBQ0YsQ0FBQyxDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUc7OztBQ2RqQjs7QUFFQSxHQUFHOztBQUVILElBQUksNkJBQTZCLHVCQUFBO0NBQ2hDLE1BQU0sR0FBRztFQUNSO0dBQ0Msb0JBQUEsU0FBUSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxrQkFBbUIsQ0FBQSxFQUFBO0FBQUEsSUFBQSxjQUFBO0FBQUEsR0FFNUIsQ0FBQTtHQUNWO0VBQ0Q7QUFDRixDQUFDLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRzs7O0FDZGpCOztBQUVBLEdBQUc7O0FBRUgsSUFBSSw2QkFBNkIsdUJBQUE7Q0FDaEMsTUFBTSxHQUFHO0VBQ1I7R0FDQyxvQkFBQSxTQUFRLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLG1CQUFvQixDQUFBLEVBQUE7QUFBQSxJQUFBLGVBQUE7QUFBQSxHQUU3QixDQUFBO0dBQ1Y7RUFDRDtBQUNGLENBQUMsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQXBwIGVudHJ5XG4gKi9cblxudmFyIEhlYWRlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9oZWFkZXInKVxudmFyIFNpZGViYXJMZWZ0ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3NpZGViYXItbGVmdCcpXG52YXIgUGxheWdyb3VuZCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9wbGF5Z3JvdW5kJylcbnZhciBTaWRlYmFyUmlnaHQgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2lkZWJhci1yaWdodCcpXG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGVzdDogJ3Rlcydcblx0XHR9XG5cdH0sXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwiYXBwLWNvbnRhaW5lclwiPiBcblx0XHRcdDxIZWFkZXIvPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhcHAtYm9keVwiPlxuXHRcdFx0XHQ8U2lkZWJhckxlZnQgLz5cblx0XHRcdFx0PFBsYXlncm91bmQgLz5cblx0XHRcdFx0PFNpZGViYXJSaWdodCAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+KVxuXHR9XG59KVxuXG5SZWFjdC5yZW5kZXIoPEFwcC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQXBwJykpIiwiLyoqXG4gKiBUb3AgSGVhZGVyXG4gKi9cblxudmFyIEhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8aGVhZGVyIGNsYXNzTmFtZT1cImFwcC1oZWFkZXIgYmxvY2sgYWxpZ24taXRlbXMtc3RyZXRjaFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJsb2NrIHNocmluayBjZW50ZXIgYnJhbmQtbG9nby1jb250YWluZXJcIj5cblx0XHRcdFx0XHR3b3JrZmxvd1xuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJibG9jayBtZW51LWNvbnRhaW5lciBjb250ZW50XCI+XG5cdFx0XHRcdFx0bWVudXNcblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHQpXG5cdH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyIiwiLyoqXG4gKiBwbGF5Z3JvdW5kXG4gKi9cblxudmFyIFBsYXlncm91bmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PHNlY3Rpb24gY2xhc3NOYW1lPVwiYXBwLXBsYXlncm91bmRcIj5cblx0XHRcdFx0cGxheWdyb3VuZFxuXHRcdFx0PC9zZWN0aW9uPlxuXHRcdClcblx0fVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5Z3JvdW5kIiwiLyoqXG4gKiBzaWRlYmFyIGxlZnRcbiAqL1xuXG52YXIgU2lkZWJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8c2lkZWJhciBjbGFzc05hbWU9XCJhcHAtc2lkZWJhci1sZWZ0XCI+XG5cdFx0XHRcdHNpZGViYXItbGVmdFxuXHRcdFx0PC9zaWRlYmFyPlxuXHRcdClcblx0fVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBTaWRlYmFyIiwiLyoqXG4gKiBzaWRlYmFyIGxlZnRcbiAqL1xuXG52YXIgU2lkZWJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8c2lkZWJhciBjbGFzc05hbWU9XCJhcHAtc2lkZWJhci1yaWdodFwiPlxuXHRcdFx0XHRzaWRlYmFyLXJpZ2h0XG5cdFx0XHQ8L3NpZGViYXI+XG5cdFx0KVxuXHR9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZGViYXIiXX0=
