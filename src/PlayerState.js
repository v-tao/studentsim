"use strict";
class Club {
    constructor(name, hours, healthInc, GPAInc, funInc) {
        this.name = name;
        this.hours = hours;
        this.healthInc = healthInc;
        this.GPAInc = GPAInc;
        this.funInc = funInc;
    }

	getName() {
		return this.name;
	}

	getHours() {
		return this.hours;
	}
	
	getHealthInc() {
		return this.healthInc;
	}

	getGPAInc() {
		return this.GPAInc;
	}

	getFunInc() {
		return this.funInc;
	}

    print() {
        console.log("name: " + this.name);
        console.log("hours: " + this.hours);
        console.log("healthInc: " + this.healthInc);
        console.log("GPAInc: " + this.GPAInc);
        console.log("funInc: " + this.funInc);
    }
}

const clubs = {
	soccerClub: new Club("Soccer Team", 2, 2, 0, 2),
	quizClub: new Club("Quiz Bowl", 2, 0, 2, 2),
	comedyClub: new Club("Comedy Club", 2, 0, 0, 4),
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
			hoursFormActivity: "",
			numClasses: 4,
			day: 1,
			lastDay: 14,
			startTime: 15,
			wakeUpTime: 6,
			time: 15,
			timeInc: 0,
			maxGPA: 4.00,
			totalGP: 0.00,
			GPAInc: 0,
			dailyGPAInc: 0,
			fun: 50,
			funDecay: 10,
			funInc: 0,
			funValue: 10,
			dailyFunInc: 0,
			health: 50,
			healthDecay: 10,
			healthInc: 0,
			healthValue: 10,
			dailyHealthInc: 0,
			club: "none",
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
		this.nextDay = this.nextDay.bind(this);
	}

	handleStart() {
		this.setState({displayStartScreen: false, displayStats: true, displayChooseActivity: true,});
	}

	handleClassChange(e) {
		this.setState({numClasses:e.target.value});
		if (e.target.value == 4) {
			this.setState({maxGPA: 4.00});
		} else if (e.target.value == 5) {
			this.setState({maxGPA: 4.50});
		} else if (e.target.value == 6) {
			this.setState({maxGPA: 5.00});
		}
	}

	handleClassSubmit(e) {
		e.preventDefault();
	}

	handleActivityClick(activity) {
		this.setState({displayHoursForm: true, displayChooseActivity: false});
		this.setState({hoursFormActivity: activity});
	}

	handleHoursChange(e, activity) {
		if (e.target.value) {
			this.setState((state) => ({timeInc: parseInt(e.target.value)}));
			if (activity == "exercise") {
				this.setState((state) => ({healthInc: parseInt(e.target.value)}));
			} else if (activity == "study") {
				this.setState((state) => ({GPAInc: parseInt(e.target.value)}));
			} else if (activity == "playGames") {
				this.setState((state) => ({funInc: parseInt(e.target.value)}))
			}
		} else {
			this.setState({
				timeInc: 0,
				healthInc: 0,
				GPAInc: 0,
				funInc: 0,
			});
		}
	}

	calculateMaxHours() {
		if (this.state.time > this.state.wakeUpTime) {
			return 24 - this.state.time + this.state.wakeUpTime;
		} else {
			return this.state.wakeUpTime - this.state.time;
		}
	}

	handleHoursSubmit(activity) {
		let currentTime = this.state.time + parseInt(this.state.timeInc);
		if (currentTime >= 24) {
			currentTime -= 24;
		}
		if (activity == "exercise") {
			this.setState((state) => ({dailyHealthInc: state.dailyHealthInc + state.healthInc}));
		} else if (activity == "study") {
			this.setState((state) => ({dailyGPAInc: state.dailyGPAInc + state.GPAInc}));
		} else if (activity == "playGames") {
			this.setState((state) => ({dailyFunInc: state.dailyFunInc + state.funInc}));
		}
		this.setState((state) => ({
			displayHoursForm: false, 
			displayChooseActivity: true,
			time: currentTime,
			timeInc: 0,
			healthInc: 0,
			GPAInc: 0,
			funInc: 0,
		}));
	}

	handleJoinClubClick() {
		this.setState({
			displayChooseClub: true,
			displayChooseActivity: false,
		});
	}

	handleChooseClubClick(e) {
		this.setState({
			club: e.target.name,
			displayChooseClub: false,
			displayChooseActivity: true,
		})
	}

	handleLeaveClubClick() {
		this.setState({
			club: "none"
		})
	}

	boundStats(stat) {
		if (stat > 100) {
			return 100;
		} else if (stat < 0) {
			return 0;
		} else {
			return stat;
		}
	}

	nextDay(e) {
		e.preventDefault();
		if (this.state.day == this.state.lastDay) {
			this.setState({displayStats: false, displayEndScreen: true});
		} else {
			let percentage = this.state.dailyGPAInc/this.state.numClasses;
			if (percentage > 1) {
				percentage = 1;
			}
			let sleepDecay = 0;
			if (this.state.time < this.state.wakeUpTime && (this.state.wakeUpTime - this.state.time) < this.state.necessarySleepHours) {
				sleepDecay = this.state.healthValue*(this.state.necessarySleepHours-(this.state.wakeUpTime - this.state.time));
			} else if (this.state.time > this.state.wakeUpTime && ((24 - this.state.time + this.state.wakeUpTime) < this.state.necessarySleepHours)) {
				sleepDecay = this.state.healthValue*(this.state.necessarySleepHours-(24 - this.state.time + this.state.wakeUpTime));
			}
			
			let funAmount = this.boundStats(this.state.fun + this.state.dailyFunInc * this.state.funValue - this.state.funDecay);
			let healthAmount = this.boundStats(this.state.health + this.state.dailyHealthInc * this.state.healthValue - this.state.healthDecay - sleepDecay);
			this.setState((state) => ({
				day: state.day + 1,
				time: state.startTime,
				health: healthAmount,
				fun: funAmount,
				totalGP: state.totalGP + percentage * state.maxGPA,
				healthInc: 0,
				funInc: 0,
				GPAInc: 0,
				dailyHealthInc: 0,
				dailyFunInc: 0,
				dailyGPAInc: 0,
			}));
		}
	}

	render() {
		let GPA = Math.round(this.state.totalGP/(this.state.day-1) * 100)/100;
		let clubName = "none";
		if (this.state.club != "none") {
			clubName = clubs[this.state.club].getName();
		}
		return (
			<div>
				<StartScreen displayStartScreen={this.state.displayStartScreen} onStart={this.handleStart} onClassSubmit={this.handleClassSubmit} onClassChange={this.handleClassChange}/>
				<ChooseActivity displayChooseActivity={this.state.displayChooseActivity} onActivityClick={this.handleActivityClick} club={this.state.club} onJoinClubClick={this.handleJoinClubClick} onLeaveClubClick={this.handleLeaveClubClick} nextDay={this.nextDay}/>
				<ChooseClub displayChooseClub={this.state.displayChooseClub} onChooseClubClick={this.handleChooseClubClick}/>
				<HoursForm displayHoursForm={this.state.displayHoursForm} hoursFormActivity={this.state.hoursFormActivity} onHoursSubmit={this.handleHoursSubmit} onHoursChange={this.handleHoursChange} calculateMaxHours={this.calculateMaxHours}/>
				<DisplayStats displayStats={this.state.displayStats} day={this.state.day} time={this.state.time} clubName={clubName} health={this.state.health} GPA={GPA} fun={this.state.fun}/>
				<EndScreen displayEndScreen={this.state.displayEndScreen} health={this.state.health} GPA={GPA} fun={this.state.fun}/>
			</div>

		);
	}
}

