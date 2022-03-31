import { Router } from 'express';
import { UserController } from '../controller/UserController.js';
import { RoomController } from '../controller/RoomController.js';
import { passport } from '../middlewares/authentication.js';

export const router = new Router();

// Login and Logout user
router
.post('/user/login', passport.authenticate('local', { session: false }), UserController.loginUser)
.delete('/user/logout', passport.authenticate('jwt', { session: false, failureRedirect:'/login' }), UserController.logoutUser)

// User Crud
router
.get('/user/:userid', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), UserController.getUser)
.post('/user', UserController.create)

// Rooms
router
.get('/rooms', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), RoomController.getRooms)