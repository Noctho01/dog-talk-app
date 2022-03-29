import { UserModel } from '../model/UserModel.js';
import { UserRepository } from '../repository/UserRepository.js';
import { User } from "../domain/User.js";
import { Log as log} from '../../jobs/log.js';

const userRepository = new UserRepository(UserModel);
const userDomain = new User(userRepository);

export class UserController {

    static renderLoginForm(req, res, next) {
        try {
            return res
            .status(200)
            .set('Content-Type', 'text/html')
            .render('login', { title:'Login Usuario' });

        } catch (err) {
            next(err);
        }         
    }

    static renderRegisterForm(req, res, next) {
        try {
            return res
            .status(200)
            .set('Content-Type', 'text/html')
            .render('register', { title:'Cadastro de Usuario' });

        } catch (err) {
            next(err);
        }
    }

    static async registerUser(req, res, next) {
        const { email, password: pwdHash} = req.body;
        try {
            await userDomain.create({ email, pwdHash });
            log.debug('/UserController.js', 39, 'usuario instanciado');

            await userDomain.save();
            log.debug('/UserController.js', 39, 'usuario criado');
            log.web('post', '/register', 201);

            return res
            .status(201)
            .set('Content-Type', 'text/html')
            .redirect('/rooms');

        } catch (err) {
            log.web('post', '/register', 500);
            log.error(err);
            next();
        }
    }
}