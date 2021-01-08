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
			displayChooseActivity: false,
			displayEndScreen: false,
			displayHoursDropdown: false,
			hoursDropdownActivity: "",
			numClasses: 4,
			day: 1,
			lastDay: 14,
			time: 12,
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
		_this.handleExerciseClick = _this.handleExerciseClick.bind(_this);
		_this.handleStudyClick = _this.handleStudyClick.bind(_this);
		_this.handlePlayGamesClick = _this.handlePlayGamesClick.bind(_this);
		_this.handleExerciseChange = _this.handleExerciseClick.bind(_this);
		_this.handleStudyChange = _this.handleStudyChange.bind(_this);
		_this.handlePlayGamesChange = _this.handlePlayGamesChange.bind(_this);
		return _this;
	}

	_createClass(PlayerState, [{
		key: "handleStart",
		value: function handleStart() {
			this.setState({ displayStartScreen: false, displayGame: true, displayChooseActivity: true });
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
		key: "handleExerciseClick",
		value: function handleExerciseClick() {
			this.setState({ hoursDropdownActivity: "exercise", displayHoursDropdown: true, displayChooseActivity: false });
		}
	}, {
		key: "handleStudyClick",
		value: function handleStudyClick() {
			this.setState({ hoursDropdownActivity: "study", displayHoursDropdown: true, displayChooseActivity: false });
		}
	}, {
		key: "handlePlayGamesClick",
		value: function handlePlayGamesClick() {
			this.setState({ hoursDropdownActivity: "playGames", displayHoursDropdown: true, displayChooseActivity: false });
		}
	}, {
		key: "handleExerciseChange",
		value: function handleExerciseChange(e) {
			if (e.target.value) {
				this.setState({ healthInc: parseInt(e.target.value) });
			} else {
				this.setState({ healthInc: 0 });
			}
		}
	}, {
		key: "handleStudyChange",
		value: function handleStudyChange(e) {
			if (e.target.value) {
				this.setState({ GPAInc: parseInt(e.target.value) });
			} else {
				this.setState({ GPAInc: 0 });
			}
		}
	}, {
		key: "handlePlayGamesChange",
		value: function handlePlayGamesChange(e) {
			if (e.target.value) {
				this.setState({ funInc: parseInt(e.target.value) });
			} else {
				this.setState({ funInc: 0 });
			}
		}
	}, {
		key: "nextDay",
		value: function nextDay(e) {
			e.preventDefault();
			if (this.state.day == this.state.lastDay) {
				this.setState({ displayGame: false, displayEndScreen: true });
			} else {
				var percentage = this.state.GPAInc / this.state.numClasses;
				if (percentage > 1) {
					percentage = 1;
				}
				var funAmount = this.state.fun + this.state.funInc * this.state.funValue - this.state.funDecay;
				if (funAmount > 100) {
					funAmount = 100;
				} else if (funAmount < 0) {
					funAmount = 0;
				}

				var healthAmount = this.state.health + this.state.healthInc * this.state.healthValue - this.state.healthDecay;
				if (healthAmount > 100) {
					healthAmount = 100;
				} else if (healthAmount < 0) {
					healthAmount = 0;
				}
				this.setState(function (state) {
					return {
						day: state.day + 1,
						health: healthAmount,
						fun: funAmount,
						totalGP: state.totalGP + percentage * state.maxGPA
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
				React.createElement(ChooseActivity, { displayChooseActivity: this.state.displayChooseActivity, onExerciseClick: this.handleExerciseClick, onStudyClick: this.handleStudyClick, onPlayGames: this.handlePlayGamesClick }),
				React.createElement(HoursDropdown, { displayHoursDropdown: this.state.displayHoursDropdown, hoursDropdownActivity: this.state.hoursDropdownActivity, onExerciseChange: this.handleExerciseChange, onStudyChange: this.handleStudyChange, onPlayGamesChange: this.handlePlayGamesChange }),
				React.createElement(Display, { displayGame: this.state.displayGame, day: this.state.day, time: this.state.time, health: this.state.health, GPA: GPA, fun: this.state.fun }),
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

var ChooseActivity = function (_React$Component3) {
	_inherits(ChooseActivity, _React$Component3);

	function ChooseActivity(props) {
		_classCallCheck(this, ChooseActivity);

		var _this3 = _possibleConstructorReturn(this, (ChooseActivity.__proto__ || Object.getPrototypeOf(ChooseActivity)).call(this, props));

		_this3.handleExerciseClick = _this3.handleExerciseClick.bind(_this3);
		_this3.handleStudyClick = _this3.handleStudyClick.bind(_this3);
		_this3.handlePlayGamesClick = _this3.handlePlayGamesClick.bind(_this3);

		return _this3;
	}

	_createClass(ChooseActivity, [{
		key: "handleExerciseClick",
		value: function handleExerciseClick(e) {
			e.preventDefault();
			this.props.onExerciseClick(e);
		}
	}, {
		key: "handleStudyClick",
		value: function handleStudyClick(e) {
			e.preventDefault();
			this.props.onStudyClick(e);
		}
	}, {
		key: "handlePlayGamesClick",
		value: function handlePlayGamesClick(e) {
			e.preventDefault(e);
			this.props.onPlayGamesClick();
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
					React.createElement(
						"button",
						{ onClick: this.handleExerciseClick },
						"Exercise"
					),
					React.createElement(
						"button",
						{ onClick: this.handleStudyClick },
						"Study"
					),
					React.createElement(
						"button",
						{ onClick: this.handlePlayGamesClick },
						"Play Videogames"
					),
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

		var _this4 = _possibleConstructorReturn(this, (HoursDropdown.__proto__ || Object.getPrototypeOf(HoursDropdown)).call(this, props));

		_this4.handleHoursChange = _this4.handleHoursChange.bind(_this4);
		return _this4;
	}

	_createClass(HoursDropdown, [{
		key: "handleHoursChange",
		value: function handleHoursChange(e) {
			if (this.props.hoursDropdownActivity == "exercise") {
				this.props.onExerciseChange(e);
			} else if (this.props.hoursDropdownActiviy == "study") {
				this.props.onStudyChange(e);
			} else if (this.props.hoursDropdownActivity == "playGames") {
				this.props.onPlayGamesChange(e);
			}
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
						null,
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

var Display = function (_React$Component5) {
	_inherits(Display, _React$Component5);

	function Display(props) {
		_classCallCheck(this, Display);

		return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));
	}

	_createClass(Display, [{
		key: "render",
		value: function render() {
			if (this.props.displayGame) {
				var timeDisplay = void 0;
				if (this.props.time == 0) {
					timeDisplay = "12 AM";
				} else if (this.props.time == 12) {
					timeDisplay = "12 PM";
				} else if (this.props.time < 12) {
					timeDisplay = this.state.time + " AM";
				} else {
					timeDisplay = this.props.time % 12 + "PM";
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

	return Display;
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