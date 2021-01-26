class Club {
    constructor(name, hours, healthInc, GPAInc, funInc, healthReq, GPAReq, funReq) {
        this._hours = hours;
        this._name = name;
        this._healthInc = healthInc;
        this._GPAInc = GPAInc;
		this._funInc = funInc;
		this._healthReq = healthReq;
		this._GPAReq = GPAReq;
		this._funReq = funReq;
	}

	get name() {
		return this._name;
	}

	get hours() {
		return this._hours;
	}
	
	get healthInc() {
		return this._healthInc;
	}

	get GPAInc() {
		return this._GPAInc;
	}

	get funInc() {
		return this._funInc;
    }
	
	isEligible(health, GPA, fun) {
		return ((health >= this._healthReq) && (GPA >= this._GPAReq) && (fun >= this._funReq));
	}
}