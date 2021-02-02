class UserInputEvent extends Event{
    constructor(name, hours, healthInc, academicsInc, funInc, healthReq, GPAReq, funReq, inputHolder, maxHours) {
        super(name, "userInput", hours, healthInc, academicsInc, funInc, healthReq, GPAReq, funReq);
        this._inputHolder = inputHolder;
        this._maxHours = maxHours;
    }

    get inputHolder() {
        return this._inputHolder;
    }

    get maxHours() {
        return this._maxHours;
    }

    set inputHolder(inputValue) {
        this._inputHolder = inputValue;
    }
}