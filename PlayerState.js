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

		_this.state = {
			day: 1,
			health: 0,
			academics: 0,
			fun: 0,
			healthInc: 0,
			academicsInc: 0,
			funInc: 0,
			dailyHours: 10
		};
		_this.handleStatsSubmit = _this.handleStatsSubmit.bind(_this);
		_this.handleHealthChange = _this.handleHealthChange.bind(_this);
		_this.handleAcademicsChange = _this.handleAcademicsChange.bind(_this);
		_this.handleFunChange = _this.handleFunChange.bind(_this);
		return _this;
	}

	_createClass(PlayerState, [{
		key: "handleHealthChange",
		value: function handleHealthChange(e) {
			if (e.target.value) {

				this.setState({ healthInc: parseInt(e.target.value) });
			} else {
				this.setState({ healthInc: 0 });
			}
		}
	}, {
		key: "handleAcademicsChange",
		value: function handleAcademicsChange(e) {
			if (e.target.value) {
				this.setState({ academicsInc: parseInt(e.target.value) });
			} else {
				this.setState({ academicsInc: 0 });
			}
		}
	}, {
		key: "handleFunChange",
		value: function handleFunChange(e) {
			if (e.target.value) {
				this.setState({ funInc: parseInt(e.target.value) });
			} else {
				this.setState({ funInc: 0 });
			}
		}
	}, {
		key: "nextDay",
		value: function nextDay() {
			this.setState(function (state) {
				return {
					day: state.day + 1
				};
			});
		}
	}, {
		key: "handleStatsSubmit",
		value: function handleStatsSubmit(e) {
			e.preventDefault();
			this.setState(function (state) {
				return {
					day: state.day + 1,
					health: state.health + state.healthInc,
					academics: state.academics + state.academicsInc,
					fun: state.fun + state.funInc
				};
			});
		}
	}, {
		key: "reset",
		value: function reset() {
			this.setState({
				healthInc: 0,
				academicsInc: 0,
				funInc: 0
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					null,
					React.createElement(
						"h3",
						null,
						"You have ",
						this.state.dailyHours - this.state.healthInc - this.state.academicsInc - this.state.funInc,
						" hour(s) left to allocate"
					)
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"form",
						{ onSubmit: this.handleStatsSubmit },
						React.createElement(
							"label",
							{ htmlFor: "health" },
							"Add Health Hours"
						),
						React.createElement("input", { step: "1", min: "0", max: this.state.dailyHours - this.state.academicsInc - this.state.funInc, onChange: this.handleHealthChange, name: "health", type: "number" }),
						React.createElement(
							"label",
							{ htmlFor: "academics" },
							"Add Academic Hours"
						),
						React.createElement("input", { step: "1", min: "0", max: this.state.dailyHours - this.state.healthInc - this.state.funInc, onChange: this.handleAcademicsChange, name: "academics", type: "number" }),
						React.createElement(
							"label",
							{ htmlFor: "fun" },
							"Add Fun Hours"
						),
						React.createElement("input", { step: "1", min: "0", max: this.state.dailyHours - this.state.healthInc - this.state.academicsInc, onChange: this.handleFunChange, name: "fun", type: "number" }),
						React.createElement(
							"button",
							null,
							"Next Day"
						)
					)
				),
				React.createElement(Display, { day: this.state.day, health: this.state.health, academics: this.state.academics, fun: this.state.fun })
			);
		}
	}]);

	return PlayerState;
}(React.Component);

var Display = function (_React$Component2) {
	_inherits(Display, _React$Component2);

	function Display(props) {
		_classCallCheck(this, Display);

		return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));
	}

	_createClass(Display, [{
		key: "render",
		value: function render() {
			var day = this.props.day;
			var health = this.props.health;
			var academics = this.props.academics;
			var fun = this.props.fun;
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
					day
				),
				React.createElement(
					"h3",
					null,
					"Health: ",
					health
				),
				React.createElement(
					"h3",
					null,
					"Academics: ",
					academics
				),
				React.createElement(
					"h3",
					null,
					"Fun: ",
					fun
				)
			);
		}
	}]);

	return Display;
}(React.Component);

var display = document.querySelector("#display");
ReactDOM.render(React.createElement(PlayerState, null), display);