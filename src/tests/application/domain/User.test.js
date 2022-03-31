import { Log as log } from '../../../jobs/log.js';
import { User } from "../../../application/domain/User.js";
import { UserRepository } from '../../../application/repository/UserRepository.js';
import { UserModelTest } from './EntityModel/UserModelTest.js';

/**
 * @description O que testar no Dominio User
 */
describe('userDomain::', () => {
    const userFakeDatabase = new UserModelTest();
    const userRepository = new UserRepository(userFakeDatabase);
    User.initRepository(userRepository);

    console.log(userFakeDatabase.userDb);

    it('User.repository esta instanciado', () => expect(User.repositoryExist()).toBe(true));

    it('userDomain é uma instancia de User', () => {
        let userDomina = new User('123456789', 'vinicius@gmail.com', '321654');
        expect(userDomina).toBeInstanceOf(User);
    });

    it('new User(<props>) error', () => {
        try {
            let userDomain = new User('1', '2', '3', '4');
        } catch (err) {
            expect(err).toThrow();
        }
    });

    it('new User(<props> success)', () => {
        try {
            let userDomain = new User('a', 'b', 'c');
        } catch (err) {
            expect(err).not.toThrow();
        }
    });

    it('userDomain.save() retorna erro "id não foi definido"', async () => {
        // está faltando o parametro <id>
        let userDomain  = new User(null, 'meuEmail@email.com', '123456'); 
        await expect(userDomain.save()).rejects.toThrowError("id não foi definido");
    });

    it('userDomain.save() retorna erro "email não foi definido"', async () => {
        // está faltando o parametro <email>
        let userDomain  = new User('123456', null, '123456'); 
        await expect(userDomain.save()).rejects.toThrowError("email não foi definido");
    });

    it('userDomain.save() retorna erro "pwdHash não foi definido"', async () => {
        // está faltando o parametro <pwdHash>
        let userDomain  = new User('123456', 'meuEmail@email.com'); 
        await expect(userDomain.save()).rejects.toThrowError("pwdHash não foi definido");
    });

    it('dados da instancia userDomain foram salvos no banco de dados', async () => {
        let noDB = userFakeDatabase.userDb.length;
        let userDomain = new User('id_do_usuario', 'meuEmail@gmail.com', 'minhaSenha123');
        await userDomain.save();
        expect(userFakeDatabase.userDb.length).toBeGreaterThan(noDB);
    });

    it('dados da instancia userDomain não foram salvos no banco de dados', async () => {
        let noDB = userFakeDatabase.userDb.length;
        let userDomain = new User('id_do_usuario', 'meuEmail@gmail.com', 'minhaoutraSenha123');
        try {
            await userDomain.save();
        } catch (err) {
            expect(userFakeDatabase.userDb.length).toEqual(noDB);
        }
    });

    it('User.initWithId() sem parametro resulta em erro', async () => {
        await expect(User.initWithId()).rejects.toThrowError('o id do usuario não foi informado');
    });

    it('User.initWithId(userid) caso usuario não exista retorna um erro ', async () => {
        await expect(User.initWithId('12')).rejects.toThrowError('Este usuario não existe');
    });

    it('User.initWithId(userid) é retorna uma instancia de User', async () => {
        let userDomain = await User.initWithId('123');
        await expect(userDomain).toBeInstanceOf(User)
    });

    it('User.initWithId(userid) caso o usuario exista', async () => {
        let userDomain = await User.initWithId('123');
        await expect(userDomain.email).toEqual('vinicius@gmail.com');
    });

    console.log('DEPOIS DE TUDO!!', userFakeDatabase.userDb);
});