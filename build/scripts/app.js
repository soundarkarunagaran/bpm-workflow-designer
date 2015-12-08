(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * App entry
 */

var App = React.createClass({displayName: "App",
	getInitialState() {
		return {
			test: 'tes'
		}
	},
	render() {
		return (React.createElement("div", null, 
			"hello app"
		))
	}
})

React.render(React.createElement(App, null), document.getElementById('App'))

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZG1pbi93d3cvaWRjb3Mvd29ya2Zsb3ctZGVzaWduZXIvYnBtLXdvcmtmbG93LWRlc2lnbmVyL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9hZG1pbi93d3cvaWRjb3Mvd29ya2Zsb3ctZGVzaWduZXIvYnBtLXdvcmtmbG93LWRlc2lnbmVyL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxHQUFHOztBQUVILElBQUkseUJBQXlCLG1CQUFBO0NBQzVCLGVBQWUsR0FBRztFQUNqQixPQUFPO0dBQ04sSUFBSSxFQUFFLEtBQUs7R0FDWDtFQUNEO0NBQ0QsTUFBTSxHQUFHO0VBQ1IsUUFBUSxvQkFBQSxLQUFJLEVBQUEsSUFBQyxFQUFBO0FBQUEsR0FBQSxXQUFBO0FBQUEsRUFFUCxDQUFBLENBQUM7RUFDUDtBQUNGLENBQUMsQ0FBQzs7QUFFRixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEdBQUcsRUFBQSxJQUFFLENBQUEsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEFwcCBlbnRyeVxuICovXG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGVzdDogJ3Rlcydcblx0XHR9XG5cdH0sXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKDxkaXY+IFxuXHRcdFx0aGVsbG8gYXBwXG5cdFx0PC9kaXY+KVxuXHR9XG59KVxuXG5SZWFjdC5yZW5kZXIoPEFwcC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQXBwJykpIl19
