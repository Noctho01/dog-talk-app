import jwt from 'jsonwebtoken';
import envConfig from '../../envConfig.js';
import { UserModel } from '../model/UserModel.js';
import { UserRepository } from '../repository/UserRepository.js';
import { User } from "../domain/User.js";
import { Log as log} from '../../jobs/log.js';

const userRepository = new UserRepository(UserModel);
const userDomain = new User(userRepository);

export class UserController {

    static async create(req, res, next) {
        try {
            const { email, password: pwdHash} = req.body;
            await userDomain.init({ email, pwdHash });
            log.debug('/UserController.js', 39, 'usuario instanciado');
            
            await userDomain.save();
            log.debug('/UserController.js', 39, 'usuario criado');

            res
            .set('Content-Type', 'application/json')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11');
            
            log.web('post', '/user', 201);
            
            return res
            .status(201)
            .json({ message: 'user created'});

        } catch (err) {
            log.web('post', '/user', 500);
            log.error(err);
            next(err.message);
        }
    }


    static loginUser(req, res, next) {
        try {
            const { id, email } = req.user;
            const token = jwt.sign({ id, email }, envConfig.SECRET_KEY, { expiresIn: '1m' });

            res
            .cookie('Authorization-Token', token, { httpOnly: true, maxAge: 60000})
            .set('Content-Type', 'application/json')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')

            log.web('post', '/user/login', 201);
            
            return res
            .status(301)
            .json({ message: 'user token created' });

        } catch (err) {
            log.web('post', '/user/login', 400);
            log.error(err);
            next(err.message);
        }
    }

    static logoutUser(req, res, next) {
        try {
            res
            .clearCookie('Authorization-Token')
            .set('Content-Type', 'application/json')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')

            log.web('delete', '/user/logout', 200);

            return res
            .status(300)
            .json({ message: 'user token deleted' });

        } catch (err) {
            log.web('delete', '/user/logout', 400);
            log.error(err);
            next(err.message);
        }
    }


    static async getUser(req, res, next) {
        try {
            const { id } = req.user;    
            await userDomain.get(id);

            res
            .set('Content-Type', 'application/json')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')

            log.web('get', '/account', 200);

            return res
            .status(200)
            .json({ email: userDomain.email });

        } catch (err) {
            log.web('get', '/account', 400);
            log.error(err);
            next(err.message);
        }
    }
}