class Stat {
    constructor(name, current, total, inputHolder, activityValue, dailyActivityInc, dailyEventInc, dailyDec) {
        this._name = name;
        this._current = current;
        this._total = total;
        this._inputHolder = inputHolder;
        this._activityValue = activityValue;
        this._dailyActivityInc = dailyActivityInc;
        this._dailyEventInc = dailyEventInc;
        this._dailyDec = dailyDec;
    }

    get name() {
        return this._name;
    }

    get current() {
        return this._current;
    }

    get total() {
        return this._total
    }

    get inputHolder() {
        return this._inputHolder;
    }

    get activityValue() {
        return this._activityValue;
    }

    get dailyActivityInc() {
        return this._dailyActivityInc;
    }

    get dailyEventInc() {
        return this._dailyEventInc;
    }

    get dailyDec() {
        return this._dailyDec;
    }

    set current(points) {
        this._current = points;
    }

    set total(points) {
        this._total = points;
    }

    set inputHolder(inputValue) {
        this._inputHolder = inputValue;
    }

    set dailyActivityInc(points) {
        this._dailyInc = points;
    }

    set dailyEventInc(points) {
        this._dailyEventInc = points;
    }
}