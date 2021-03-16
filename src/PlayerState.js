"use strict";
//name, hours, healthInc, academicsInc, funInc, healthReq, GPAReq, funReq
const clubs = {
	"none": new Club("none", 0, 0, 0, 0, 0, 0, 0),
	"Soccer Team": new Club("Soccer Team", 2, 20, 0, 0, 70, 2.0, 0),
	"Quiz Bowl": new Club("Quiz Bowl", 2, 0, 3, 0, 0, 3.5, 0),
	"Comedy Club": new Club("Comedy Club", 2, 0, 0, 20, 0, 2.0, 70),
}
//have events for a club
/* EVENT
name, type, text, healthInc, funInc, GPAInc, 
USER INPUT EVENT
name, text, healthInc, funInc, academicsInc, maxHours, healthDec, funDec, academicsDec,
inc = if yes dec = if no
*/

//popQuiz, hangout, bullies, substitute, slept through alarm, pizza for lunch, meme
const events = {
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
}

let eventPool = []

//adds one of every event
for (let key of Object.keys(events)) {
	if(key != "none") {
		eventPool.push(events[key]);
	}
}

class PlayerState extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayStartScreen:true,
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
			eventProb: 0.5,
			necessarySleepHours: 8,
		}
		this.handleStart = this.handleStart.bind(this);
		this.handleClassChange = this.handleClassChange.bind(this);
		this.handleActivityClick = this.handleActivityClick.bind(this);
		this.handleHoursChange = this.handleHoursChange.bind(this);
		this.calculateMaxHours = this.calculateMaxHours.bind(this);
		this.handleHoursSubmit = this.handleHoursSubmit.bind(this);
		this.handleJoinClubClick = this.handleJoinClubClick.bind(this);
		this.handleChooseClubClick = this.handleChooseClubClick.bind(this);
		this.handleLeaveClubClick = this.handleLeaveClubClick.bind(this);
		this.handleConfirmLeaveClubClick = this.handleConfirmLeaveClubClick.bind(this);
		this.handleEventHoursChange = this.handleEventHoursChange.bind(this);
		this.handleEventFormSubmit = this.handleEventFormSubmit.bind(this);
		this.chooseEvent = this.chooseEvent.bind(this);
		this.updateCurrent = this.updateCurrent.bind(this);
		this.updateValues = this.updateValues.bind(this);
		this.updateDecay = this.updateDecay.bind(this);
		this.calculateSleepDecay = this.calculateSleepDecay.bind(this);
		this.calculateGPA = this.calculateGPA.bind(this);
		this.nextDay = this.nextDay.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleStart() {
		this.setState({displayStartScreen: false, displayStats: true, displayChooseActivity: true,});
	}

	handleClassChange(e) {
		this.setState({numClasses:parseInt(e.target.value)});
	}

	handleClassSubmit(e) {
		e.preventDefault();
	}

	handleActivityClick(e) {
		e.preventDefault();
		this.setState({
			displayModal: true, 
			modalType: "close",
			modalHeader: "How many hours do you want to spend?",
			displayHoursForm: true, 
			displayEventBox: false, 
			displayChooseClub: false,
			messageType: "", 
			hoursFormActivity: e.target.name,
		});
	}

	handleHoursChange(e) {
		e.preventDefault();
		if (e.target.value) {
			this.setState({timeInc: parseInt(e.target.value)});
			if (this.state.hoursFormActivity == "exercise") {
				this.state.health.inputHolder = parseInt(e.target.value);
			} else if (this.state.hoursFormActivity == "study") {
				this.state.academics.inputHolder = parseInt(e.target.value);
			} else if (this.state.hoursFormActivity == "playGames") {
				this.state.fun.inputHolder = parseInt(e.target.value);
			}
		} else {
			this.setState({timeInc: 0,});
			[this.state.health.inputHolder, this.state.academics.inputHolder, this.state.fun.inputHolder] = [0, 0, 0];
		}
	}

	calculateMaxHours() {
		if (this.state.time > this.state.wakeUpTime) {
			return 24 - this.state.time + this.state.wakeUpTime;
		} else {
			return this.state.wakeUpTime - this.state.time;
		}
	}

	handleHoursSubmit(e) {
		e.preventDefault();
		let currentTime = this.state.time + parseInt(this.state.timeInc);
		currentTime = currentTime < 24 ? currentTime : currentTime-24;
		if (this.state.hoursFormActivity == "exercise") {
			this.state.health.dailyActivityInc += this.state.health.inputHolder;
		} else if (this.state.hoursFormActivity == "study") {
			this.state.academics.dailyActivityInc += this.state.academics.inputHolder;
		} else if (this.state.hoursFormActivity == "playGames") {
			this.state.fun.dailyActivityInc += this.state.fun.inputHolder;
		}
		this.setState({displayModal: false, displayHoursForm: false, time: currentTime, timeInc: 0});
		[this.state.health.inputHolder, this.state.academics.inputHolder, this.state.fun.inputHolder] = [0, 0, 0];
	}

	handleJoinClubClick() {
		this.setState({
			displayModal: true, 
			modalType: "close",
			modalHeader: "What club do you want to try out for?",
			displayChooseClub: true, 
			displayEventBox: false, 
			messageType: ""
		});
	}

	handleChooseClubClick(e) {
		if (clubs[e.target.name].isEligible(this.state.health.current, this.state.GPA, this.state.fun.current)) {
			this.setState({
				modalType: "close",
				modalHeader: "You have successfully joined this club!",
				messageType: "success",
				displayChooseClub: false,
				club: clubs[e.target.name],
			});
		} else {
			this.setState({
				modalType: "close",
				modalHeader: "You did not meet the requirements for this club",
				messageType: "warning"
			});
		}
		this.setState({displayChooseClub: false, displayChooseActivity: true,});
	}

	handleLeaveClubClick() {
		this.setState({displayChooseActivity: false, displayEventBox: false, messageType: "danger"});
	}

	handleConfirmLeaveClubClick() {
		delete clubs[this.state.club.name];
		this.setState({displayChooseActivity: true, messageType: "", club: clubs.none, });
	}

	handleEventHoursChange(e) {
		e.preventDefault();
		if (e.target.value) {
			[this.state.health.inputHolder, this.state.fun.inputHolder, this.state.academics.inputHolder] = [parseInt(e.target.value), parseInt(e.target.value), parseInt(e.target.value)];
		} else {
			[this.state.health.inputHolder, this.state.fun.inputHolder, this.state.academics.inputHolder] = [0, 0, 0];
		}
	}

	handleEventFormSubmit(e) {
		e.preventDefault();
		this.state.health.inputHolder == 0 ? this.state.health.dailyEventInc -= this.state.event.healthDec : this.state.health.dailyEventInc += this.state.health.inputHolder * this.state.event.healthInc;
		this.state.fun.inputHolder == 0 ? this.state.fun.dailyEventInc -= this.state.event.funDec : this.state.fun.dailyEventInc += this.state.fun.inputHolder * this.state.event.funInc;
		this.state.academics.inputHolder == 0 ? this.state.academics.dailyEventInc -= this.state.event.academicsDec : this.state.academics.dailyEventInc += this.state.academics.inputHolder * this.state.event.academicsInc;
		this.setState((state) => ({
			displayModal: false,
			displayChooseActivity: true,
			displayEventBox: false,
			time: state.time + state.health.inputHolder,
		}))
	}

	chooseEvent() {
		if (Math.random() <= this.state.eventProb) {
			let event = eventPool[Math.floor(Math.random() * eventPool.length)];
			this.setState({
				displayModal: true, 
				modalHeader: event.text,
				displayEventBox: true, 
				event: event
			});
			if (event.type == "inputForm") {
				this.setState({modalType: "unclosable"});
			} else {
				this.setState({modalType: "close"});
				this.state.health.current += event.healthInc;
				this.state.academics.current += event.academicsInc;
				this.state.fun.current += event.funInc;
			}
		} else {
			this.setState({
				displayModal: false, 
				displayEventBox: false, 
				event: events.none});
		}
	}

	boundStats(stat) {
		if (stat <= 100 && stat >= 0) {
			return stat;
		} else {
			return stat > 100 ? 100 : 0;
		}
	}

	updateCurrent() {
		this.state.health.current = this.boundStats(this.state.health.current + this.state.health.dailyActivityInc * this.state.health.activityValue - this.state.health.dailyDec - this.calculateSleepDecay() + this.state.club.healthInc + this.state.health.dailyEventInc);
		this.state.fun.current = this.boundStats(this.state.fun.current + this.state.fun.dailyActivityInc * this.state.fun.activityValue + this.state.club.funInc - this.state.fun.dailyDec + this.state.fun.dailyEventInc);
		//square root function that is 0 at x = 50 and 0.5 at x = 100
		let multiplier = 0.17071 * Math.sqrt(this.state.health.current) - 1.20711;
		let dailyAcademicsInc = (this.state.academics.dailyActivityInc + this.state.club.academicsInc)/(this.state.numClasses-1);
		dailyAcademicsInc += multiplier * dailyAcademicsInc;
		this.state.academics.current = this.boundStats(Math.round(100 * dailyAcademicsInc));
		this.state.academics.total += this.state.academics.current;
	}

	updateValues() {
		//square root function that is -1.5 at x = 0 and 0 at x = 50
		if (this.state.health.current < 50) {
			let multiplier = 0.21213 * Math.sqrt(this.state.health.current) - 1.5;
			this.state.fun.activityValue = Math.round(this.state.fun.defaultActivityValue * (1 + multiplier));
		}		
		if (this.state.fun.activityValue < 0 ) this.state.fun.activityValue = 0;

	}

	updateDecay() {
		let healthMultiplier = 0;
		let funMultiplier = 0;
		if (this.state.health.current < 50) {
			//upside down square root function that is 1.5 at x = 0 and 0 at x = 50
			healthMultiplier = -0.21213 * Math.sqrt(this.state.health.current) + 1.5;
			this.state.health.dailyDec = Math.round(this.state.health.defaultDailyDec * (1 + healthMultiplier));
		}
		if (this.state.fun.current < 50) {
			funMultiplier = -0.21213 * Math.sqrt(this.state.fun.current) + 1.5;
		}
		if (healthMultiplier >= funMultiplier) {
			this.state.fun.dailyDec = Math.round(this.state.fun.defaultDailyDec * (1 + healthMultiplier))
		} else {
			this.state.fun.dailyDec = Math.round(this.state.fun.defaultDailyDec * (1 + funMultiplier))
		}
	}

	calculateSleepDecay() {
		let sleepDecay = 0;
		if (this.state.time < this.state.wakeUpTime && (this.state.wakeUpTime - this.state.time) < this.state.necessarySleepHours) {
			sleepDecay = this.state.sleepValue*(this.state.necessarySleepHours-(this.state.wakeUpTime - this.state.time));
		} else if (this.state.time > this.state.wakeUpTime && ((24 - this.state.time + this.state.wakeUpTime) < this.state.necessarySleepHours)) {
			sleepDecay = this.state.sleepValue*(this.state.necessarySleepHours-(24 - this.state.time + this.state.wakeUpTime));
		}
		return sleepDecay >= 0 ? sleepDecay : 0;
	}

	calculateGPA() {
		let GPA  = Math.round(100*((this.state.academics.total/this.state.day)/20 - 1))/100;
		if (this.state.numClasses == 5){
			GPA += 0.5;
		} else if (this.state.numClasses == 6){
			GPA += 1;
		}
		return GPA >= 0 ? GPA : 0;
	}

	nextDay(e) {
		e.preventDefault();
		if (this.state.day == this.state.lastDay) {
			this.setState({displayChooseActivity: false, displayStats: false, displayEventBox: false, displayEndScreen: true});
		} else {
			this.updateCurrent();
			this.updateValues();
			this.updateDecay();
			[this.state.fun.dailyActivityInc, this.state.health.dailyActivityInc, this.state.academics.dailyActivityInc] = [0, 0, 0];
			[this.state.fun.dailyEventInc, this.state.health.dailyEventInc, this.state.academics.dailyEventInc] = [0, 0, 0];
			[this.state.fun.inputHolder, this.state.health.inputHolder, this.state.academics.inputHolder] = [0, 0, 0];
			this.setState((state) => ({
				messageType: "",
				day: state.day + 1,
				time: state.club.name == "none" ? state.startTime : state.startTime + state.club.hours,
				GPA: this.calculateGPA(),
			}));
			if (!this.state.club.isEligible(this.state.health.current, this.state.GPA, this.state.fun.current)) {
				this.setState({
					club: clubs.none,
					displayModal: true,
					modalType: "close",
					modalHeader: "You did not meet the requirements for this club",
					messageType: "warning"
				});
			} else {
				this.chooseEvent();
			}
		}
	}

	handleCloseModal() {
		this.setState({
			displayModal: false,
			displayChooseClub: false,
			displayJoinClub: false,
			displayEventBox: false,
			displayHoursForm: false,
		});
	}

	render() {
		return (
			<div> 
				<Modal displayModal={this.state.displayModal} onCloseModal={this.handleCloseModal} type={this.state.modalType} header={this.state.modalHeader}
					messageType={this.state.messageType} onConfirmLeaveClubClick={this.handleConfirmLeaveClubClick}
					displayEventBox={this.state.displayEventBox} eventType={this.state.event.type} eventText={this.state.event.text} onEventHoursChange={this.handleEventHoursChange} onEventFormSubmit={this.handleEventFormSubmit} maxHours={this.state.event.maxHours}
					displayChooseClub={this.state.displayChooseClub} onChooseClubClick={this.handleChooseClubClick} 
					displayHoursForm={this.state.displayHoursForm} hoursFormActivity={this.state.hoursFormActivity} onHoursSubmit={this.handleHoursSubmit} onHoursChange={this.handleHoursChange} calculateMaxHours={this.calculateMaxHours}>
				</Modal>
				<div className="grid-container">
					<StartScreen displayStartScreen={this.state.displayStartScreen} onStart={this.handleStart} onClassSubmit={this.handleClassSubmit} onClassChange={this.handleClassChange}/>
					<DisplayStats displayStats={this.state.displayStats} day={this.state.day} time={this.state.time} clubName={this.state.club.name} health={this.state.health.current} GPA={this.state.GPA} fun={this.state.fun.current}/>
					<ChooseActivity displayChooseActivity={this.state.displayChooseActivity} onActivityClick={this.handleActivityClick} club={this.state.club} onJoinClubClick={this.handleJoinClubClick} onLeaveClubClick={this.handleLeaveClubClick} nextDay={this.nextDay} time={this.state.time} startTime={this.state.startTime + this.state.club.hours}/>
					<EndScreen displayEndScreen={this.state.displayEndScreen} health={this.state.health.current} GPA={this.state.GPA} fun={this.state.fun.current}/>
				</div>
			</div>

		);
	}
}

