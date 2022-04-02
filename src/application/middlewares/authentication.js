import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { UserModel } from '../model/UserModel.js';
import { UserRepository } from '../repository/UserRepository.js';
import envConfig from '../../envConfig.js';

const userRepository = new UserRepository(UserModel);

// LocalStrategy Options
const l_strategyOptions = {
    usernameField: 'email',
    session: false
}

// LocalStrategy Callback
const l_strategyCb = async (username, password, done) => {
    const user = await userRepository.findOne({ email: username, pwdHash: password }, 'email _id');
    if (user === null || user === undefined) {
        return done({ message: 'Email ou Senha incorretos' }, false);
    }
    
    return done(null, { id: user._id, email: user.email });
}

// My function extract JWT
const cookieExtractor = req => {
    if (req && req.cookies) {
        const token = req.cookies['Authorization-Token'];
        if (!token) throw new Error('Não existe token');
        return token;
    }
    
    return undefined;
}

// JwtStrategy Options
const j_strategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: envConfig.SECRET_KEY,
    ignoreExpiration: true,
    session: false 
}

// JwtStrategy Callback
const j_strategyCb = (payload, done) => {
    let timeNow = new Date().getTime()/1000;
    if (timeNow > payload.exp) return done({ message: 'Token expirado' }, false);
    return done(null, payload);
}

// Strategys
passport.use(new LocalStrategy(l_strategyOptions, l_strategyCb));
passport.use(new JwtStrategy(j_strategyOptions, j_strategyCb));

export { passport }