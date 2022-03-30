import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { UserModel } from '../model/UserModel.js';
import { UserRepository } from '../repository/UserRepository.js';
import envConfig from '../../envConfig.js';

const userRepository = new UserRepository(UserModel);

// estrategia local
passport.use(new LocalStrategy({
    usernameField: 'email',
    session: false
}, async (username, password, done) => {
    try {
        const user = await userRepository.findOne({
            email: username,
            pwdHash: password
        }, 'email _id');

        if (user === null || user === undefined) throw new Error('Email ou Senha incorretos');

        return done(null, {
            id: user._id,
            email: user.email
        });

    } catch (err) {
        return done(err.message, false);
    }
}));

// my function extract
const cookieExtractor = req => {
    if (req && req.cookies) {
        return req.cookies['Authorization-Token'];
    }
    return undefined
}

//estrategia jwt
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: envConfig.SECRET_KEY,
    session: false 
}, (jwt_payload, done) => {
    return done(null, jwt_payload);
}));

export { passport }