class StartScreen extends React.Component {
	constructor(props) {
		super(props);
		this.handleStart = this.handleStart.bind(this);
	}

	handleStart(e) {
		this.props.onStart();
		this.props.onClassSubmit(e);
	}

	render() {
		if (this.props.displayStartScreen) {
			return (
				<div className="grid-item screen">
					<h1>The Funnest Bestest Game Ever</h1>
					<h3>How many classes will you be taking</h3>
					<form onSubmit={this.handleStart} onChange={this.props.onClassChange}>
						<div>
							<input type="radio" name="numClasses" value="4" defaultChecked/>
							<label htmlFor="4">4</label>
							<input type="radio" name="numClasses" value="5"/>
							<label htmlFor="5">5</label>
							<input type="radio" name="numClasses" value="6"/>
							<label htmlFor="6">6</label>
						</div>
						<div>
							<button className="btn btn-form btn-green">Start</button>
						</div>
					</form>
				</div>
			)
		} else {
			return null;
		}
	}
}

class ClubButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.time == this.props.startTime) {
			if (this.props.club == clubs.none) {
				return (
					<button className="btn btn-form btn-green" onClick={this.props.onJoinClubClick}>Join Club</button>
				);
			} else {
				return (
					<button className="btn btn-form" onClick={this.props.onLeaveClubClick}>Leave Club</button>
				);
			}
		} else {
			return null;
		}
	}
}

