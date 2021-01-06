"use strict";
class PlayerState extends React.Component {
	constructor(props) {
		super(props);
		this.day = 1;
		this.health = 0;
		this.academics = 0;
		this.fun = 0;
	}

	updateHealth(x) {
		this.health += x;
	}

	updateAcademics(x) {
		this.academics += x;
	}

	updateFun(x) {
		this.fun += x;
	}

	nextDay() {
		this.day += 1;
	}

	render() {
		return (
			<div>
				<h1>GAME STATE</h1>
				<h2>DAY {this.day}</h2>
				<h3>Health: {this.health}</h3>
				<h3>Academics: {this.academics}</h3>
				<h3>Fun: {this.fun}</h3>
			</div>
		);
	}
}

let display = document.querySelector("#display");
ReactDOM.render(<PlayerState />, display);
