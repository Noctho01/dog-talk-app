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
            // 1 - criar perfil canino aleatorio aqui
            // 2 - salvar no banco de dados
            // 3 - adicionar id do perfil canino na sala

            res
            .set('Access-Control-Allow-Credentials', 'true')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .set('Content-Type', 'application/json')
            .json({ message: 'room selected' });

            return log.web('get', `/room/${roomName}`, 201);

        } catch (err) {
            log.web('get', `/room/${roomName}`, 500);
            next(err.message);
        }
    }
}