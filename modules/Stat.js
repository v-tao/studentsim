class Stat {
    constructor(name, current, total, inputHolder, defaultActivityValue, dailyActivityInc, dailyEventInc, defaultDailyDec) {
        this._name = name;
        this._current = current;
        this._total = total;
        this._inputHolder = inputHolder;
        this._defaultActivityValue = defaultActivityValue;
        this._activityValue = defaultActivityValue;
        this._dailyActivityInc = dailyActivityInc;
        this._dailyEventInc = dailyEventInc;
        this._defaultDailyDec = defaultDailyDec;
        this._dailyDec = defaultDailyDec;
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

    get defaultActivityValue() {
        return this._defaultActivityValue;
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

    get defaultDailyDec() {
        return this._defaultDailyDec;
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

    set activityValue(value) {
        this._activityValue = value;
    }

    set dailyActivityInc(points) {
        this._dailyActivityInc = points;
    }

    set dailyEventInc(points) {
        this._dailyEventInc = points;
    }
}