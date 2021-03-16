"use strict";
//name, hours, healthInc, academicsInc, funInc, healthReq, GPAReq, funReq

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var clubs = {
	"none": new Club("none", 0, 0, 0, 0, 0, 0, 0),
	"Soccer Team": new Club("Soccer Team", 2, 20, 0, 0, 70, 2.0, 0),
	"Quiz Bowl": new Club("Quiz Bowl", 2, 0, 3, 0, 0, 3.5, 0),
	"Comedy Club": new Club("Comedy Club", 2, 0, 0, 20, 0, 2.0, 70)
	//have events for a club
	/* EVENT
 name, type, text, healthInc, funInc, GPAInc, 
 USER INPUT EVENT
 name, text, healthInc, funInc, academicsInc, maxHours, healthDec, funDec, academicsDec,
 inc = if yes dec = if no
 */

	//popQuiz, hangout, bullies, substitute, slept through alarm, pizza for lunch, meme
};var events = {
	none: new Event("none", "normal", "", 0, 0, 0),
	popQuiz: new Event("popQuiz", "normal", "You had a pop quiz today", 0, 0, 0),
	pizzaLunch: new Event("pizzaLunch", "normal", "You had pizza for lunch", 2, 0, 0),
	meme: new Event("meme", "normal", "Your friend showed you a funny meme", 0, 2, 0),
	rock: new Event("rock", "normal", "You tripped on a rock at school", -3, 0, 0),
	friendlessLunch: new Event("friendlessLunch", "normal", "Your friends went to lunch without you today", 0, -5, 0),
	absentTeacher: new Event("absentTeacher", "normal", "Your teacher was absent from school today", 0, 0, -5),
	mall: new InputFormEvent("mall", "Your friends want to hang out at the mall with you", 0, 8, 0, 4, 0, 12, 0),
	dinner: new InputFormEvent("dinner", "Your family wants you to help them make dinner", 3, 5, 0, 2, 3, 3, 0),
	study: new InputFormEvent("study", "Your friend wants to study for a test together", 0, 3, 6, 4, 0, 0, 0),
	album: new InputFormEvent("album", "Your favorite musician's new album just came out", 0, 9, 0, 2, 0, 6, 0)
};

var eventPool = [];