class StartScreen extends React.Component {
	constructor(props) {
		super(props);
		this.handleStart = this.handleStart.bind(this);
		this.handleClassChange = this.handleClassChange.bind(this);
	}

	handleStart(e) {
		this.props.onStart();
		this.props.onClassSubmit(e);
	}

	handleClassChange(e) {
		this.props.onClassChange(e);
	}

	render() {
		if (this.props.displayStartScreen) {
			return (
				<div>
					<h1>The Funnest Bestest Game Ever</h1>
					<h3>How many classes will you be taking</h3>
					<form onSubmit={this.handleStart} onChange={this.handleClassChange}>
						<div>
							<input type="radio" name="numClasses" value="4" defaultChecked/>
							<label htmlFor="4">4</label>
							<input type="radio" name="numClasses" value="5"/>
							<label htmlFor="5">5</label>
							<input type="radio" name="numClasses" value="6"/>
							<label htmlFor="6">6</label>
						</div>
						<div>
							<button>Start</button>
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
		if (this.props.club == "none") {
			return (
				<button onClick={this.props.onJoinClubClick}>Join Club</button>
			);
		} else {
			return (
				<button onClick={this.props.onLeaveClubClick}>Leave Club</button>
			);
		}
	}
}

class ChooseActivity extends React.Component {
	constructor(props) {
		super(props);
		this.handleActivityClick = this.handleActivityClick.bind(this);
	}

	handleActivityClick(e) {
		e.preventDefault();
		this.props.onActivityClick(e.target.name)
	}

	render() {
		if (this.props.displayChooseActivity) {
			return (
				<div>
					<h2>What do you want to do?</h2>
					<input onClick={this.handleActivityClick} type="button" name="exercise" value="Exercise"/>
					<input onClick={this.handleActivityClick} type="button" name="study" value="Study"/>
					<input onClick={this.handleActivityClick} type="button" name="playGames" value="Play Videogames"/>
					<ClubButton club={this.props.club} onJoinClubClick={this.props.onJoinClubClick} onLeaveClubClick={this.props.onLeaveClubClick}/>
					<button onClick={this.props.nextDay}>Sleep</button>
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
		this.handleChooseClubClick = this.handleChooseClubClick.bind(this);
	}

	handleChooseClubClick(e) {
		this.props.onChooseClubClick(e);
	}

	render() {
		const buttons = Object.keys(clubs).map((club, i) => {
			return <button key={i} onClick={this.handleChooseClubClick} name={club}>{clubs[club].getName()}</button>
		})
		if (this.props.displayChooseClub) {
			return (
				<div>
					<h2>What club do you want to try out for?</h2>
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
		this.handleHoursChange = this.handleHoursChange.bind(this);
		this.handleHoursSubmit = this.handleHoursSubmit.bind(this);
	}

	handleHoursChange(e) {
		this.props.onHoursChange(e, this.props.hoursFormActivity);
	}

	handleHoursSubmit(e) {
		e.preventDefault();
		this.props.onHoursSubmit(this.props.hoursFormActivity);
	}

	render() {
		if (this.props.displayHoursForm) {
			let maxHours = this.props.calculateMaxHours();
			return (
				<div>
					<h3>How many hours do you want to spend?</h3>
					<form onSubmit={this.handleHoursSubmit}>
						<input step="1" min="0" max={maxHours} type="number" onChange={this.handleHoursChange} name={this.props.hoursFormActivity}/>
						<button>Submit</button>
					</form>
				</div>
			)
		} else {
			return null;
		}
	}
}

class DisplayStats extends React.Component {
	constructor(props) {
		super(props);
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
				<div>
					<h1>GAME STATE</h1>
					<h2>DAY {this.props.day} TIME {timeDisplay}</h2>
					<h3>CLUB: {this.props.clubName}</h3>
					<h3>HEALTH: {this.props.health}</h3>
					<h3>GPA: {this.props.GPA}</h3>
					<h3>FUN: {this.props.fun}</h3>
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
				<div>
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
