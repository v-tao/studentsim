"use strict";
class PlayerState extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayStartScreen:true,
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
			dailyHours: 10,
		}
		this.handleStart = this.handleStart.bind(this);
		this.handleClassChange = this.handleClassChange.bind(this);
		this.handleActivityClick = this.handleActivityClick.bind(this);
		this.handleHoursChange = this.handleHoursChange.bind(this);
		this.handleHoursSubmit = this.handleHoursSubmit.bind(this);
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
		this.setState({displayHoursDropdown: true, displayChooseActivity: false});
		this.setState({hoursDropdownActivity: activity});
	}

	handleHoursChange(e, activity) {
		this.setState((state) => ({timeInc: parseInt(e.target.value)}));
		if (e.target.value) {
			if (activity == "exercise") {
				this.setState((state) => ({healthInc: state.healthInc + e.target.value}));
			} else if (activity == "study") {
				this.setState((state) => ({GPAInc: state.GPAInc + e.target.value}));
			} else if (activity == "playGames") {
				this.setState((state) => ({funInc: state.funInc + e.target.value}))
			}
		} else {
			this.setState({timeInc: 0});
		}
	}

	handleHoursSubmit() {
		let currentTime = this.state.time + parseInt(this.state.timeInc);
		if (currentTime >= 24) {
			currentTime -= 24;
		}
		this.setState((state) => ({
			displayHoursDropdown: false, 
			displayChooseActivity: true,
			time: currentTime,
		}));
	}

	boundStats(stat) {
		if (stat > 100) {
			return 100;
		} else if (stat < 0) {
			return 0;
		}
	}

	nextDay(e) {
		e.preventDefault();
		if (this.state.day == this.state.lastDay) {
			this.setState({displayStats: false, displayEndScreen: true});
		} else {
			let percentage = this.state.GPAInc/this.state.numClasses;
			if (percentage > 1) {
				percentage = 1;
			}
			let funAmount = this.state.fun + this.state.funInc * this.state.funValue - this.state.funDecay;
			let healthAmount = this.state.health + this.state.healthInc * this.state.healthValue - this.state.healthDecay;
			this.setState((state) => ({
				day: state.day + 1,
				health: this.boundStats(healthAmount),
				fun: this.boundStats(funAmount),
				totalGP: state.totalGP + percentage * state.maxGPA,
				healthInc: 0,
				funInc: 0,
				GPAInc: 0,
			}));
		}
	}

	render() {
		let GPA = Math.round(this.state.totalGP/(this.state.day-1) * 100)/100;
		return (
			<div>
				<StartScreen displayStartScreen={this.state.displayStartScreen} onStart={this.handleStart} onClassSubmit={this.handleClassSubmit} onClassChange={this.handleClassChange}/>
				<ChooseActivity displayChooseActivity={this.state.displayChooseActivity} onActivityClick={this.handleActivityClick}/>
				<HoursDropdown displayHoursDropdown={this.state.displayHoursDropdown} hoursDropdownActivity={this.state.hoursDropdownActivity} onHoursSubmit={this.handleHoursSubmit} onHoursChange={this.handleHoursChange}/>
				<DisplayStats displayStats={this.state.displayStats} day={this.state.day} time={this.state.time} health={this.state.health} GPA={GPA} fun={this.state.fun}/>
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
					<button onClick={this.props.nextDay}>Sleep</button>

				</div>
			)
		} else {
			return null;
		}
	}
}

class HoursDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.handleHoursChange = this.handleHoursChange.bind(this);
		this.handleHoursSubmit = this.handleHoursSubmit.bind(this);
	}

	handleHoursChange(e) {
		this.props.onHoursChange(e, this.props.hoursDropdownActivity);
	}

	handleHoursSubmit(e) {
		e.preventDefault();
		this.props.onHoursSubmit();
	}

	render() {
		if (this.props.displayHoursDropdown) {
			return (
				<div>
					<h3>How many hours do you want to spend?</h3>
					<form onSubmit={this.handleHoursSubmit}>
						<input step="1" min="0" type="number" onChange={this.handleHoursChange} name={this.props.hoursDropdownActivity}/>
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
					<h3>Health: {this.props.health}</h3>
					<h3>GPA: {this.props.GPA}</h3>
					<h3>Fun: {this.props.fun}</h3>
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
