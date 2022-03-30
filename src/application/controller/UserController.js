import jwt from 'jsonwebtoken';
import envConfig from '../../envConfig.js';
import { UserModel } from '../model/UserModel.js';
import { UserRepository } from '../repository/UserRepository.js';
import { User } from "../domain/User.js";
import { Log as log} from '../../jobs/log.js';

const userRepository = new UserRepository(UserModel);
const userDomain = new User(userRepository);

export class UserController {

    static renderRegisterForm(_, res, next) {
        try {
            res
            .status(200)
            .set('Content-Type', 'text/html')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .render('register', { title:'Cadastro de Usuario' });
            
            return log.web('get', '/register', 200);

        } catch (err) {
            log.web('get', '/login', 500);
            log.error(err);
            next(err.message);
        }
    }


    static async registerUser(req, res, next) {
        const { email, password: pwdHash} = req.body;
        try {
            await userDomain.create({ email, pwdHash });
            log.debug('/UserController.js', 39, 'usuario instanciado');

            await userDomain.save();
            log.debug('/UserController.js', 39, 'usuario criado');

            res
            .status(201)
            .set('Content-Type', 'text/html')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .redirect('/login');

            return log.web('post', '/register', 201);

        } catch (err) {
            log.web('post', '/register', 500);
            log.error(err);
            next(err.message);
        }
    }


    static renderLoginForm(req, res, next) {
        try {
            if (req.cookies['Authorization-Token']) {
                return res.redirect('/rooms');
            }

            res
            .status(200)
            .set('Content-Type', 'text/html')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .render('login', { title:'Login Usuario' });

            return log.web('get', '/login', 200);

        } catch (err) {
            log.web('get', '/login', 500);
            log.error(err);
            next(err.message);
        }         
    }

    static loginUser(req, res, next) {
        const { id, email } = req.user;
        try {
            const token = jwt.sign({ id, email }, envConfig.SECRET_KEY, { expiresIn: '1h' });
            
            res
            .status(301)
            .cookie('Authorization-Token', token, { httpOnly: true })
            .set('Content-Type', 'text/html')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .redirect('/rooms');
            
            return log.web('post', 'login', 201);

        } catch (err) {
            log.web('post', '/login', 400);
            log.error(err);
            next(err.message);
        }
    }

    static logoutUser(req, res, next) {
        try {
            res
            .status(300)
            .clearCookie('Authorization-Token')
            .set('Content-Type', 'text/html')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .redirect('/login');

            return log.web('delete', '/logout', 200);

        } catch (err) {
            log.web('delete', '/logout', 400);
            log.error(err);
            next(err.message);
        }
    }


    static account(req, res, next) {
        try {
            const { id } = req.user;    
            await userDomain.init(id);

            res
            .status(200)
            .set('Content-Type', 'text/html')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .render('account', { title:'Suas Informaçoes', email: userDomain.email });

            return log.web('get', '/account', 200);

        } catch (err) {
            log.web('get', '/account', 400);
            log.error(err);
            next(err.message);
        }
    }
}