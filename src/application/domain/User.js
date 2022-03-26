export class User {

    /**@private*/ #id;
    /**@private*/ #email;
    /**@private*/ #pwdHash;
    
    /**
     * @param {String} id
     * @param {String} email
     * @param {String} pwdHash
    */
    constructor(id, email, pwdHash) {
        this.#id = id;
        this.#email = email;
        this.#pwdHash = pwdHash;
    }

    get id() {
        return this.#id;
    }

    get email() {
        return this.#email;
    }

    get pwdHash() {
        return this.#pwdHash;
    }
}