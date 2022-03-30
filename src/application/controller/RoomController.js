export class RoomController {

    static renderRoomsList(req, res, next) {
        try {
            return res
            .status(200)
            .set('Content-Type', 'text/html')
            .render('rooms', { title:"Salas de Bate-Papo" });
            
        } catch (err) {
            next(err);
        }
    }
}