class Stat {
    constructor(name, max, current, total, inputHolder, activityValue, dailyInc, dailyDec) {
        this._name = name;
        this._max = max;
        this._current = current;
        this._total = total;
        this._inputHolder = inputHolder;
        this._activityValue = activityValue;
        this._dailyInc = dailyInc;
        this._dailyDec = dailyDec;
    }

    get name() {
        return this._name;
    }

    get max() {
        return this._max;
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

    get dailyInc() {
        return this._dailyInc;
    }

    get dailyDec() {
        return this._dailyDec;
    }

    set current(points) {
        this._current = points;
    }

    set inputHolder(inputValue) {
        this._inputHolder = inputValue;
    }

    set dailyInc(points) {
        this._dailyInc = points;
    }
}