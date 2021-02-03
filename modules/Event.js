class Event {
	constructor(name, type, text, healthInc, funInc, academicsInc) {
		this._name = name;
		this._type = type;
		this._text = text;
		this._healthInc = healthInc;
		this._funInc = funInc;
		this._academicsInc = academicsInc;
	}

	get name() {
		return this._name;
	}

	get type() {
		return this._type;
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

	get academicsInc() {
		return this._academicsInc;
	}
}

class InputFormEvent extends Event {
    constructor(name, text, healthInc, funInc, academicsInc, maxHours, healthDec, funDec, academicsDec,) {
        super(name, "inputForm", text, healthInc, funInc, academicsInc);
		this._maxHours = maxHours;
		this._healthDec = healthDec;
		this._funDec = funDec;
		this._academicsDec = academicsDec;
    }

    get maxHours() {
        return this._maxHours;
	}
	
	get healthDec() {
		return this._healthDec;
	}

	get funDec() {
		return this._funDec;
	}

	get academicsDec() {
		return this._academicsDec();
	}
}