"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerState = function (_React$Component) {
	_inherits(PlayerState, _React$Component);

	function PlayerState(props) {
		_classCallCheck(this, PlayerState);

		var _this = _possibleConstructorReturn(this, (PlayerState.__proto__ || Object.getPrototypeOf(PlayerState)).call(this, props));

		_this.day = 1;
		_this.health = 0;
		_this.academics = 0;
		_this.fun = 0;
		return _this;
	}

	_createClass(PlayerState, [{
		key: "updateHealth",
		value: function updateHealth(x) {
			this.health += x;
		}
	}, {
		key: "updateAcademics",
		value: function updateAcademics(x) {
			this.academics += x;
		}
	}, {
		key: "updateFun",
		value: function updateFun(x) {
			this.fun += x;
		}
	}, {
		key: "nextDay",
		value: function nextDay() {
			this.day += 1;
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h1",
					null,
					"GAME STATE"
				),
				React.createElement(
					"h2",
					null,
					"DAY ",
					this.day
				),
				React.createElement(
					"h3",
					null,
					"Health: ",
					this.health
				),
				React.createElement(
					"h3",
					null,
					"Academics: ",
					this.academics
				),
				React.createElement(
					"h3",
					null,
					"Fun: ",
					this.fun
				)
			);
		}
	}]);

	return PlayerState;
}(React.Component);

var display = document.querySelector("#display");
ReactDOM.render(React.createElement(PlayerState, null), display);