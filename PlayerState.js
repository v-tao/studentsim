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
			displayStats: false,
			displayChooseActivity: false,
			displayEndScreen: false,
			displayHoursDropdown: false,
			hoursDropdownActivity: "",
			numClasses: 4,
			day: 1,
			lastDay: 14,
			time: 12,
			timeInc: 0,
			maxGPA: 4.00,
			totalGP: 0.00,
			GPAInc: 0,
			fun: 50,
			funDecay: 10,
			funInc: 0,
			funValue: 10,
			health: 50,
			healthDecay: 10,
			healthInc: 0,
			healthValue: 10,
			dailyHours: 10
		};
		_this.handleStart = _this.handleStart.bind(_this);
		_this.handleClassChange = _this.handleClassChange.bind(_this);
		_this.handleActivityClick = _this.handleActivityClick.bind(_this);
		_this.handleHoursChange = _this.handleHoursChange.bind(_this);
		_this.handleHoursSubmit = _this.handleHoursSubmit.bind(_this);
		return _this;
	}

	_createClass(PlayerState, [{
		key: "handleStart",
		value: function handleStart() {
			this.setState({ displayStartScreen: false, displayStats: true, displayChooseActivity: true });
		}
	}, {
		key: "handleClassChange",
		value: function handleClassChange(e) {
			this.setState({ numClasses: e.target.value });
			if (e.target.value == 4) {
				this.setState({ maxGPA: 4.00 });
			} else if (e.target.value == 5) {
				this.setState({ maxGPA: 4.50 });
			} else if (e.target.value == 6) {
				this.setState({ maxGPA: 5.00 });
			}
		}
	}, {
		key: "handleClassSubmit",
		value: function handleClassSubmit(e) {
			e.preventDefault();
		}
	}, {
		key: "handleActivityClick",
		value: function handleActivityClick(activity) {
			this.setState({ displayHoursDropdown: true, displayChooseActivity: false });
			this.setState({ hoursDropdownActivity: activity });
		}
	}, {
		key: "handleHoursChange",
		value: function handleHoursChange(e, activity) {
			this.setState(function (state) {
				return { timeInc: parseInt(e.target.value) };
			});
			if (e.target.value) {
				if (activity == "exercise") {
					this.setState(function (state) {
						return { healthInc: state.healthInc + e.target.value };
					});
				} else if (activity == "study") {
					this.setState(function (state) {
						return { GPAInc: state.GPAInc + e.target.value };
					});
				} else if (activity == "playGames") {
					this.setState(function (state) {
						return { funInc: state.funInc + e.target.value };
					});
				}
			} else {
				this.setState({ timeInc: 0 });
			}
		}
	}, {
		key: "handleHoursSubmit",
		value: function handleHoursSubmit() {
			var currentTime = this.state.time + parseInt(this.state.timeInc);
			if (currentTime >= 24) {
				currentTime -= 24;
			}
			this.setState(function (state) {
				return {
					displayHoursDropdown: false,
					displayChooseActivity: true,
					time: currentTime
				};
			});
		}
	}, {
		key: "boundStats",
		value: function boundStats(stat) {
			if (stat > 100) {
				return 100;
			} else if (stat < 0) {
				return 0;
			}
		}
	}, {
		key: "nextDay",
		value: function nextDay(e) {
			var _this2 = this;

			e.preventDefault();
			if (this.state.day == this.state.lastDay) {
				this.setState({ displayStats: false, displayEndScreen: true });
			} else {
				var percentage = this.state.GPAInc / this.state.numClasses;
				if (percentage > 1) {
					percentage = 1;
				}
				var funAmount = this.state.fun + this.state.funInc * this.state.funValue - this.state.funDecay;
				var healthAmount = this.state.health + this.state.healthInc * this.state.healthValue - this.state.healthDecay;
				this.setState(function (state) {
					return {
						day: state.day + 1,
						health: _this2.boundStats(healthAmount),
						fun: _this2.boundStats(funAmount),
						totalGP: state.totalGP + percentage * state.maxGPA,
						healthInc: 0,
						funInc: 0,
						GPAInc: 0
					};
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var GPA = Math.round(this.state.totalGP / (this.state.day - 1) * 100) / 100;
			return React.createElement(
				"div",
				null,
				React.createElement(StartScreen, { displayStartScreen: this.state.displayStartScreen, onStart: this.handleStart, onClassSubmit: this.handleClassSubmit, onClassChange: this.handleClassChange }),
				React.createElement(ChooseActivity, { displayChooseActivity: this.state.displayChooseActivity, onActivityClick: this.handleActivityClick }),
				React.createElement(HoursDropdown, { displayHoursDropdown: this.state.displayHoursDropdown, hoursDropdownActivity: this.state.hoursDropdownActivity, onHoursSubmit: this.handleHoursSubmit, onHoursChange: this.handleHoursChange }),
				React.createElement(DisplayStats, { displayStats: this.state.displayStats, day: this.state.day, time: this.state.time, health: this.state.health, GPA: GPA, fun: this.state.fun }),
				React.createElement(EndScreen, { displayEndScreen: this.state.displayEndScreen, health: this.state.health, GPA: GPA, fun: this.state.fun })
			);
		}
	}]);

	return PlayerState;
}(React.Component);

var StartScreen = function (_React$Component2) {
	_inherits(StartScreen, _React$Component2);

	function StartScreen(props) {
		_classCallCheck(this, StartScreen);

		var _this3 = _possibleConstructorReturn(this, (StartScreen.__proto__ || Object.getPrototypeOf(StartScreen)).call(this, props));

		_this3.handleStart = _this3.handleStart.bind(_this3);
		_this3.handleClassChange = _this3.handleClassChange.bind(_this3);
		return _this3;
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

var ChooseActivity = function (_React$Component3) {
	_inherits(ChooseActivity, _React$Component3);

	function ChooseActivity(props) {
		_classCallCheck(this, ChooseActivity);

		var _this4 = _possibleConstructorReturn(this, (ChooseActivity.__proto__ || Object.getPrototypeOf(ChooseActivity)).call(this, props));

		_this4.handleActivityClick = _this4.handleActivityClick.bind(_this4);
		return _this4;
	}

	_createClass(ChooseActivity, [{
		key: "handleActivityClick",
		value: function handleActivityClick(e) {
			e.preventDefault();
			this.props.onActivityClick(e.target.name);
		}
	}, {
		key: "render",
		value: function render() {
			if (this.props.displayChooseActivity) {
				return React.createElement(
					"div",
					null,
					React.createElement(
						"h2",
						null,
						"What do you want to do?"
					),
					React.createElement("input", { onClick: this.handleActivityClick, type: "button", name: "exercise", value: "Exercise" }),
					React.createElement("input", { onClick: this.handleActivityClick, type: "button", name: "study", value: "Study" }),
					React.createElement("input", { onClick: this.handleActivityClick, type: "button", name: "playGames", value: "Play Videogames" }),
					React.createElement(
						"button",
						{ onClick: this.props.nextDay },
						"Sleep"
					)
				);
			} else {
				return null;
			}
		}
	}]);

	return ChooseActivity;
}(React.Component);

var HoursDropdown = function (_React$Component4) {
	_inherits(HoursDropdown, _React$Component4);

	function HoursDropdown(props) {
		_classCallCheck(this, HoursDropdown);

		var _this5 = _possibleConstructorReturn(this, (HoursDropdown.__proto__ || Object.getPrototypeOf(HoursDropdown)).call(this, props));

		_this5.handleHoursChange = _this5.handleHoursChange.bind(_this5);
		_this5.handleHoursSubmit = _this5.handleHoursSubmit.bind(_this5);
		return _this5;
	}

	_createClass(HoursDropdown, [{
		key: "handleHoursChange",
		value: function handleHoursChange(e) {
			this.props.onHoursChange(e, this.props.hoursDropdownActivity);
		}
	}, {
		key: "handleHoursSubmit",
		value: function handleHoursSubmit(e) {
			e.preventDefault();
			this.props.onHoursSubmit();
		}
	}, {
		key: "render",
		value: function render() {
			if (this.props.displayHoursDropdown) {
				return React.createElement(
					"div",
					null,
					React.createElement(
						"h3",
						null,
						"How many hours do you want to spend?"
					),
					React.createElement(
						"form",
						{ onSubmit: this.handleHoursSubmit },
						React.createElement("input", { step: "1", min: "0", type: "number", onChange: this.handleHoursChange, name: this.props.hoursDropdownActivity }),
						React.createElement(
							"button",
							null,
							"Submit"
						)
					)
				);
			} else {
				return null;
			}
		}
	}]);

	return HoursDropdown;
}(React.Component);

var DisplayStats = function (_React$Component5) {
	_inherits(DisplayStats, _React$Component5);

	function DisplayStats(props) {
		_classCallCheck(this, DisplayStats);

		return _possibleConstructorReturn(this, (DisplayStats.__proto__ || Object.getPrototypeOf(DisplayStats)).call(this, props));
	}

	_createClass(DisplayStats, [{
		key: "render",
		value: function render() {
			if (this.props.displayStats) {
				var timeDisplay = void 0;
				if (this.props.time == 0) {
					timeDisplay = "12 AM";
				} else if (this.props.time == 12) {
					timeDisplay = "12 PM";
				} else if (this.props.time < 12) {
					timeDisplay = this.props.time + " AM";
				} else {
					timeDisplay = this.props.time % 12 + " PM";
				}
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
						this.props.day,
						" TIME ",
						timeDisplay
					),
					React.createElement(
						"h3",
						null,
						"Health: ",
						this.props.health
					),
					React.createElement(
						"h3",
						null,
						"GPA: ",
						this.props.GPA
					),
					React.createElement(
						"h3",
						null,
						"Fun: ",
						this.props.fun
					)
				);
			} else {
				return null;
			}
		}
	}]);

	return DisplayStats;
}(React.Component);

var EndScreen = function (_React$Component6) {
	_inherits(EndScreen, _React$Component6);

	function EndScreen(props) {
		_classCallCheck(this, EndScreen);

		return _possibleConstructorReturn(this, (EndScreen.__proto__ || Object.getPrototypeOf(EndScreen)).call(this, props));
	}

	_createClass(EndScreen, [{
		key: "render",
		value: function render() {
			if (this.props.displayEndScreen) {
				return React.createElement(
					"div",
					null,
					React.createElement(
						"h1",
						null,
						"HIGH SCHOOL IS OVER"
					),
					React.createElement(
						"h2",
						null,
						"Your Health: ",
						this.props.health
					),
					React.createElement(
						"h2",
						null,
						"Your GPA: ",
						this.props.GPA
					),
					React.createElement(
						"h2",
						null,
						"Your Fun: ",
						this.props.fun
					)
				);
			} else {
				return null;
			}
		}
	}]);

	return EndScreen;
}(React.Component);

var display = document.querySelector("#display");
ReactDOM.render(React.createElement(PlayerState, null), display);