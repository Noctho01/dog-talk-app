export class User {
    /**
     * @description Metodo insere objeto<documento> ao banco de dados
     * @public
     */
    async save() {
        const user = await User.#repository.findOne({ email: this.#email }, 'email');
        
        if (user) {
            const updateResult = await User.#repository.update({_id: this.#id}, {
                email: this.#email,
                pwdHash: this.#pwdHash
            });
            
            if (!updateResult.acknowledged) throw new Error('As alterações deste usuario não foram salvas');

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