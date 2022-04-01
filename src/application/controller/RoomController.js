import { Log as log } from "../../jobs/log.js";

export class RoomController {

    static getRooms(req, res, next) {
        try {
            res
            .status(200)
            .set('Content-Type', 'application/json')
            .set('X-Powered-By', 'PHP Admin')
            .json({ message: 'lista de rooms' });

            return log.web('get', '/register', 200);
            
        } catch (err) {
            log.web('get', '/rooms', 500);
            log.error(err);
            next(err.message);
        }
    }
}