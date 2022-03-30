export class User {

    /**@private @type {String}*/ #id;
    /**@private @type {String}*/ #email;
    /**@private @type {String}*/ #pwdHash;

    /**
     * @param {UserRepository} repository 
     */
    constructor(repository) {
        this.repository = repository;
    }

    get email() {
        return this.#email;
    }

    get pwdHash() {
        return this.#pwdHash;
    }

    /**
     * @param {Object} userData 
     */
    async create(userData) {
        if (!userData) throw new Error('parametro <userData> é undefined');

        // testando se o userData.email já está em uso no banco de dados
        if (!userData.email) throw new Error('informe o email do usuario em <userData.email>')
        const userWithEmails = await this.repository.findOne({ email: userData.email}, 'email');
        if (userWithEmails) throw new Error('Este email já está em uso');

        // salvando dados do usuario na instancia
        this.#email = userData.email;
        this.#pwdHash = userData.pwdHash;
    }


    async save() {
        try {
            if (!this.#email || !this.#pwdHash) throw new Error('dados invalidos para salvar no banco de dados');
            await this.repository.create({ email: this.#email, pwdHash: this.#pwdHash });
        } catch (err) {
            throw err;
        }
    }
}