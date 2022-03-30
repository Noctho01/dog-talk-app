export class User {

    /**
     * @private @type {String}
    */
    #id;
    get id() { return this.#id }
    
    /**
     * @private @type {String}
    */ 
    #email;
    get email() { return this.#email }
    
    /**
     * @private @type {String}
    */ 
    #pwdHash;
    get pwdHash() { return this.#pwdHash }
    

    /**
     * @param {UserRepository} repository 
     */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * @param {Objects} userData 
     */
    async create(userData) {
        if (!userData) throw new Error('parametro <userData> é undefined');

        // testando se o userData.email já está em uso no banco de dados
        if (!userData.email) throw new Error('informe o email do usuario em <userData.email>')
        const userWithEmails = await this.repository.findOne({ email: userData.email}, 'email');
        if (userWithEmails) throw new Error('Este email já está em uso');

        // salvando dados do usuario na instancia
        this.#id = userData._id;
        this.#email = userData.email;
        this.#pwdHash = userData.pwdHash;
    }


    async save() {
        try {
            if (!this.#email || !this.#pwdHash) throw new Error('dados invalidos para salvar no banco de dados');
            await this.repository.create({ _id: this.#id,  email: this.#email, pwdHash: this.#pwdHash });
        } catch (err) {
            throw err;
        }
    }


    /**
     * @param {String} userid 
     */
    async init(userid) {
        if (this.#id) throw new Error('Id já indentificado');
        if (this.#email) throw new Error('Email já indentificado');
        if (this.#pwdHash) throw new Error('Senha já indentificada');

        const user = await this.repository.findById(userid, '_id email pwdHash');
        if (!user) throw new Error('Este usuario não existe');

        this.#id = user._id;
        this.#email = user.email;
        this.#pwdHash = user.pwdHash;
    }
}