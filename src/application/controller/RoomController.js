import { Log as log } from "../../jobs/log.js";

export class RoomController {

    static getRooms(req, res, next) {
        try {
            log.web('get', '/register', 200);

            return res
            .status(200)
            .set('Content-Type', 'text/html')
            .set('X-Powered-By', 'PHP Admin')
            .render('rooms', { title:"Salas de Bate-Papo" });
            
        } catch (err) {
            log.web('get', '/rooms', 500);
            log.error(err);
            next(err.message);
        }
    }
}