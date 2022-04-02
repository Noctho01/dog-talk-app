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
        try {
            const { email, password: pwdHash} = req.body;
            const userDomain = new User(
                new Types.ObjectId(),
                email,
                pwdHash
            );
            
            await userDomain.save();
            log.debug('/UserController.js', 39, 'usuario criado');

            res
            .status(201)
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .json({ message: 'user created' });
            
            return log.web('post', '/user', 201);

        } catch (err) {
            log.web('post', '/user', 500);
            next(err);
        }
    }

    static loginUser(req, res, next) {
        try {                   
            const { id, email } = req.user;
            const token = jwt.sign({ id, email }, envConfig.SECRET_KEY, { expiresIn: '5s' });

            res
            .status(201)
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .cookie('Authorization-Token', token)
            .json({ message: 'user token created' });

            return log.web('post', '/user/login', 201);

        } catch (err) {
            log.web('post', '/user/login', 400);
            next(err);
        }
    }

    static logoutUser(req, res, next) {
        try {
            res
            .status(200)
            .clearCookie('Authorization-Token')
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .json({ message: 'user token deleted' });

            return log.web('delete', '/user/logout', 200);

        } catch (err) {
            log.web('delete', '/user/logout', 400);
            next(err);
        }
    }

    static async getUserEmail(req, res, next) {
        try {
            const { id } = req.user;
            const userDomain = await User.initWithId(id);

            res
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')

            log.web('get', '/account', 200);

            return res
            .status(200)
            .json({ email: userDomain.email });

        } catch (err) {
            log.web('get', '/user/email', 400);
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.user;
            const domainUser = await User.initWithId(id);
            await domainUser.delete();

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
            next(err);
        }
    }
}