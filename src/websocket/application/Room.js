export class Room {

    /**@private @type {String}*/
    #roomName;

    /**@private @type {WebSocketServer}*/
    #wss;

    constructor(WebSocketServer, roomName) {
        this.#roomName = roomName;
        this.#wss = new WebSocketServer({ noServer: true });
    }

    get roomName() {
        return this.#roomName;
    }

    handleUpgrade(req, socket, head) {
        return this.#wss.handleUpgrade(req, socket, head, ws => {
            this.#wss.emit('connection', ws, req);
        });
    }

    onConnection() {
        this.#wss.on('connection', (ws, req) => {
            console.log('alguem acessou o servidor', this.#roomName);
            ws.on('message', dataBuffer => {
                const data = JSON.parse(dataBuffer);

                switch(data.type) {
                    case "0":
                        break;
                    case "1":
                        break;
                    case "2":
                        break;
                    case "3":
                        break;
                    case "4":
                        break;
                    case "5":
                        break;
                    case "6":
                        break;
                    case "7":
                        break;
                    default:
                        break;
                }

            });
        });
    }
}