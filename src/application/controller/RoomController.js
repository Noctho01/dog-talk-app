import { Log as log } from "../../jobs/log.js";
import { RoomModel } from '../model/RoomModel.js';
import { RoomRepository } from '../repository/RoomRepository.js';
import { Room } from "../domain/Room.js";

const roomRepository = new RoomRepository(RoomModel);
Room.initRepository(roomRepository);

export class RoomController {

    static async getRooms(req, res, next) {
        try {
            const rooms = await Room.findAll();
            res
            .status(200)
            .set('Content-Type', 'application/json')
            .set('X-Powered-By', 'PHP Admin')
            .json(rooms);

            return log.web('get', '/register', 200);
            
        } catch (err) {
            log.web('get', '/rooms', 500);
            log.error(err);
            next(err.message);
        }
    }
}