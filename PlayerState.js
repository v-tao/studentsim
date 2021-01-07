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
			displayStartScreen: true,
			displayGame: false,
			numClasses: 4,
			day: 1,
			health: 0,
			academics: 0,
			fun: 0,
			healthInc: 0,
			academicsInc: 0,
			funInc: 0,
			dailyHours: 10
		};
		_this.handleStart = _this.handleStart.bind(_this);
		_this.handleClassChange = _this.handleClassChange.bind(_this);
		_this.handleClassSubmit = _this.handleClassSubmit.bind(_this);
		_this.handleStatsSubmit = _this.handleStatsSubmit.bind(_this);
		_this.handleHealthChange = _this.handleHealthChange.bind(_this);
		_this.handleAcademicsChange = _this.handleAcademicsChange.bind(_this);
		_this.handleFunChange = _this.handleFunChange.bind(_this);
		return _this;
	}

	_createClass(PlayerState, [{
		key: "handleStart",
		value: function handleStart() {
			this.setState({ displayStartScreen: false, displayGame: true });
		}
	}, {
		key: "handleClassChange",
		value: function handleClassChange(e) {
			this.setState({ numClasses: e.target.value });
		}
	}, {
		key: "handleClassSubmit",
		value: function handleClassSubmit(e) {
			e.preventDefault();
		}
	}, {
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
				React.createElement(StartScreen, { displayStartScreen: this.state.displayStartScreen, onStart: this.handleStart, onClassSubmit: this.handleClassSubmit, onClassChange: this.handleClassChange }),
				React.createElement(InputForm, { displayGame: this.state.displayGame, dailyHours: this.state.dailyHours, healthInc: this.state.healthInc, academicsInc: this.state.academicsInc, funInc: this.state.funInc,
					onStatsSubmit: this.handleStatsSubmit, onHealthChange: this.handleHealthChange, onAcademicsChange: this.handleAcademicsChange, onFunChange: this.handleFunChange }),
				React.createElement(Display, { displayGame: this.state.displayGame, day: this.state.day, health: this.state.health, academics: this.state.academics, fun: this.state.fun })
			);
		}
	}]);

	return PlayerState;
}(React.Component);

var StartScreen = function (_React$Component2) {
	_inherits(StartScreen, _React$Component2);

	function StartScreen(props) {
		_classCallCheck(this, StartScreen);

		var _this2 = _possibleConstructorReturn(this, (StartScreen.__proto__ || Object.getPrototypeOf(StartScreen)).call(this, props));

		_this2.handleStart = _this2.handleStart.bind(_this2);
		_this2.handleClassChange = _this2.handleClassChange.bind(_this2);
		return _this2;
	}

	_createClass(StartScreen, [{
		key: "handleStart",
		value: function handleStart(e) {
			this.props.onStart();
			this.props.onClassSubmit(e);
		}
	}, {
		key: "handleClassChange",
		value: function handleClassChange(e) {
			this.props.onClassChange(e);
		}
	}, {
		key: "render",
		value: function render() {
			if (this.props.displayStartScreen) {
				return React.createElement(
					"div",
					null,
					React.createElement(
						"h1",
						null,
						"The Funnest Bestest Game Ever"
					),
					React.createElement(
						"h3",
						null,
						"How many classes will you be taking"
					),
					React.createElement(
						"form",
						{ onSubmit: this.handleStart, onChange: this.handleClassChange },
						React.createElement(
							"div",
							null,
							React.createElement("input", { type: "radio", name: "numClasses", value: "4", defaultChecked: true }),
							React.createElement(
								"label",
								{ htmlFor: "4" },
								"4"
							),
							React.createElement("input", { type: "radio", name: "numClasses", value: "5" }),
							React.createElement(
								"label",
								{ htmlFor: "5" },
								"5"
							),
							React.createElement("input", { type: "radio", name: "numClasses", value: "6" }),
							React.createElement(
								"label",
								{ htmlFor: "6" },
								"6"
							)
						),
						React.createElement(
							"div",
							null,
							React.createElement(
								"button",
								null,
								"Start"
							)
						)
					)
				);
			} else {
				return null;
			}
		}
	}]);

	return StartScreen;
}(React.Component);

var InputForm = function (_React$Component3) {
	_inherits(InputForm, _React$Component3);

	function InputForm(props) {
		_classCallCheck(this, InputForm);

		var _this3 = _possibleConstructorReturn(this, (InputForm.__proto__ || Object.getPrototypeOf(InputForm)).call(this, props));

		_this3.handleStatsSubmit = _this3.handleStatsSubmit.bind(_this3);
		_this3.handleHealthChange = _this3.handleHealthChange.bind(_this3);
		_this3.handleAcademicsChange = _this3.handleAcademicsChange.bind(_this3);
		_this3.handleFunChange = _this3.handleFunChange.bind(_this3);

		return _this3;
	}

	_createClass(InputForm, [{
		key: "handleStatsSubmit",
		value: function handleStatsSubmit(e) {
			this.props.onStatsSubmit(e);
		}
	}, {
		key: "handleHealthChange",
		value: function handleHealthChange(e) {
			this.props.onHealthChange(e);
		}
	}, {
		key: "handleAcademicsChange",
		value: function handleAcademicsChange(e) {
			this.props.onAcademicsChange(e);
		}
	}, {
		key: "handleFunChange",
		value: function handleFunChange(e) {
			this.props.onFunChange(e);
		}
	}, {
		key: "render",
		value: function render() {
			var dailyHours = this.props.dailyHours;
			var healthInc = this.props.healthInc;
			var academicsInc = this.props.academicsInc;
			var funInc = this.props.funInc;
			if (this.props.displayGame) {
				return React.createElement(
					"div",
					null,
					React.createElement(
						"h3",
						null,
						"You have ",
						dailyHours - healthInc - academicsInc - funInc,
						" hours(s) left to allocate"
					),
					React.createElement(
						"form",
						{ onSubmit: this.handleStatsSubmit },
						React.createElement(
							"label",
							{ htmlFor: "health" },
							"Add Health Hours"
						),
						React.createElement("input", { step: "1", min: "0", max: dailyHours - academicsInc - funInc, onChange: this.handleHealthChange, name: "health", type: "number" }),
						React.createElement(
							"label",
							{ htmlFor: "academics" },
							"Add Academic Hours"
						),
						React.createElement("input", { step: "1", min: "0", max: dailyHours - healthInc - funInc, onChange: this.handleAcademicsChange, name: "academics", type: "number" }),
						React.createElement(
							"label",
							{ htmlFor: "fun" },
							"Add Fun Hours"
						),
						React.createElement("input", { step: "1", min: "0", max: dailyHours - healthInc - academicsInc, onChange: this.handleFunChange, name: "fun", type: "number" }),
						React.createElement(
							"button",
							null,
							"Next Day"
						)
					)
				);
			} else {
				return null;
			}
		}
	}]);

	return InputForm;
}(React.Component);

var Display = function (_React$Component4) {
	_inherits(Display, _React$Component4);

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
			if (this.props.displayGame) {
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
			} else {
				return null;
			}
		}
	}]);

	return Display;
}(React.Component);

var display = document.querySelector("#display");
ReactDOM.render(React.createElement(PlayerState, null), display);