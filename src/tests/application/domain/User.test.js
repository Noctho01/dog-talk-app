import { Log as log } from '../../../jobs/log.js';
import { User } from "../../../application/domain/User.js";
import { UserRepository } from '../../../application/repository/UserRepository.js';

class UserModel {
    constructor() {
        this.userDb = [{ email: 'vini123@gmail.com', pwdHash: '123123' }];
    }

    async findOne(props) {
        let findeds;
        await this.userDb.forEach(user => {
            Object.keys(props).forEach(prop => {
                if (user[prop] === props[prop]) findeds = user;
            });
        });
        return findeds;
    }

    async create(props) {
        await this.userDb.push(props);
    }
}

describe('userDomain::', () => {
    const userFakeDatabase = new UserModel();
    const userRepository = new UserRepository(userFakeDatabase);
    let userDomain = new User(userRepository);

    it('instance of User', () => expect(userDomain).toBeInstanceOf(User));
    
    it('userDomain.create if a function', () => expect(typeof userDomain.create).toBe('function'));
    
    it('userDomain.create(<none params>)', async () => await expect(userDomain.create()).rejects.toThrowError('parametro <userData> é undefined'));
    
    it('userDomain.create(newUser) email já esta em uso', async () => {
        let newUser = { email: 'vini123@gmail.com', pwdHash: '123123' };
        await expect(userDomain.create(newUser)).rejects.toThrowError('Este email já está em uso');
    });

    it('userDomain.create(newUser) newUser.email === undefined || null', async () => {
        let newUser = { nome: 'vinicius', pwdHash: '123123' };
        await expect(userDomain.create(newUser)).rejects.toThrowError('informe o email do usuario em <userData.email>');
    });

    it('userDomain.create(newUser) successful', async () => {
        let newUser = { email: 'maria123@gmail.com', pwdHash: '123123' };
        await expect(userDomain.create(newUser)).toBeTruthy();
        userDomain = new User(userRepository);
    });

    it('userDomain possui dados salvos na instancia', async () => {
        let newUser = { email: 'maria123@gmail.com', pwdHash: '123123' };
        await userDomain.create(newUser);
        await expect(userDomain.email).toEqual(newUser.email);
        await expect(userDomain.pwdHash).toEqual(newUser.pwdHash);
        userDomain = new User(userRepository);
    });

    it('userDomain.save() retorna erro', async () => {
        await expect(userDomain.save()).rejects.toThrowError('dados invalidos para salvar no banco de dados');
        userDomain = new User(userRepository);
    })

    it('userDomain.save() successful', async () => {
        let newUser = { email: 'maria123@gmail.com', pwdHash: '123123' };
        const userDbRestalrado = userFakeDatabase.userDb;
        log.debug('User.test.js', 69, `valor de userFakeDatabase.userDb.length ${userFakeDatabase.userDb.length} antes do metodo save`);
        
        await userDomain.create(newUser);
        await userDomain.save();
        log.debug('User.test.js', 69, `valor de userFakeDatabase.userDb.length ${userFakeDatabase.userDb.length} apos o metodo save`);

        expect(userFakeDatabase.userDb.length).toBeGreaterThan(0);
        userFakeDatabase.userDb = userDbRestalrado;
        userDomain = new User(userRepository);
    });
});