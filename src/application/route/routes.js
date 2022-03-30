import { Router } from 'express';
import { UserController } from '../controller/UserController.js';
import { RoomController } from '../controller/RoomController.js';
import { passport } from '../middlewares/authentication.js';

export const router = new Router();

// register service
router.route('/register')
.get(UserController.renderRegisterForm)
.post(UserController.registerUser)

// login service
router.route('/login')
.get(UserController.renderLoginForm)
.post(passport.authenticate('local', { session: false }), UserController.loginUser)

// logout
router
.delete('/logout', passport.authenticate('jwt', { session: false, failureRedirect:'/login' }), UserController.logoutUser)

// Accont
router
.get('/accont', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), UserController.account)

// rooms service
router
.get('/rooms', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), RoomController.renderRoomsList)