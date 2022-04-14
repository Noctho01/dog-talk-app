import jwt from 'jsonwebtoken';
import envConfig from '../../envConfig.js';
import { Types } from '../model/database/db.js';
import { Log as log} from '../../jobs/log.js';
import { userServices } from '../services/UserServices.js';

export class UserController {

    static async create(req, res, next) {
        const { email, password: pwdHash } = req.body;
        log.web('post', '/user', 201);
        try {            
            await userServices.create({ id: new Types.ObjectId(), email, pwdHash });
            return res
            .status(201)
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .json({ message: 'user created' });


        } catch (err) {
            log.web('post', '/user', 500);
            next(err);
        }
    }

    static loginUser(req, res, next) {
        log.web('post', '/user/login', 201);
        const { id, email } = req.user;
        try {                   
            const token = jwt.sign({ id, email }, envConfig.SECRET_KEY, { expiresIn: '5h' });
            return res
            .status(201)
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .cookie('Authorization-Token', token)
            .json({ message: 'user token created' });

        } catch (err) {
            log.web('post', '/user/login', 400);
            next(err);
        }
    }


    static async logoutUser(req, res, next) {
        log.web('delete', '/user/logout', 200);
        try {
            return res
            .status(200)
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .clearCookie('Authorization-Token')
            .json({ message: 'user token deleted' });

        } catch (err) {
            log.web('delete', '/user/logout', 400);
            next(err);
        }
    }

    static async getUser(req, res, next) {
        log.web('get', '/account', 200);
        const { id } = req.user;

        try {
            const user = await userServices.getUser(id);

            res
            .status(200)
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .json({ email: user.email, canineProfile: user.canineProfile });

        } catch (err) {
            log.web('get', '/user/email', 400);
            next(err);
        }
    }

    static async delete(req, res, next) {
        log.web('delete', '/user', 200);
        const { id: userid } = req.user;
        try {
            await userServices.delete(userid);
            return res
            .status(200)
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .clearCookie('Authorization-Token')
            .json({ message: 'user deleted' });

        } catch (err) {
            log.web('delete', '/user', 400);
            next(err);
        }
    }
}