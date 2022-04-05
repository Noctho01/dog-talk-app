import axios from 'axios';
import { Log as log } from "../../jobs/log.js";

import { UserModel } from "../model/UserModel.js";
import { UserRepository } from "../repository/UserRepository.js";
import { User } from "../domain/User.js";

import { RoomModel } from '../model/RoomModel.js';
import { RoomRepository } from '../repository/RoomRepository.js';
import { Room } from "../domain/Room.js";

import { CanineProfile } from "../domain/CanineProfile.js";
import { CanineProfileRepository } from "../repository/CanineProfileRepository.js";

const
userRepository = new UserRepository(UserModel),
roomRepository = new RoomRepository(RoomModel),
canineProfileRepository = new CanineProfileRepository(UserModel);

User.initRepository(userRepository);
Room.initRepository(roomRepository);
CanineProfile.initRepository(canineProfileRepository);
CanineProfile.initAxios(axios);

export class RoomController {

    static async getRooms(req, res, next) {
        try {
            const rooms = await Room.findAll();

            res
            .status(200)
            .set('Access-Control-Allow-Credentials', 'true')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .set('Content-Type', 'application/json')
            .json({ rooms: rooms});

            return log.web('get', '/rooms', 200);
            
        } catch (err) {
            log.web('get', '/rooms', 500);
            next(err.message);
        }
    }

    static async selectRoom(req, res, next) {
        const
        { id: userid } = req.user,
        { roomName } = req.params;

        try {
            const
            room = await Room.initWithName(roomName),
            canineProfile = await CanineProfile.init(userid, roomName, room.inRoom);

            // 2 - salvar no banco de dados
            await canineProfile.save();

            // 3 - adicionar o breed do perfil canino na sala
            room.addInRoom(canineProfile.id);
            room.save();

            res
            .set('Access-Control-Allow-Credentials', 'true')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .set('Content-Type', 'application/json')
            .json({ message: 'room selected' });

            return log.web('get', `/room/${roomName}`, 201);

        } catch (err) {
            log.web('get', `/room/${roomName}`, 500);
            next(err);
        }
    }

    static async getCanineProfile(req, res, next) {
        const { id: userid } = req.user;
        try {
            const canineProfile = await CanineProfile.initWithId(userid);

            res
            .set('Access-Control-Allow-Credentials', 'true')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .set('Content-Type', 'application/json')
            .json({ canineProfile: {
                breed: canineProfile.breed,
                roomName: canineProfile.roomName,
                profilePictureUrl: canineProfile.profilePictureUrl
            }});

            return log.web('get', '/room/canineProfile', 200);
            
        } catch (err) {
            log.web('get', '/room/canineProfile', 500);
            next(err);
        }
        
    }
}