class ChooseActivity extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.displayChooseActivity) {
			return (
				<div className="grid-item right-bar">
					<h2>What do you want to do?</h2>
					<input className="btn btn-form" onClick={this.props.onActivityClick} type="button" name="exercise" value="Exercise"/>
					<input className="btn btn-form" onClick={this.props.onActivityClick} type="button" name="study" value="Study"/>
					<input className="btn btn-form" onClick={this.props.onActivityClick} type="button" name="playGames" value="Play Videogames"/>
					<ClubButton club={this.props.club} onJoinClubClick={this.props.onJoinClubClick} onLeaveClubClick={this.props.onLeaveClubClick} time={this.props.time} startTime={this.props.startTime}/>
					<button className="btn btn-form btn-dark" onClick={this.props.nextDay}>Sleep</button>
				</div>
			)
		} else {
			return null;
		}
	}
}

class Modal extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let close = this.props.type == "close" ? <span onClick={this.props.onCloseModal} id="close-modal">x</span> : null
		if (this.props.displayModal) {
			return (
				<div className="modal">
					<div className="modal-content">
						{close}
						<div className="modal-header">
							<h2>
								{this.props.header}
							</h2>
						</div>
						<div className="modal-body">
							<Message type={this.props.messageType} onConfirmLeaveClubClick={this.props.onConfirmLeaveClubClick}></Message>
							<EventBox displayEventBox={this.props.displayEventBox} eventType={this.props.eventType} eventText={this.props.eventText} onEventHoursChange={this.props.onEventHoursChange} onEventFormSubmit={this.props.onEventFormSubmit} maxHours={this.props.maxHours}/>
							<ChooseClub displayChooseClub={this.props.displayChooseClub} onChooseClubClick={this.props.onChooseClubClick}></ChooseClub>
							<HoursForm displayHoursForm={this.props.displayHoursForm} hoursFormActivity={this.props.hoursFormActivity} onHoursSubmit={this.props.onHoursSubmit} onHoursChange={this.props.onHoursChange} calculateMaxHours={this.props.calculateMaxHours}/>
						</div>
					</div>
				</div>
			)
		} else {
			return null;
		}
	}
}

