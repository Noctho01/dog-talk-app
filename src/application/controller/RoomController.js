import axios from 'axios';
import { Log as log } from "../../jobs/log.js";

import { RoomModel } from '../model/RoomModel.js';
import { RoomRepository } from '../repository/RoomRepository.js';
import { Room } from "../domain/Room.js";

import { CanineProfileModel } from "../model/CanineProfileModel.js";
import { CanineProfile } from "../domain/CanineProfile.js";
import { CanineProfileRepository } from "../repository/CanineProfileRepository.js";

const
roomRepository = new RoomRepository(RoomModel),
canineProfileRepository = new CanineProfileRepository(CanineProfileModel);

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

            return log.web('get', '/register', 200);
            
        } catch (err) {
            log.web('get', '/rooms', 500);
            next(err.message);
        }
    }

    static async selectRoom(req, res, next) {
        const { roomName } = req.params;
        try {
            console.log(roomName)
            
            const room = await Room.initWithName(roomName);
            
            // 1 - criar perfil canino aleatorio aqui
            const canineProfile = await CanineProfile.init(roomName, room.inRoom);

            // 2 - salvar no banco de dados
            await canineProfile.save();

            // 3 - adicionar o breed do perfil canino na sala
            room.addInRoom(canineProfile.breed);
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
}