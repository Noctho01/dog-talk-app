import { Router } from 'express';
import { UserController } from '../controller/UserController.js';
import { RoomController } from '../controller/RoomController.js';

export const router = new Router();

// login service
router.route('/login')
.get(UserController.renderLoginForm)
//.post(UserController.acessChooseRooms)

// register service
router.route('/register')
.get(UserController.renderRegisterForm)
//.post(UserController.createUser)

// rooms service
router
.get('/rooms', RoomController.renderRoomsList)
.get('/room/:id')
.post('/canineprofile')
.put('/room/:id')