class ChooseClub extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const buttons = Object.keys(clubs).map((club, i) => {
			if (club != "none") {
				return <button className="btn btn-form" key={i} onClick={this.props.onChooseClubClick} name={club}>{clubs[club].name}</button>
			}
		})
		if (this.props.displayChooseClub) {
			return (
				<div>
					{buttons}
				</div>
			)
		} else {
			return null;
		}
	}
}

class HoursForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.displayHoursForm) {
			let maxHours = this.props.calculateMaxHours();
			return (
				<div>
					<form onSubmit={this.props.onHoursSubmit}>
						<input step="1" min="0" max={maxHours} type="number" onChange={this.props.onHoursChange} name={this.props.hoursFormActivity}/>
						<button className="btn btn-form">Submit</button>
					</form>
				</div>
			)
		} else {
			return null;
		}
	}
}

class Message extends React.Component {
	constructor(props) {
		super(props);
		this.messages = {
			"warning": <WarningMessage></WarningMessage>,
			"danger": <DangerMessage onConfirmLeaveClubClick={this.props.onConfirmLeaveClubClick}></DangerMessage>,
			"success": <SuccessMessage></SuccessMessage>
		}
	}

	render() {
		if (this.props.type in this.messages) {
			return this.messages[this.props.type];
		} else {
			return null;
		}
	}
}