//adds one of every event
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = Object.keys(events)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var key = _step.value;

		if (key != "none") {
			eventPool.push(events[key]);
		}
	}
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}

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
			displayModal: false,
			modalType: "close",
			modalHeader: "",
			messageType: "",
			hoursFormActivity: "",
			numClasses: 4,
			day: 1,
			lastDay: 14,
			startTime: 15,
			wakeUpTime: 6,
			time: 15,
			timeInc: 0,
			// name, currentPoints, totalPoints, inputHolder, defaultActivityValue, dailyActivityInc, dailyEventInc, dailyDec
			academics: new Stat("academics", 0, 0, 0, 7, 0, 0, 0),
			fun: new Stat("fun", 50, 0, 0, 7, 0, 0, 10),
			health: new Stat("health", 50, 0, 0, 7, 0, 0, 10),
			GPA: 0.0,
			sleepValue: 10,
			club: clubs.none,
			event: events.none,
			eventHours: 0,
			eventProb: 0,
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
		_this.handleEventHoursChange = _this.handleEventHoursChange.bind(_this);
		_this.handleEventFormSubmit = _this.handleEventFormSubmit.bind(_this);
		_this.chooseEvent = _this.chooseEvent.bind(_this);
		_this.updateCurrent = _this.updateCurrent.bind(_this);
		_this.updateValues = _this.updateValues.bind(_this);
		_this.updateDecay = _this.updateDecay.bind(_this);
		_this.calculateSleepDecay = _this.calculateSleepDecay.bind(_this);
		_this.calculateGPA = _this.calculateGPA.bind(_this);
		_this.nextDay = _this.nextDay.bind(_this);
		_this.handleCloseModal = _this.handleCloseModal.bind(_this);
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
			this.setState({
				displayModal: true,
				modalType: "close",
				modalHeader: "How many hours do you want to spend to " + e.target.value.toLowerCase() + "?",
				displayHoursForm: true,
				displayEventBox: false,
				displayChooseClub: false,
				messageType: "",
				hoursFormActivity: e.target.name
			});
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
				this.state.health.dailyActivityInc += this.state.health.inputHolder;
			} else if (this.state.hoursFormActivity == "study") {
				this.state.academics.dailyActivityInc += this.state.academics.inputHolder;
			} else if (this.state.hoursFormActivity == "playGames") {
				this.state.fun.dailyActivityInc += this.state.fun.inputHolder;
			}
			this.setState({ displayModal: false, displayHoursForm: false, time: currentTime, timeInc: 0 });
			var _ref2 = [0, 0, 0];
			this.state.health.inputHolder = _ref2[0];
			this.state.academics.inputHolder = _ref2[1];
			this.state.fun.inputHolder = _ref2[2];
		}
	}, {
		key: "handleJoinClubClick",
		value: function handleJoinClubClick() {
			this.setState({
				displayModal: true,
				modalType: "close",
				modalHeader: "What club do you want to try out for?",
				displayChooseClub: true,
				displayEventBox: false,
				messageType: ""
			});
		}
	}, {
		key: "handleChooseClubClick",
		value: function handleChooseClubClick(e) {
			if (clubs[e.target.name].isEligible(this.state.health.current, this.state.GPA, this.state.fun.current)) {
				this.setState({
					modalType: "close",
					modalHeader: "You have successfully joined the " + clubs[e.target.name].name,
					messageType: "success",
					displayChooseClub: false,
					club: clubs[e.target.name]
				});
			} else {
				this.setState({
					modalType: "close",
					modalHeader: "You did not meet the requirements for the " + clubs[e.target.name].name,
					messageType: "warning"
				});
			}
			this.setState({ displayChooseClub: false, displayChooseActivity: true });
		}
	}, {
		key: "handleLeaveClubClick",
		value: function handleLeaveClubClick() {
			this.setState({
				displayModal: true,
				modalHeader: "Are you sure you want to leave the " + this.state.club.name + "?",
				displayEventBox: false,
				messageType: "danger"
			});
		}
	}, {
		key: "handleConfirmLeaveClubClick",
		value: function handleConfirmLeaveClubClick() {
			var _setState;

			delete clubs[this.state.club.name];
			this.setState((_setState = {
				displayModal: false,
				messageType: "",
				displayChooseActivity: true
			}, _defineProperty(_setState, "messageType", ""), _defineProperty(_setState, "club", clubs.none), _setState));
		}
	}, {
		key: "handleEventHoursChange",
		value: function handleEventHoursChange(e) {
			e.preventDefault();
			if (e.target.value) {
				var _ref3 = [parseInt(e.target.value), parseInt(e.target.value), parseInt(e.target.value)];
				this.state.health.inputHolder = _ref3[0];
				this.state.fun.inputHolder = _ref3[1];
				this.state.academics.inputHolder = _ref3[2];
			} else {
				var _ref4 = [0, 0, 0];
				this.state.health.inputHolder = _ref4[0];
				this.state.fun.inputHolder = _ref4[1];
				this.state.academics.inputHolder = _ref4[2];
			}
		}
	}, {
		key: "handleEventFormSubmit",
		value: function handleEventFormSubmit(e) {
			e.preventDefault();
			this.state.health.inputHolder == 0 ? this.state.health.dailyEventInc -= this.state.event.healthDec : this.state.health.dailyEventInc += this.state.health.inputHolder * this.state.event.healthInc;
			this.state.fun.inputHolder == 0 ? this.state.fun.dailyEventInc -= this.state.event.funDec : this.state.fun.dailyEventInc += this.state.fun.inputHolder * this.state.event.funInc;
			this.state.academics.inputHolder == 0 ? this.state.academics.dailyEventInc -= this.state.event.academicsDec : this.state.academics.dailyEventInc += this.state.academics.inputHolder * this.state.event.academicsInc;
			this.setState(function (state) {
				return {
					displayModal: false,
					displayChooseActivity: true,
					displayEventBox: false,
					time: state.time + state.health.inputHolder
				};
			});
		}
	}, {
		key: "chooseEvent",
		value: function chooseEvent() {
			if (Math.random() <= this.state.eventProb) {
				var event = eventPool[Math.floor(Math.random() * eventPool.length)];
				this.setState({
					displayModal: true,
					modalHeader: event.text,
					displayEventBox: true,
					event: event
				});
				if (event.type == "inputForm") {
					this.setState({ modalType: "unclosable" });
				} else {
					this.setState({ modalType: "close" });
					this.state.health.current += event.healthInc;
					this.state.academics.current += event.academicsInc;
					this.state.fun.current += event.funInc;
				}
			} else {
				this.setState({
					displayModal: false,
					displayEventBox: false,
					event: events.none });
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
		key: "updateCurrent",
		value: function updateCurrent() {
			this.state.health.current = this.boundStats(this.state.health.current + this.state.health.dailyActivityInc * this.state.health.activityValue - this.state.health.dailyDec - this.calculateSleepDecay() + this.state.club.healthInc + this.state.health.dailyEventInc);
			this.state.fun.current = this.boundStats(this.state.fun.current + this.state.fun.dailyActivityInc * this.state.fun.activityValue + this.state.club.funInc - this.state.fun.dailyDec + this.state.fun.dailyEventInc);
			//square root function that is 0 at x = 50 and 0.5 at x = 100
			var multiplier = 0.17071 * Math.sqrt(this.state.health.current) - 1.20711;
			var dailyAcademicsInc = (this.state.academics.dailyActivityInc + this.state.club.academicsInc) / (this.state.numClasses - 1);
			dailyAcademicsInc += multiplier * dailyAcademicsInc;
			this.state.academics.current = this.boundStats(Math.round(100 * dailyAcademicsInc));
			this.state.academics.total += this.state.academics.current;
		}
	}, {
		key: "updateValues",
		value: function updateValues() {
			//square root function that is -1.5 at x = 0 and 0 at x = 50
			if (this.state.health.current < 50) {
				var multiplier = 0.21213 * Math.sqrt(this.state.health.current) - 1.5;
				this.state.fun.activityValue = Math.round(this.state.fun.defaultActivityValue * (1 + multiplier));
			}
			if (this.state.fun.activityValue < 0) this.state.fun.activityValue = 0;
		}
	}, {
		key: "updateDecay",
		value: function updateDecay() {
			var healthMultiplier = 0;
			var funMultiplier = 0;
			if (this.state.health.current < 50) {
				//upside down square root function that is 1.5 at x = 0 and 0 at x = 50
				healthMultiplier = -0.21213 * Math.sqrt(this.state.health.current) + 1.5;
				this.state.health.dailyDec = Math.round(this.state.health.defaultDailyDec * (1 + healthMultiplier));
			}
			if (this.state.fun.current < 50) {
				funMultiplier = -0.21213 * Math.sqrt(this.state.fun.current) + 1.5;
			}
			if (healthMultiplier >= funMultiplier) {
				this.state.fun.dailyDec = Math.round(this.state.fun.defaultDailyDec * (1 + healthMultiplier));
			} else {
				this.state.fun.dailyDec = Math.round(this.state.fun.defaultDailyDec * (1 + funMultiplier));
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
				this.updateCurrent();
				this.updateValues();
				this.updateDecay();
				var _ref5 = [0, 0, 0];
				this.state.fun.dailyActivityInc = _ref5[0];
				this.state.health.dailyActivityInc = _ref5[1];
				this.state.academics.dailyActivityInc = _ref5[2];
				var _ref6 = [0, 0, 0];
				this.state.fun.dailyEventInc = _ref6[0];
				this.state.health.dailyEventInc = _ref6[1];
				this.state.academics.dailyEventInc = _ref6[2];
				var _ref7 = [0, 0, 0];
				this.state.fun.inputHolder = _ref7[0];
				this.state.health.inputHolder = _ref7[1];
				this.state.academics.inputHolder = _ref7[2];

				this.setState(function (state) {
					return {
						messageType: "",
						day: state.day + 1,
						time: state.club.name == "none" ? state.startTime : state.startTime + state.club.hours,
						GPA: _this2.calculateGPA()
					};
				});
				if (!this.state.club.isEligible(this.state.health.current, this.state.GPA, this.state.fun.current)) {
					var clubName = this.state.club.name;
					this.setState({
						club: clubs.none,
						displayModal: true,
						modalType: "close",
						modalHeader: "You did not meet the requirements for the " + clubName,
						messageType: "warning"
					});
				} else {
					this.chooseEvent();
				}
			}
		}
	}, {
		key: "handleCloseModal",
		value: function handleCloseModal() {
			this.setState({
				displayModal: false,
				displayChooseClub: false,
				displayJoinClub: false,
				displayEventBox: false,
				displayHoursForm: false
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(Modal, { displayModal: this.state.displayModal, onCloseModal: this.handleCloseModal, type: this.state.modalType, header: this.state.modalHeader,
					messageType: this.state.messageType, onConfirmLeaveClubClick: this.handleConfirmLeaveClubClick,
					clubName: this.state.club.name,
					displayEventBox: this.state.displayEventBox, eventType: this.state.event.type, eventText: this.state.event.text, onEventHoursChange: this.handleEventHoursChange, onEventFormSubmit: this.handleEventFormSubmit, maxHours: this.state.event.maxHours,
					displayChooseClub: this.state.displayChooseClub, onChooseClubClick: this.handleChooseClubClick,
					displayHoursForm: this.state.displayHoursForm, hoursFormActivity: this.state.hoursFormActivity, onHoursSubmit: this.handleHoursSubmit, onHoursChange: this.handleHoursChange, calculateMaxHours: this.calculateMaxHours }),
				React.createElement(
					"div",
					{ className: "grid-container" },
					React.createElement(StartScreen, { displayStartScreen: this.state.displayStartScreen, onStart: this.handleStart, onClassSubmit: this.handleClassSubmit, onClassChange: this.handleClassChange }),
					React.createElement(DisplayStats, { displayStats: this.state.displayStats, day: this.state.day, time: this.state.time, clubName: this.state.club.name, health: this.state.health.current, GPA: this.state.GPA, fun: this.state.fun.current }),
					React.createElement(ChooseActivity, { displayChooseActivity: this.state.displayChooseActivity, onActivityClick: this.handleActivityClick, club: this.state.club, onJoinClubClick: this.handleJoinClubClick, onLeaveClubClick: this.handleLeaveClubClick, nextDay: this.nextDay, time: this.state.time, startTime: this.state.startTime + this.state.club.hours }),
					React.createElement(EndScreen, { displayEndScreen: this.state.displayEndScreen, health: this.state.health.current, GPA: this.state.GPA, fun: this.state.fun.current })
				)
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
					{ className: "grid-item screen" },
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
								{ className: "btn btn-form btn-green" },
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
						{ className: "btn btn-form btn-green", onClick: this.props.onJoinClubClick },
						"Join Club"
					);
				} else {
					return React.createElement(
						"button",
						{ className: "btn btn-form btn-red", onClick: this.props.onLeaveClubClick },
						"Leave Club"
					);
				}
			} else {
				if (this.props.club == clubs.none) {
					return React.createElement(
						"span",
						{ "class": "tooltip" },
						React.createElement(
							"button",
							{ disabled: true, className: "btn btn-form btn-green", onClick: this.props.onJoinClubClick },
							"Join Club"
						),
						React.createElement(
							"span",
							{ "class": "tooltip-text" },
							"You can only join a club right after school ends, at 3PM"
						)
					);
				} else {
					return React.createElement(
						"span",
						{ "class": "tooltip" },
						React.createElement(
							"button",
							{ disabled: true, className: "btn btn-form btn-red", onClick: this.props.onLeaveClubClick },
							"Leave Club"
						),
						React.createElement(
							"span",
							{ "class": "tooltip-text" },
							"You can only leave a club right after school ends, at 3PM, and not on the same day that you joined the club"
						)
					);
				}
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
					{ className: "grid-item right-bar" },
					React.createElement(
						"h2",
						null,
						"What do you want to do?"
					),
					React.createElement("input", { className: "btn btn-form", onClick: this.props.onActivityClick, type: "button", name: "exercise", value: "Exercise" }),
					React.createElement("input", { className: "btn btn-form", onClick: this.props.onActivityClick, type: "button", name: "study", value: "Study" }),
					React.createElement("input", { className: "btn btn-form", onClick: this.props.onActivityClick, type: "button", name: "playGames", value: "Play Video Games" }),
					React.createElement(ClubButton, { club: this.props.club, onJoinClubClick: this.props.onJoinClubClick, onLeaveClubClick: this.props.onLeaveClubClick, time: this.props.time, startTime: this.props.startTime }),
					React.createElement(
						"button",
						{ className: "btn btn-form btn-dark", onClick: this.props.nextDay },
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

var Modal = function (_React$Component5) {
	_inherits(Modal, _React$Component5);

	function Modal(props) {
		_classCallCheck(this, Modal);

		return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));
	}

	_createClass(Modal, [{
		key: "render",
		value: function render() {
			var close = this.props.type == "close" ? React.createElement(
				"span",
				{ onClick: this.props.onCloseModal, id: "close-modal" },
				"x"
			) : null;
			if (this.props.displayModal) {
				return React.createElement(
					"div",
					{ className: "modal" },
					React.createElement(
						"div",
						{ className: "modal-content" },
						close,
						React.createElement(
							"div",
							{ className: "modal-header" },
							React.createElement(
								"h2",
								null,
								this.props.header
							)
						),
						React.createElement(
							"div",
							{ className: "modal-body" },
							React.createElement(Message, { type: this.props.messageType, onConfirmLeaveClubClick: this.props.onConfirmLeaveClubClick, clubName: this.props.clubName }),
							React.createElement(EventBox, { displayEventBox: this.props.displayEventBox, eventType: this.props.eventType, eventText: this.props.eventText, onEventHoursChange: this.props.onEventHoursChange, onEventFormSubmit: this.props.onEventFormSubmit, maxHours: this.props.maxHours }),
							React.createElement(ChooseClub, { displayChooseClub: this.props.displayChooseClub, onChooseClubClick: this.props.onChooseClubClick }),
							React.createElement(HoursForm, { displayHoursForm: this.props.displayHoursForm, hoursFormActivity: this.props.hoursFormActivity, onHoursSubmit: this.props.onHoursSubmit, onHoursChange: this.props.onHoursChange, calculateMaxHours: this.props.calculateMaxHours })
						)
					)
				);
			} else {
				return null;
			}
		}
	}]);

	return Modal;
}(React.Component);

var ChooseClub = function (_React$Component6) {
	_inherits(ChooseClub, _React$Component6);

	function ChooseClub(props) {
		_classCallCheck(this, ChooseClub);

		return _possibleConstructorReturn(this, (ChooseClub.__proto__ || Object.getPrototypeOf(ChooseClub)).call(this, props));
	}

	_createClass(ChooseClub, [{
		key: "render",
		value: function render() {
			var _this8 = this;

			var buttons = Object.keys(clubs).map(function (club, i) {
				if (club != "none") {
					return React.createElement(
						"button",
						{ className: "btn btn-form", key: i, onClick: _this8.props.onChooseClubClick, name: club },
						clubs[club].name
					);
				}
			});
			if (this.props.displayChooseClub) {
				return React.createElement(
					"div",
					null,
					buttons
				);
			} else {
				return null;
			}
		}
	}]);

	return ChooseClub;
}(React.Component);

var HoursForm = function (_React$Component7) {
	_inherits(HoursForm, _React$Component7);

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
						"form",
						{ onSubmit: this.props.onHoursSubmit },
						React.createElement("input", { step: "1", min: "0", max: maxHours, type: "number", onChange: this.props.onHoursChange, name: this.props.hoursFormActivity }),
						React.createElement(
							"button",
							{ className: "btn btn-form" },
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

var Message = function (_React$Component8) {
	_inherits(Message, _React$Component8);

	function Message(props) {
		_classCallCheck(this, Message);

		var _this10 = _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, props));

		_this10.messages = {
			"warning": React.createElement(WarningMessage, { clubName: _this10.props.clubName }),
			"danger": React.createElement(DangerMessage, { clubName: _this10.props.clubName, onConfirmLeaveClubClick: _this10.props.onConfirmLeaveClubClick }),
			"success": React.createElement(SuccessMessage, { clubName: _this10.props.clubName })
		};
		return _this10;
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

var WarningMessage = function (_React$Component9) {
	_inherits(WarningMessage, _React$Component9);

	function WarningMessage(props) {
		_classCallCheck(this, WarningMessage);

		return _possibleConstructorReturn(this, (WarningMessage.__proto__ || Object.getPrototypeOf(WarningMessage)).call(this, props));
	}

	_createClass(WarningMessage, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"p",
				null,
				"If you wish to try out at another time, you may do so."
			);
		}
	}]);

	return WarningMessage;
}(React.Component);

var DangerMessage = function (_React$Component10) {
	_inherits(DangerMessage, _React$Component10);

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
					"p",
					null,
					"Each club requires commitment from its members. If you leave, you cannot rejoin."
				),
				React.createElement(
					"button",
					{ className: "btn btn-red", onClick: this.props.onConfirmLeaveClubClick },
					"I am sure I want to leave the club"
				)
			);
		}
	}]);

	return DangerMessage;
}(React.Component);

