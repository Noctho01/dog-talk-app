import { Log as log } from "../../jobs/log.js";
import { roomServices } from "../domain/RoomServices.js";

const roomRepository = new RoomRepository(RoomModel);
roomServices.injectionDependences({repository: roomRepository});

export class RoomController {
    static async getRooms(req, res, next) {
        log.web('get', '/rooms', 200);
        
        try {
            const rooms = await roomServices.findAll();
            return res
            .status(200)
            .set('Access-Control-Allow-Credentials', 'true')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .set('Content-Type', 'application/json')
            .json({ rooms: rooms});
            
        } catch (err) {
            log.web('get', '/rooms', 500);
            next(err);
        }
    }
}