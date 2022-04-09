import jwt from 'jsonwebtoken';
import envConfig from '../../envConfig.js';
import { Types } from '../model/database/db.js';
import { UserModel } from '../model/UserModel.js';
import { UserRepository } from '../repository/UserRepository.js';
import { User } from "../domain/User.js";
import { Log as log} from '../../jobs/log.js';

const userRepository = new UserRepository(UserModel);
User.initRepository(userRepository);

export class UserController {

    static async create(req, res, next) {
        const { email, password: pwdHash } = req.body;
        try {
            const user = new User(new Types.ObjectId(), email, pwdHash);
            await user.save();
            log.debug('/UserController.js', 39, 'usuario criado');

            res
            .status(201)
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .json({ message: 'user created' });
            
            return log.web('post', '/user', 201);

        } catch (err) {
            log.web('post', '/user', 500);
            next(err.message);
        }
    }

    static loginUser(req, res, next) {
        const { id, email } = req.user;
        try {                   
            const token = jwt.sign({ id, email }, envConfig.SECRET_KEY, { expiresIn: '5h' });

            res
            .status(201)
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .cookie('Authorization-Token', token)
            .json({ message: 'user token created' });

            return log.web('post', '/user/login', 201);

        } catch (err) {
            log.web('post', '/user/login', 400);
            next(err.message);
        }
    }


    static async logoutUser(req, res, next) {
        try {

            console.log('entramo nesse carai')
            console.log(req.cookies['Authorization-Token']);

            res
            .status(200)
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .clearCookie('Authorization-Token')
            .json({ message: 'user token deleted' });

            return log.web('delete', '/user/logout', 200);

        } catch (err) {
            log.web('delete', '/user/logout', 400);
            next(err.message);
        }
    }

    static async getUserEmail(req, res, next) {
        const { id } = req.user;
        try {
            const user = await User.initWithId(id);

            res
            .status(200)
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .json({ email: user.email });

            return log.web('get', '/account', 200);
            

        } catch (err) {
            log.web('get', '/user/email', 400);
            next(err.message);
        }
    }

    static async delete(req, res, next) {
        const { id } = req.user;
        try {
            const user = await User.initWithId(id);
            await user.delete();

            res
            .clearCookie('Authorization-Token')
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')

            log.web('delete', '/user', 200);

            return res
            .status(200)
            .json({ message: 'user deleted' });

        } catch (err) {
            log.web('delete', '/user', 400);
            next(err.message);
        }
    }
}