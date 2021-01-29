"use strict";
//name, hours, healthInc, GPAInc, funInc, healthReq, GPAReq, funReq

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var clubs = {
	"none": new Club("none", 0, 0, 0, 0, 0, 0, 0),
	"Soccer Team": new Club("Soccer Team", 2, 2, 0, 2, 70, 2.0, 0),
	"Quiz Bowl": new Club("Quiz Bowl", 2, 0, 2, 2, 0, 3.5, 0),
	"Comedy Club": new Club("Comedy Club", 2, 0, 0, 4, 0, 2.0, 70)
	//have events for a club

	//name, text, healthInc, funInc, GPAInc, 
	//popQuiz, hangout, bullies, substitute, slept through alarm, pizza for lunch, meme
};var events = {
	none: new Event("none", "", 0, 0, 0),
	popQuiz: new Event("popQuiz", "You had a pop quiz today", 0, 0, 0),
	pizzaLunch: new Event("pizzaLunch", "You had pizza for lunch", 10, 10, 0),
	meme: new Event("meme", "Your friend showed you a funny meme", 0, 20, 0)
};

var eventPool = [events.popQuiz, events.pizzaLunch, events.meme];

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
			displayHoursForm: false,
			displayChooseClub: false,
			displayEventBox: false,
			messageType: "",
			hoursFormActivity: "",
			numClasses: 4,
			day: 1,
			lastDay: 14,
			startTime: 15,
			wakeUpTime: 6,
			time: 15,
			timeInc: 0,
			// name, currentPoints, totalPoints, inputHolder, activityValue, dailyInc, dailyDec
			academics: new Stat("academics", 0, 0, 0, 10, 0, 0),
			fun: new Stat("fun", 0, 0, 0, 10, 0, 10),
			health: new Stat("health", 0, 0, 0, 10, 0, 10),
			GPA: 0.0,
			sleepValue: 10,
			club: clubs.none,
			event: events.none,
			eventProb: 0.5,
			necessarySleepHours: 8
		};
		_this.handleStart = _this.handleStart.bind(_this);
		_this.handleClassChange = _this.handleClassChange.bind(_this);
		_this.handleActivityClick = _this.handleActivityClick.bind(_this);
		_this.handleHoursChange = _this.handleHoursChange.bind(_this);
		_this.calculateMaxHours = _this.calculateMaxHours.bind(_this);
		_this.handleHoursSubmit = _this.handleHoursSubmit.bind(_this);
		_this.handleJoinClubClick = _this.handleJoinClubClick.bind(_this);
		_this.handleChooseClubClick = _this.handleChooseClubClick.bind(_this);
		_this.handleLeaveClubClick = _this.handleLeaveClubClick.bind(_this);
		_this.handleConfirmLeaveClubClick = _this.handleConfirmLeaveClubClick.bind(_this);
		_this.chooseEvent = _this.chooseEvent.bind(_this);
		_this.calculateSleepDecay = _this.calculateSleepDecay.bind(_this);
		_this.calculateGPA = _this.calculateGPA.bind(_this);
		_this.nextDay = _this.nextDay.bind(_this);
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
			this.setState({ numClasses: parseInt(e.target.value) });
		}
	}, {
		key: "handleClassSubmit",
		value: function handleClassSubmit(e) {
			e.preventDefault();
		}
	}, {
		key: "handleActivityClick",
		value: function handleActivityClick(e) {
			e.preventDefault();
			this.setState({ displayHoursForm: true, displayChooseActivity: false, messageType: "", hoursFormActivity: e.target.name });
		}
	}, {
		key: "handleHoursChange",
		value: function handleHoursChange(e) {
			e.preventDefault();
			if (e.target.value) {
				this.setState({ timeInc: parseInt(e.target.value) });
				if (this.state.hoursFormActivity == "exercise") {
					this.state.health.inputHolder = parseInt(e.target.value);
				} else if (this.state.hoursFormActivity == "study") {
					this.state.academics.inputHolder = parseInt(e.target.value);
				} else if (this.state.hoursFormActivity == "playGames") {
					this.state.fun.inputHolder = parseInt(e.target.value);
				}
			} else {
				this.setState({ timeInc: 0 });
				var _ref = [0, 0, 0];
				this.state.health.inputHolder = _ref[0];
				this.state.academics.inputHolder = _ref[1];
				this.state.fun.inputHolder = _ref[2];
			}
		}
	}, {
		key: "calculateMaxHours",
		value: function calculateMaxHours() {
			if (this.state.time > this.state.wakeUpTime) {
				return 24 - this.state.time + this.state.wakeUpTime;
			} else {
				return this.state.wakeUpTime - this.state.time;
			}
		}
	}, {
		key: "handleHoursSubmit",
		value: function handleHoursSubmit(e) {
			e.preventDefault();
			var currentTime = this.state.time + parseInt(this.state.timeInc);
			currentTime = currentTime < 24 ? currentTime : currentTime - 24;
			if (this.state.hoursFormActivity == "exercise") {
				this.state.health.dailyInc += this.state.health.inputHolder;
			} else if (this.state.hoursFormActivity == "study") {
				this.state.academics.dailyInc += this.state.academics.inputHolder;
			} else if (this.state.hoursFormActivity == "playGames") {
				this.state.fun.dailyInc += this.state.fun.inputHolder;
			}
			this.setState({ displayHoursForm: false, displayChooseActivity: true, time: currentTime, timeInc: 0 });
			var _ref2 = [0, 0, 0];
			this.state.health.inputHolder = _ref2[0];
			this.state.academics.inputHolder = _ref2[1];
			this.state.fun.inputHolder = _ref2[2];
		}
	}, {
		key: "handleJoinClubClick",
		value: function handleJoinClubClick() {
			this.setState({
				displayChooseClub: true,
				displayChooseActivity: false,
				messageType: ""
			});
		}
	}, {
		key: "handleChooseClubClick",
		value: function handleChooseClubClick(e) {
			if (clubs[e.target.name].isEligible(this.state.health.current, this.state.GPA, this.state.fun.current)) {
				this.setState({ club: clubs[e.target.name] });
			} else {
				this.setState({ messageType: "warning" });
			}
			this.setState({ displayChooseClub: false, displayChooseActivity: true });
		}
	}, {
		key: "handleLeaveClubClick",
		value: function handleLeaveClubClick() {
			this.setState({ displayChooseActivity: false, messageType: "danger" });
		}
	}, {
		key: "handleConfirmLeaveClubClick",
		value: function handleConfirmLeaveClubClick() {
			delete clubs[this.state.club.name];
			this.setState({ displayChooseActivity: true, messageType: "", club: clubs.none });
		}
	}, {
		key: "chooseEvent",
		value: function chooseEvent() {
			if (Math.random() <= this.state.eventProb) {
				var event = eventPool[Math.floor(Math.random() * eventPool.length)];
				this.setState({ displayEventBox: true, event: event });
				this.state.health.current += event.healthInc;
				this.state.academics.current += event.academicsInc;
				this.state.fun.current += event.funInc;
			} else {
				this.setState({ displayEventBox: false, event: events.none });
			}
		}
	}, {
		key: "boundStats",
		value: function boundStats(stat) {
			if (stat <= 100 && stat >= 0) {
				return stat;
			} else {
				return stat > 100 ? 100 : 0;
			}
		}
	}, {
		key: "calculateSleepDecay",
		value: function calculateSleepDecay() {
			var sleepDecay = 0;
			if (this.state.time < this.state.wakeUpTime && this.state.wakeUpTime - this.state.time < this.state.necessarySleepHours) {
				sleepDecay = this.state.sleepValue * (this.state.necessarySleepHours - (this.state.wakeUpTime - this.state.time));
			} else if (this.state.time > this.state.wakeUpTime && 24 - this.state.time + this.state.wakeUpTime < this.state.necessarySleepHours) {
				sleepDecay = this.state.sleepValue * (this.state.necessarySleepHours - (24 - this.state.time + this.state.wakeUpTime));
			}
			return sleepDecay >= 0 ? sleepDecay : 0;
		}
	}, {
		key: "calculateGPA",
		value: function calculateGPA() {
			var GPA = Math.round(100 * (this.state.academics.total / this.state.day / 20 - 1)) / 100;
			if (this.state.numClasses == 5) {
				GPA += 0.5;
			} else if (this.state.numClasses == 6) {
				GPA += 1;
			}
			return GPA >= 0 ? GPA : 0;
		}
	}, {
		key: "nextDay",
		value: function nextDay(e) {
			var _this2 = this;

			e.preventDefault();
			if (this.state.day == this.state.lastDay) {
				this.setState({ displayChooseActivity: false, displayStats: false, displayEventBox: false, displayEndScreen: true });
			} else {
				this.state.fun.current = this.boundStats(this.state.fun.current + this.state.fun.dailyInc * this.state.fun.activityValue + this.state.club.funInc - this.state.fun.dailyDec);
				this.state.health.current = this.boundStats(this.state.health.current + this.state.health.dailyInc * this.state.health.activityValue - this.state.health.dailyDec - this.calculateSleepDecay() + this.state.club.healthInc);
				this.state.academics.current = this.boundStats(Math.round(100 * (this.state.academics.dailyInc + this.state.club.academicsInc) / this.state.numClasses));
				this.state.academics.total += this.state.academics.current;
				var _ref3 = [0, 0, 0];
				this.state.fun.dailyInc = _ref3[0];
				this.state.health.dailyInc = _ref3[1];
				this.state.academics.dailyInc = _ref3[2];
				var _ref4 = [0, 0, 0];
				this.state.fun.inputHolder = _ref4[0];
				this.state.health.inputHolder = _ref4[1];
				this.state.academics.inputHolder = _ref4[2];

				this.setState(function (state) {
					return {
						messageType: "",
						day: state.day + 1,
						time: state.club.name == "none" ? state.startTime : state.startTime + state.club.hours,
						GPA: _this2.calculateGPA()
					};
				});
				this.chooseEvent();
				if (!this.state.club.isEligible(this.state.health.current, this.state.GPA, this.state.fun.current)) {
					this.setState({ messageType: "warning", club: clubs.none });
				}
			}
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(StartScreen, { displayStartScreen: this.state.displayStartScreen, onStart: this.handleStart, onClassSubmit: this.handleClassSubmit, onClassChange: this.handleClassChange }),
				React.createElement(Message, { type: this.state.messageType, onConfirmLeaveClubClick: this.handleConfirmLeaveClubClick }),
				React.createElement(ChooseActivity, { displayChooseActivity: this.state.displayChooseActivity, onActivityClick: this.handleActivityClick, club: this.state.club, onJoinClubClick: this.handleJoinClubClick, onLeaveClubClick: this.handleLeaveClubClick, nextDay: this.nextDay, time: this.state.time, startTime: this.state.startTime + this.state.club.hours }),
				React.createElement(ChooseClub, { displayChooseClub: this.state.displayChooseClub, onChooseClubClick: this.handleChooseClubClick }),
				React.createElement(HoursForm, { displayHoursForm: this.state.displayHoursForm, hoursFormActivity: this.state.hoursFormActivity, onHoursSubmit: this.handleHoursSubmit, onHoursChange: this.handleHoursChange, calculateMaxHours: this.calculateMaxHours }),
				React.createElement(EventBox, { displayEventBox: this.state.displayEventBox, eventText: this.state.event.text }),
				React.createElement(DisplayStats, { displayStats: this.state.displayStats, day: this.state.day, time: this.state.time, clubName: this.state.club.name, health: this.state.health.current, GPA: this.state.GPA, fun: this.state.fun.current }),
				React.createElement(EndScreen, { displayEndScreen: this.state.displayEndScreen, health: this.state.health.current, GPA: this.state.GPA, fun: this.state.fun.current })
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
		return _this3;
	}

	_createClass(StartScreen, [{
		key: "handleStart",
		value: function handleStart(e) {
			this.props.onStart();
			this.props.onClassSubmit(e);
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
						{ onSubmit: this.handleStart, onChange: this.props.onClassChange },
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

var ClubButton = function (_React$Component3) {
	_inherits(ClubButton, _React$Component3);

	function ClubButton(props) {
		_classCallCheck(this, ClubButton);

		return _possibleConstructorReturn(this, (ClubButton.__proto__ || Object.getPrototypeOf(ClubButton)).call(this, props));
	}

	_createClass(ClubButton, [{
		key: "render",
		value: function render() {
			if (this.props.time == this.props.startTime) {
				if (this.props.club == clubs.none) {
					return React.createElement(
						"button",
						{ onClick: this.props.onJoinClubClick },
						"Join Club"
					);
				} else {
					return React.createElement(
						"button",
						{ onClick: this.props.onLeaveClubClick },
						"Leave Club"
					);
				}
			} else {
				return null;
			}
		}
	}]);

	return ClubButton;
}(React.Component);

var ChooseActivity = function (_React$Component4) {
	_inherits(ChooseActivity, _React$Component4);

	function ChooseActivity(props) {
		_classCallCheck(this, ChooseActivity);

		return _possibleConstructorReturn(this, (ChooseActivity.__proto__ || Object.getPrototypeOf(ChooseActivity)).call(this, props));
	}

	_createClass(ChooseActivity, [{
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
					React.createElement("input", { onClick: this.props.onActivityClick, type: "button", name: "exercise", value: "Exercise" }),
					React.createElement("input", { onClick: this.props.onActivityClick, type: "button", name: "study", value: "Study" }),
					React.createElement("input", { onClick: this.props.onActivityClick, type: "button", name: "playGames", value: "Play Videogames" }),
					React.createElement(ClubButton, { club: this.props.club, onJoinClubClick: this.props.onJoinClubClick, onLeaveClubClick: this.props.onLeaveClubClick, time: this.props.time, startTime: this.props.startTime }),
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

var ChooseClub = function (_React$Component5) {
	_inherits(ChooseClub, _React$Component5);

	function ChooseClub(props) {
		_classCallCheck(this, ChooseClub);

		return _possibleConstructorReturn(this, (ChooseClub.__proto__ || Object.getPrototypeOf(ChooseClub)).call(this, props));
	}

	_createClass(ChooseClub, [{
		key: "render",
		value: function render() {
			var _this7 = this;

			var buttons = Object.keys(clubs).map(function (club, i) {
				if (club != "none") {
					return React.createElement(
						"button",
						{ key: i, onClick: _this7.props.onChooseClubClick, name: club },
						clubs[club].name
					);
				}
			});
			if (this.props.displayChooseClub) {
				return React.createElement(
					"div",
					null,
					React.createElement(
						"h2",
						null,
						"What club do you want to try out for?"
					),
					buttons
				);
			} else {
				return null;
			}
		}
	}]);

	return ChooseClub;
}(React.Component);

var HoursForm = function (_React$Component6) {
	_inherits(HoursForm, _React$Component6);

	function HoursForm(props) {
		_classCallCheck(this, HoursForm);

		return _possibleConstructorReturn(this, (HoursForm.__proto__ || Object.getPrototypeOf(HoursForm)).call(this, props));
	}

	_createClass(HoursForm, [{
		key: "render",
		value: function render() {
			if (this.props.displayHoursForm) {
				var maxHours = this.props.calculateMaxHours();
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
						{ onSubmit: this.props.onHoursSubmit },
						React.createElement("input", { step: "1", min: "0", max: maxHours, type: "number", onChange: this.props.onHoursChange, name: this.props.hoursFormActivity }),
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

	return HoursForm;
}(React.Component);

var Message = function (_React$Component7) {
	_inherits(Message, _React$Component7);

	function Message(props) {
		_classCallCheck(this, Message);

		var _this9 = _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, props));

		_this9.messages = {
			"warning": React.createElement(WarningMessage, null),
			"danger": React.createElement(DangerMessage, { onConfirmLeaveClubClick: _this9.props.onConfirmLeaveClubClick })
		};
		return _this9;
	}

	_createClass(Message, [{
		key: "render",
		value: function render() {
			if (this.props.type in this.messages) {
				return this.messages[this.props.type];
			} else {
				return null;
			}
		}
	}]);

	return Message;
}(React.Component);

//the names of these classes are based off of the bootstrap colors

var WarningMessage = function (_React$Component8) {
	_inherits(WarningMessage, _React$Component8);

	function WarningMessage() {
		_classCallCheck(this, WarningMessage);

		return _possibleConstructorReturn(this, (WarningMessage.__proto__ || Object.getPrototypeOf(WarningMessage)).apply(this, arguments));
	}

	_createClass(WarningMessage, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h4",
					null,
					"You did not meet the requirements for this club"
				)
			);
		}
	}]);

	return WarningMessage;
}(React.Component);

var DangerMessage = function (_React$Component9) {
	_inherits(DangerMessage, _React$Component9);

	function DangerMessage(props) {
		_classCallCheck(this, DangerMessage);

		return _possibleConstructorReturn(this, (DangerMessage.__proto__ || Object.getPrototypeOf(DangerMessage)).call(this, props));
	}

	_createClass(DangerMessage, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h1",
					null,
					"ARE YOU SURE YOU WANT TO LEAVE THIS CLUB?"
				),
				React.createElement(
					"h1",
					null,
					"IF YOU LEAVE THE CLUB YOU CANNOT REJOIN BECAUSE YOUR CLUB MEMBERS NEED COMMITMENT"
				),
				React.createElement(
					"button",
					{ onClick: this.props.onConfirmLeaveClubClick },
					"I am sure I want to leave the club"
				)
			);
		}
	}]);

	return DangerMessage;
}(React.Component);

var EventBox = function (_React$Component10) {
	_inherits(EventBox, _React$Component10);

	function EventBox(props) {
		_classCallCheck(this, EventBox);

		return _possibleConstructorReturn(this, (EventBox.__proto__ || Object.getPrototypeOf(EventBox)).call(this, props));
	}

	_createClass(EventBox, [{
		key: "render",
		value: function render() {
			if (this.props.displayEventBox) {
				return React.createElement(
					"div",
					null,
					React.createElement(
						"p",
						null,
						this.props.eventText
					)
				);
			} else {
				return null;
			}
		}
	}]);

	return EventBox;
}(React.Component);

var DisplayStats = function (_React$Component11) {
	_inherits(DisplayStats, _React$Component11);

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
						"CLUB: ",
						this.props.clubName
					),
					React.createElement(
						"h3",
						null,
						"HEALTH: ",
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
						"FUN: ",
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

var EndScreen = function (_React$Component12) {
	_inherits(EndScreen, _React$Component12);

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