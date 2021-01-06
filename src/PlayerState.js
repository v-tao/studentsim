"use strict";
class PlayerState extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			day: 1,
			health: 0,
			academics: 0,
			fun: 0,
			healthInc: 0,
			academicsInc: 0,
			funInc: 0,
		}
		this.handleStatsSubmit = this.handleStatsSubmit.bind(this);
		this.handleHealthChange = this.handleHealthChange.bind(this);
		this.handleAcademicsChange = this.handleAcademicsChange.bind(this);
		this.handleFunChange = this.handleFunChange.bind(this);

	}

	handleHealthChange(e) {
		this.setState({healthInc: parseInt(e.target.value)});
	}

	handleAcademicsChange(e) {
		this.setState({academicsInc: parseInt(e.target.value)});
	}

	handleFunChange(e) {
		this.setState({funInc: parseInt(e.target.value)});
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
				<div>
					<form onSubmit={this.handleStatsSubmit}>
			    		<label htmlFor="health">Add Health Pts</label>
			    		<input step="1" min="0" max="10" onChange={this.handleHealthChange} name="health" id="healthPts" type="number"/>
			    		<label htmlFor="academics">Add Academic Pts</label>
			    		<input step="1" min="0" max="10" onChange={this.handleAcademicsChange} name="academics" id="academicPts" type="number"/>
			    		<label htmlFor="fun">Add Fun Pts</label>
			    		<input step="1" min="0" max="10" onChange={this.handleFunChange} name="fun" id="funPts" type="number"/>
			    		<button>Next Day</button>
		    		</form>
				</div>
				<div>
					<h1>GAME STATE</h1>
					<h2>DAY {this.state.day}</h2>
					<h3>Health: {this.state.health}</h3>
					<h3>Academics: {this.state.academics}</h3>
					<h3>Fun: {this.state.fun}</h3>
				</div>
			</div>

		);
	}
}

let display = document.querySelector("#display");
ReactDOM.render(<PlayerState />, display);