var SuccessMessage = function (_React$Component11) {
	_inherits(SuccessMessage, _React$Component11);

	function SuccessMessage(props) {
		_classCallCheck(this, SuccessMessage);

		return _possibleConstructorReturn(this, (SuccessMessage.__proto__ || Object.getPrototypeOf(SuccessMessage)).call(this, props));
	}

	_createClass(SuccessMessage, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"p",
					null,
					"You now spend the first 2 hours after school at the club. You find that you are more focused in a group setting, getting things done more efficiently."
				)
			);
		}
	}]);

	return SuccessMessage;
}(React.Component);

var EventBox = function (_React$Component12) {
	_inherits(EventBox, _React$Component12);

	function EventBox(props) {
		_classCallCheck(this, EventBox);

		return _possibleConstructorReturn(this, (EventBox.__proto__ || Object.getPrototypeOf(EventBox)).call(this, props));
	}

	_createClass(EventBox, [{
		key: "render",
		value: function render() {
			if (this.props.displayEventBox) {
				if (this.props.eventType == "inputForm") {
					return React.createElement(InputFormEventDisplay, { eventText: this.props.eventText, onEventHoursChange: this.props.onEventHoursChange, onEventFormSubmit: this.props.onEventFormSubmit, maxHours: this.props.maxHours });
				} else {
					return null;
				}
			} else {
				return null;
			}
		}
	}]);

	return EventBox;
}(React.Component);

