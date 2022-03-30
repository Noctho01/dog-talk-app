export class Room {

    #name;
    #limit;

    /**@type {Number} */
    _inRoom;

    /**
     * @param {String} name
     * @param {Number} limit 
     */
    constructor(name, limit) {
        this.#name = name;
        this.#limit = limit;
        this._inRoom = 0;
    }

    get name() {
        return this.#name;
    }

    get limit() {
        return this.#limit;
    }

    get inRoom() {
        return this._inRoom;
    }
}