//the names of these classes are based off of the bootstrap colors

class WarningMessage extends React.Component {
	render() {
		return (
			<p>If you wish to try out for this club at another time, you may do so.</p>
		)

	}
}

class DangerMessage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>ARE YOU SURE YOU WANT TO LEAVE THIS CLUB?</h1>
				<h1>IF YOU LEAVE THE CLUB YOU CANNOT REJOIN BECAUSE YOUR CLUB MEMBERS NEED COMMITMENT</h1>
				<button className="btn" onClick={this.props.onConfirmLeaveClubClick}>I am sure I want to leave the club</button>
			</div>
		)
	}
}

class SuccessMessage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<p>You now spend the first 2 hours after school at this club. You find that you are more focused in a group setting, and get things done more efficiently.</p>
			</div>
		)
	}
}

class EventBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.displayEventBox) {
			if (this.props.eventType == "inputForm") {
				return (
					<InputFormEventDisplay eventText={this.props.eventText} onEventHoursChange={this.props.onEventHoursChange} onEventFormSubmit={this.props.onEventFormSubmit} maxHours={this.props.maxHours}/>
				)
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
}

class InputFormEventDisplay extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div>
				<form onSubmit={this.props.onEventFormSubmit}>
					<div>
						<h4>How many hours will you spend?</h4>
						<input step="1" type="number" min="0" max={this.props.maxHours} name="eventInc" onChange={this.props.onEventHoursChange}/>
						<button className="btn btn-form">Submit</button>
					</div>
				</form>
			</div>
		)
	}
}

