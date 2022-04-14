import { Log as log } from "../../jobs/log.js";
import { roomServices } from "../services/RoomServices.js";
import { canineProfileServices } from "../services/CanineProfileServices.js";

export class CanineProfileController {
    static async createProfile(req, res, next) {
        const { roomName } = req.body;
        const { id: userid } = req.user;
        try {
            const inRoom = await roomServices.getInRoom(roomName);
            await canineProfileServices.create(userid, roomName, inRoom);
            await roomServices.addInRoom(roomName, userid);

            return res
            .status(201)
            .set('Access-Control-Allow-Credentials', 'true')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .set('Content-Type', 'application/json')
            .json({ message: 'canine profile created' });

        } catch (err) {
            next(err);
        }
    }

    static async getProfile(req, res, next) {
        const { id: userid } = req.user;
        try {
            const { canineProfile } = await canineProfileServices.findOne(userid);

            return res
            .status(200)
            .set('Access-Control-Allow-Credentials', 'true')
            .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
            .set('Content-Type', 'application/json')
            .json({ canineProfile });

        } catch (err) {
            next(err);
        }
    }
}