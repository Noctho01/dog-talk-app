import { Router } from 'express';
import { UserController } from '../controller/UserController.js';
import { RoomController } from '../controller/RoomController.js';
import { passport } from '../middlewares/authentication.js';

export const apiRouter = new Router();

// Login and Logout Routers
apiRouter
.post('/api/v1/user/login', passport.authenticate('local', { session: false }), UserController.loginUser)
.delete('/user/logout', passport.authenticate('jwt', { session: false }), UserController.logoutUser)

// User Routers
apiRouter
.post('/api/v1/user', UserController.create)
.get('/api/v1/user/email/', passport.authenticate('jwt', { session: false }), UserController.getUserEmail)
.delete('/api/v1/user', passport.authenticate('jwt', { session: false }), UserController.delete)

// CanineProfile Routers
.post('/api/v1/canineprofile', passport.authenticate('jwt', { session: false }), CanineProfile.createProfile)

// Rooms Routers
apiRouter
.get('/api/v1/rooms', passport.authenticate('jwt', { session: false }), RoomController.getRooms)
.get('/api/v1/room/select/:roomName', passport.authenticate('jwt', { session: false }), RoomController.selectRoom)
.get('/api/v1/room/canineProfile', passport.authenticate('jwt', { session: false }), RoomController.getCanineProfile)