class DisplayStats extends React.Component {
	constructor(props) {
		super(props);
	}

	fogStats(stat) {
		if (stat <= 20) {
			return "awful"
		} else if (stat <= 40) {
			return "bad"
		} else if (stat <= 60) {
			return "okay"
		} else if (stat <= 80) {
			return "good"
		} else {
			return "great"
		}
	}

	render() {
		if (this.props.displayStats) {
			let timeDisplay;
			if (this.props.time == 0) {
				timeDisplay = "12 AM";
			} else if (this.props.time == 12) {
				timeDisplay = "12 PM";
			} else if (this.props.time < 12) {
				timeDisplay = this.props.time + " AM"
			} else {
				timeDisplay = this.props.time%12 + " PM"
			}
			return (
				<div className="grid-item left-bar">
					<h1>GAME STATE</h1>
					<h2>DAY {this.props.day} TIME {timeDisplay}</h2>
					<h3>CLUB: {this.props.clubName}</h3>
					<h3>HEALTH: {this.fogStats(this.props.health)}</h3>
					<h3>GPA: {this.props.GPA}</h3>
					<h3>FUN: {this.fogStats(this.props.fun)}</h3>
				</div>
			)
		} else {
			return null;
		}
	}
}

class EndScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.displayEndScreen) {
			return (
				<div className="grid-item screen">
					<h1>HIGH SCHOOL IS OVER</h1>
					<h2>Your Health: {this.props.health}</h2>
					<h2>Your GPA: {this.props.GPA}</h2>
					<h2>Your Fun: {this.props.fun}</h2>
				</div>
			)
		} else {
			return null;
		}
	}
}

let display = document.querySelector("#display");
ReactDOM.render(<PlayerState />, display);
