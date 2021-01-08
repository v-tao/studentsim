"use strict";
class PlayerState extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayStartScreen:true,
			displayGame: false,
			displayEndScreen: false,
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
			dailyHours: 10,
		}

		this.handleStart = this.handleStart.bind(this);
		this.handleClassChange = this.handleClassChange.bind(this);
		this.handleClassSubmit = this.handleClassSubmit.bind(this);
		this.handleStatsSubmit = this.handleStatsSubmit.bind(this);
		this.handleHealthChange = this.handleHealthChange.bind(this);
		this.handleGPAChange = this.handleGPAChange.bind(this);
		this.handleFunChange = this.handleFunChange.bind(this);
	}

	handleStart() {
		this.setState({displayStartScreen: false, displayGame: true});
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

	handleHealthChange(e) {
		if (e.target.value) {
			this.setState({healthInc: parseInt(e.target.value)});
		} else {
			this.setState({healthInc:0});
		}
	}

	handleGPAChange(e) {
		if (e.target.value) {
			this.setState({GPAInc: parseInt(e.target.value)});
		} else {
			this.setState({GPAInc:0});
		}
	}

	handleFunChange(e) {
		if (e.target.value) {
			this.setState({funInc: parseInt(e.target.value)});
		} else {
			this.setState({funInc:0});
		}
	}

	//next day
	handleStatsSubmit(e) {
		e.preventDefault();
		if (this.state.day == this.state.lastDay) {
			this.setState({displayGame: false, displayEndScreen: true});
		} else {
			let percentage = this.state.GPAInc/this.state.numClasses;
			if (percentage > 1) {
				percentage = 1;
			}
			let funAmount = this.state.fun + this.state.funInc * this.state.funValue - this.state.funDecay;
			if (funAmount > 100) {
				funAmount = 100;
			} else if (funAmount < 0) {
				funAmount = 0;
			}

			let healthAmount = this.state.health + this.state.healthInc * this.state.healthValue - this.state.healthDecay;
			if (healthAmount > 100) {
				healthAmount = 100;
			} else if (healthAmount < 0) {
				healthAmount = 0;
			}
			this.setState((state) => ({
				day: state.day + 1,
				health: healthAmount,
				fun: funAmount,
				totalGP: state.totalGP + percentage * state.maxGPA,
			}));
		}
	}

	render() {
		let GPA = Math.round(this.state.totalGP/(this.state.day-1) * 100)/100;
		return (
			<div>
				<StartScreen displayStartScreen={this.state.displayStartScreen} onStart={this.handleStart} onClassSubmit={this.handleClassSubmit} onClassChange={this.handleClassChange}/>
				<InputForm displayGame={this.state.displayGame} dailyHours={this.state.dailyHours} healthInc={this.state.healthInc} GPAInc={this.state.GPAInc} funInc={this.state.funInc} 
				onStatsSubmit={this.handleStatsSubmit} onHealthChange={this.handleHealthChange} onGPAChange={this.handleGPAChange} onFunChange={this.handleFunChange}/>
				<Display displayGame={this.state.displayGame} day={this.state.day} time={this.state.time} health={this.state.health} GPA={GPA} fun={this.state.fun}/>
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

class InputForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleStatsSubmit = this.handleStatsSubmit.bind(this);
		this.handleHealthChange = this.handleHealthChange.bind(this);
		this.handleGPAChange = this.handleGPAChange.bind(this);
		this.handleFunChange = this.handleFunChange.bind(this);

	}

	handleStatsSubmit(e){
		this.props.onStatsSubmit(e);
	}

	handleHealthChange(e){
		this.props.onHealthChange(e);
	}

	handleGPAChange(e){
		this.props.onGPAChange(e);
	}

	handleFunChange(e){
		this.props.onFunChange(e);
	}

	render() {
		let dailyHours = this.props.dailyHours;
		let healthInc = this.props.healthInc;
		let GPAInc = this.props.GPAInc;
		let funInc = this.props.funInc;
		if (this.props.displayGame) {
			return (
				<div>
					<h3>You have {dailyHours-healthInc-GPAInc-funInc} hours(s) left to allocate</h3>
					<form onSubmit={this.handleStatsSubmit}>
			    		<label htmlFor="health">Add Health Hours</label>
			    		<input step="1" min="0" max={dailyHours-GPAInc-funInc} onChange={this.handleHealthChange} name="health" type="number"/>
			    		<label htmlFor="GPA">Add GPA Hours</label>
			    		<input step="1" min="0" max={dailyHours-healthInc-funInc} onChange={this.handleGPAChange} name="GPA" type="number"/>
			    		<label htmlFor="fun">Add Fun Hours</label>
			    		<input step="1" min="0" max={dailyHours-healthInc-GPAInc} onChange={this.handleFunChange} name="fun" type="number"/>
			    		<button>Next Day</button>
					</form>
				</div>
			)
		} else {
			return null;
		}
	}
}

class Display extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.displayGame) {
			let timeDisplay;
			if (this.props.time == 0) {
				timeDisplay = "12 AM";
			} else if (this.props.time == 12) {
				timeDisplay = "12 PM";
			} else if (this.props.time < 12) {
				timeDisplay = this.state.time + " AM"
			} else {
				timeDisplay = this.props.time%12 + "PM"
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
