export class User {

    static #repository;

    /**@type {String<ObjectID>} */
    #id;

    /**@type {String} */
    #email;

    /**@type {String} */
    #pwdHash;

    /**@type {String<ObjectID>} */
    #canineProfileId;

    /**
     * @description Constructor Method
     * @param {String<ObjectID>} id 
     * @param {String} email 
     * @param {String} pwdHash 
     */
    constructor(id, email, pwdHash, canineProfileId) {
        this.#id = id;
        this.#email = email;
        this.#pwdHash = pwdHash;
        this.#canineProfileId = canineProfileId ? canineProfileId : null;
    }

    // Getter Methods
    get id() { return this.#id }
    get email() { return this.#email }
    get pwdHash() { return this.#pwdHash }
    get canineProfileId() { return this.#canineProfileId }

    /** @param {String<ObjectID>} id */
    set canineProfileId(id) {
        this.#canineProfileId = id
    }


    /**
     * @description Metodo Statico de inicialização de repositorio
     * @param {UserRepository} repository
     * @static
     * @public
     */
    static initRepository(repository) {
        User.#repository = repository;
    }

    /**
     * @description Retorna resposta de confirmação da existencia de um repositorio no objeto User
     * @static
     * @public
     * @returns {Boolean}
     */
    static repositoryExist() {
        return User.#repository ?true:false;
    }

    /**
     * @description aduciona os dados do documento refente ao id na instancia de User
     * @param {String} userid 
     * @static
     * @public
     * @returns {User}
     */
     static async initWithId(userid) {
        if (!userid || userid === undefined || userid === null) throw new Error('o id do usuario não foi informado');
        const user = await User.#repository.findById(userid, '_id email pwdHash canineProfileId');
        if (!user) throw new Error('Este usuario não existe');
        
        return new User(
            user._id,
            user.email,
            user.pwdHash,
            user.canineProfileId
        );
    }


    /**
     * @description Metodo insere objeto<documento> ao banco de dados
     * @public
     */
    async save() {
        if (!this.#id) throw new Error('id não foi definido');
        if (!this.#email) throw new Error('email não foi definido');
        if (!this.#pwdHash) throw new Error('pwdHash não foi definido');

        const user = await User.#repository.findOne({ email: this.#email }, 'email');
        
        if (user) {
            const updateResult = await User.#repository.update({_id: this.#id}, {
                email: this.#email,
                pwdHash: this.#pwdHash,
                canineProfileId: this.#canineProfileId
            });
            
            if (!updateResult) throw new Error('As alterações deste usuario não foram salvas');

        } else {
            await User.#repository.create({
                _id: this.#id,
                email: this.#email,
                pwdHash: this.#pwdHash
            });
        }
    }


    async delete() {
        if (!this.#id) throw new Error('id não foi definido');
        if (!this.#email) throw new Error('email não foi definido');
        if (!this.#pwdHash) throw new Error('pwdHash não foi definido');

        const resultDelete = await User.#repository.deleteById(this.#id);
        if (resultDelete.deletedCount === 0) throw new Error('processo de deletar o usuario falhou');
    }
}