import { Router } from 'express';
import { UserController } from '../controller/UserController.js';
import { RoomController } from '../controller/RoomController.js';

export const router = new Router();

// register service
router
.get('/register', UserController.renderRegisterForm)
//.post(UserController.createUser)

// login service
router
.get('/login', UserController.renderLoginForm)
//.post(UserController.acessChooseRooms)

// rooms service
router
.get('/rooms', RoomController.renderRoomsList)
.get('/room/:id')
.post('/canineprofile')
.put('/room/:id')