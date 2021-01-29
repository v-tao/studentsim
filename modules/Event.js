class Event {
	constructor(name, text, healthInc, funInc, GPAInc) {
		this._name = name;
		this._text = text;
		this._healthInc = healthInc;
		this._funInc = funInc;
		this._GPAInc = GPAInc;
	}

	get name() {
		return this._name;
	}

	get text() {
		return this._text;
	}

	get healthInc() {
		return this._healthInc;
	}

	get funInc() {
		return this._funInc;
	}

	get GPAInc() {
		return this._GPAInc;
	}
}