import { InterfaceServices } from "./InterfaceServices.js";
import { UserModel } from "../model/UserModel.js";
import { UserRepository } from "../repository/UserRepository.js";

class UserServices extends InterfaceServices {

    async findAll(condition) {
        const users = await this.dependences.repository.findAll(condition, 'email');
        if (users.length === 0) return this.emit('error', new Error('Usuarios não encontrados'));
        return users;
    }

    async getUser(userid) {
        const user = await this.dependences.repository.findOne({ _id: userid }, 'email canineProfile');
        if (!user) return this.emit('error', new Error('Usuario não encontrado'));
        return user;
    }
    
    /**
     * @param {UserObject} newuser 
     * @returns {void}
     */
    async create(newuser) {
        const user = await this.dependences.repository.findOne({ _id: newuser.id }, 'email');
        if (user || user.email === newuser.email) return this.emit('error', new Error('Este usuario já existe'));
        await this.dependences.repository.create({
            _id: newuser.id,
            email: newuser.email,
            pwdHash: newuser.pwdHash
        });
    }

    async update(userid, updated) {
        const updateResult = await this.dependences.repository.update({ _id: userid }, updated);
        if (!updateResult.acknowledged) return this.emit('error', new Error('As alterações deste usuario não foram salvas'));
    }

    async delete(userid) {
        const resultDelete = await this.dependences.repository.deleteById(userid);
        if (resultDelete.deletedCount === 0) return this.emit('error', new Error('processo de deletar o usuario falhou'));
    }
}

export const userServices = new UserServices();

const userRepository = new UserRepository(UserModel);
userServices.injectionDependences({ repository: userRepository });