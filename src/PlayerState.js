"use strict";
class PlayerState extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayStartScreen:true,
			displayGame: false,
			numClasses: 4,
			day: 1,
			health: 0,
			academics: 0,
			fun: 0,
			healthInc: 0,
			academicsInc: 0,
			funInc: 0,
			dailyHours: 10,
		}
		this.handleStart = this.handleStart.bind(this);
		this.handleClassChange = this.handleClassChange.bind(this);
		this.handleClassSubmit = this.handleClassSubmit.bind(this);
		this.handleStatsSubmit = this.handleStatsSubmit.bind(this);
		this.handleHealthChange = this.handleHealthChange.bind(this);
		this.handleAcademicsChange = this.handleAcademicsChange.bind(this);
		this.handleFunChange = this.handleFunChange.bind(this);
	}

	handleStart() {
		this.setState({displayStartScreen: false, displayGame: true});
	}

	handleClassChange(e) {
		this.setState({numClasses:e.target.value});
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

	handleAcademicsChange(e) {
		if (e.target.value) {
			this.setState({academicsInc: parseInt(e.target.value)});
		} else {
			this.setState({academicsInc:0});
		}
	}

	handleFunChange(e) {
		if (e.target.value) {
			this.setState({funInc: parseInt(e.target.value)});
		} else {
			this.setState({funInc:0});
		}
	}


	nextDay() {
		this.setState((state) => ({
			day: state.day+1,
		}));
	}

	handleStatsSubmit(e) {
		e.preventDefault();
		this.setState((state) => ({
			day: state.day + 1,
			health: state.health + state.healthInc,
			academics: state.academics + state.academicsInc,
			fun: state.fun + state.funInc,
		}))
	}

	reset() {
		this.setState({
			healthInc: 0,
			academicsInc: 0,
			funInc: 0,
		})
	}

	render() {
		return (
			<div>
				<StartScreen displayStartScreen={this.state.displayStartScreen} onStart={this.handleStart} onClassSubmit={this.handleClassSubmit} onClassChange={this.handleClassChange}/>
				<InputForm displayGame={this.state.displayGame} dailyHours={this.state.dailyHours} healthInc={this.state.healthInc} academicsInc={this.state.academicsInc} funInc={this.state.funInc} 
				onStatsSubmit={this.handleStatsSubmit} onHealthChange={this.handleHealthChange} onAcademicsChange={this.handleAcademicsChange} onFunChange={this.handleFunChange}/>
				<Display displayGame={this.state.displayGame} day={this.state.day} health={this.state.health} academics={this.state.academics} fun={this.state.fun}/>
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
		this.handleAcademicsChange = this.handleAcademicsChange.bind(this);
		this.handleFunChange = this.handleFunChange.bind(this);

	}

	handleStatsSubmit(e){
		this.props.onStatsSubmit(e);
	}

	handleHealthChange(e){
		this.props.onHealthChange(e);
	}

	handleAcademicsChange(e){
		this.props.onAcademicsChange(e);
	}

	handleFunChange(e){
		this.props.onFunChange(e);
	}

	render() {
		let dailyHours = this.props.dailyHours;
		let healthInc = this.props.healthInc;
		let academicsInc = this.props.academicsInc;
		let funInc = this.props.funInc;
		if (this.props.displayGame) {
			return (
				<div>
					<h3>You have {dailyHours-healthInc-academicsInc-funInc} hours(s) left to allocate</h3>
					<form onSubmit={this.handleStatsSubmit}>
			    		<label htmlFor="health">Add Health Hours</label>
			    		<input step="1" min="0" max={dailyHours-academicsInc-funInc} onChange={this.handleHealthChange} name="health" type="number"/>
			    		<label htmlFor="academics">Add Academic Hours</label>
			    		<input step="1" min="0" max={dailyHours-healthInc-funInc} onChange={this.handleAcademicsChange} name="academics" type="number"/>
			    		<label htmlFor="fun">Add Fun Hours</label>
			    		<input step="1" min="0" max={dailyHours-healthInc-academicsInc} onChange={this.handleFunChange} name="fun" type="number"/>
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
		let day = this.props.day;
		let health = this.props.health;
		let academics = this.props.academics;
		let fun = this.props.fun;
		if (this.props.displayGame) {
			return (
				<div>
					<h1>GAME STATE</h1>
					<h2>DAY {day}</h2>
					<h3>Health: {health}</h3>
					<h3>Academics: {academics}</h3>
					<h3>Fun: {fun}</h3>
				</div>
			)
		} else {
			return null;
		}
	}
}

let display = document.querySelector("#display");
ReactDOM.render(<PlayerState />, display);
