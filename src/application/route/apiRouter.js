import { Router } from 'express';
import { UserController } from '../controller/UserController.js';
import { RoomController } from '../controller/RoomController.js';
import { CanineProfileController } from '../controller/CanineProfileController.js';
import { passport } from '../middlewares/authentication.js';

export const apiRouter = new Router();

// Login and Logout Routers
apiRouter
.post('/api/v1/user/login', passport.authenticate('local', { session: false }), UserController.loginUser)
.delete('/api/v1/user/logout', passport.authenticate('jwt', { session: false }), UserController.logoutUser)

// User Routers
apiRouter
.post('/api/v1/user', UserController.create)
.get('/api/v1/user', passport.authenticate('jwt', { session: false }), UserController.getUser)
.delete('/api/v1/user', passport.authenticate('jwt', { session: false }), UserController.delete)

// CanineProfile Routers
.post('/api/v1/canineprofile', passport.authenticate('jwt', { session: false }), CanineProfileController.createProfile)
.get('/api/v1/canineprofile', passport.authenticate('jwt', { session: false }), CanineProfileController.getProfile)

// Rooms Routers
apiRouter
.get('/api/v1/rooms', passport.authenticate('jwt', { session: false }), RoomController.getRooms)