var InputFormEventDisplay = function (_React$Component13) {
	_inherits(InputFormEventDisplay, _React$Component13);

	function InputFormEventDisplay(props) {
		_classCallCheck(this, InputFormEventDisplay);

		return _possibleConstructorReturn(this, (InputFormEventDisplay.__proto__ || Object.getPrototypeOf(InputFormEventDisplay)).call(this, props));
	}

	_createClass(InputFormEventDisplay, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"form",
					{ onSubmit: this.props.onEventFormSubmit },
					React.createElement(
						"div",
						null,
						React.createElement(
							"h4",
							null,
							"How many hours will you spend?"
						),
						React.createElement("input", { step: "1", type: "number", min: "0", max: this.props.maxHours, name: "eventInc", onChange: this.props.onEventHoursChange }),
						React.createElement(
							"button",
							{ className: "btn btn-form" },
							"Submit"
						)
					)
				)
			);
		}
	}]);

	return InputFormEventDisplay;
}(React.Component);

var DisplayStats = function (_React$Component14) {
	_inherits(DisplayStats, _React$Component14);

	function DisplayStats(props) {
		_classCallCheck(this, DisplayStats);

		return _possibleConstructorReturn(this, (DisplayStats.__proto__ || Object.getPrototypeOf(DisplayStats)).call(this, props));
	}

	_createClass(DisplayStats, [{
		key: "fogStats",
		value: function fogStats(stat) {
			if (stat <= 20) {
				return "awful";
			} else if (stat <= 40) {
				return "bad";
			} else if (stat <= 60) {
				return "okay";
			} else if (stat <= 80) {
				return "good";
			} else {
				return "great";
			}
		}
	}, {
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
					{ className: "grid-item left-bar" },
					React.createElement(
						"h1",
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
						this.fogStats(this.props.health)
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
						this.fogStats(this.props.fun)
					)
				);
			} else {
				return null;
			}
		}
	}]);

	return DisplayStats;
}(React.Component);

