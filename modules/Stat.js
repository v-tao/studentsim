class Stat {
    constructor(name, currentPoints, inputHolder, activityValue, dailyIncrease, dailyDecay) {
        this._name = name;
        this._currentPoints = currentPoints;
        this._inputHolder = inputHolder;
        this._activityValue = activityValue;
        this._dailyIncrease = dailyIncrease;
        this._dailyDecay = dailyDecay;
    }

    get name() {
        return this._name;
    }

    get currentPoints() {
        return this._currentPoints;
    }

    get inputHolder() {
        return this._inputHolder;
    }

    get activityValue() {
        return this._activityValue;
    }

    get dailyIncrease() {
        return this._dailyIncrease;
    }

    get dailyDecay() {
        return this._dailyDecay;
    }

    set currentPoints(points) {
        this._currentPoints = points;
    }

    set inputHolder(inputValue) {
        this._inputHolder = inputValue;
    }

    set dailyIncrease(points) {
        this._dailyIncrease = points;
    }
}