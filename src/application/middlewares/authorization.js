import passport, { LocalStrategy } from 'passport';
import { UserModel } from '../model/UserModel.js';
import { UserRepository } from '../repository/UserRepository.js';

const userRepository = new UserRepository(UserModel);

passport.use(new LocalStrategy((username, password, done) => {
    userRepository.findOne({ email: username, pwdHash:  })
}));