var EndScreen = function (_React$Component15) {
	_inherits(EndScreen, _React$Component15);

	function EndScreen(props) {
		_classCallCheck(this, EndScreen);

		return _possibleConstructorReturn(this, (EndScreen.__proto__ || Object.getPrototypeOf(EndScreen)).call(this, props));
	}

	_createClass(EndScreen, [{
		key: "healthMessage",
		value: function healthMessage(health) {
			if (health <= 20) {
				return "Your health is abysmal. You have no physical strength whatsoever.";
			} else if (health <= 40) {
				return "Your health is bad. You are weak.";
			} else if (health <= 60) {
				return "Your health is okay.";
			} else if (health <= 80) {
				return "Your health is good. You are fit and healthy.";
			} else {
				return "Your health is excellent. You are in great physical shape.";
			}
		}
	}, {
		key: "GPAMessage",
		value: function GPAMessage(GPA) {
			var message = "You ended with a GPA of " + GPA + ". ";
			if (GPA < 1.0) {
				message += "Your GPA was too low to graduate and you failed out of high school. You will need to repeat this year.";
			} else if (GPA >= 4.9) {
				message += "You are the valedictorian of your class.";
			} else if (GPA >= 4.5) {
				message += "You graduated with high honors.";
			} else if (GPA >= 4.0) {
				message += "You graduated with honors.";
			}
			return message;
		}
	}, {
		key: "funMessage",
		value: function funMessage(fun) {
			if (fun <= 20) {
				return "You are not enjoying life at all and had a depressing year.";
			} else if (fun <= 40) {
				return "You have a few good days, but you are mostly unhappy.";
			} else if (fun <= 60) {
				return "You feel fine, neither happy nor unhappy.";
			} else if (fun <= 80) {
				return "You are a happy person.";
			} else {
				return "You are a very happy person, and are enjoying life to its fullest.";
			}
		}
	}, {
		key: "render",
		value: function render() {

			if (this.props.displayEndScreen) {
				return React.createElement(
					"div",
					{ className: "grid-item screen" },
					React.createElement(
						"h1",
						null,
						"HIGH SCHOOL IS OVER"
					),
					React.createElement(
						"h2",
						null,
						this.healthMessage(this.props.health)
					),
					React.createElement(
						"h2",
						null,
						this.GPAMessage(this.props.GPA)
					),
					React.createElement(
						"h2",
						null,
						this.funMessage(this.props.fun)
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