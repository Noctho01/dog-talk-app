import { Router } from 'express';
import { UserController } from '../controller/UserController.js';
import { RoomController } from '../controller/RoomController.js';
import { passport } from '../middlewares/authentication.js';
import resolverAsync from '../../jobs/resolverMiddlewareAsync.js';

export const router = new Router();

// Login and Logout user
router
.post('/user/login', passport.authenticate('local', { session: false }), UserController.loginUser)
.delete('/user/logout', passport.authenticate('jwt', { session: false }), UserController.logoutUser)

// User Crud
router
.post('/user', UserController.create)
.get('/user/email/', passport.authenticate('jwt', { session: false }), UserController.getUserEmail)
.delete('/user', passport.authenticate('jwt', { session: false }), UserController.delete)

// Rooms
router
.get('/rooms', passport.authenticate('jwt', { session: false }), RoomController.getRooms)
.get('/room/:roomName', passport.authenticate('jwt', { session: false }), RoomController.selectRoom)