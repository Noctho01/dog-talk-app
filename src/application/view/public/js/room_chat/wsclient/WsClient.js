export class WsClient {

    /**@private @type {Components}*/
    #Components;

    /**@private @type {String}*/
    #HOST;

    /**@private @type {String}*/
    #PROTO;

    /**@private @type {String}*/
    #roomServerName;

    /**@private @type {WebSocket}*/
    #ws;

    constructor(WebSocket, roomName, Components) {
        this.#Components = Components;
        this.#HOST = 'localhost:3030';
        this.#PROTO = 'ws';
        this.#roomServerName = roomName.toLowerCase();
        this.#ws = new WebSocket(`${this.#PROTO}://${this.#HOST}/${this.#roomServerName}`);
    }

    execute() {
        this.#ws.onopen = () => {
            console.log('connection to ws server started')
            
            // Solicitando evento room_update
            this.#emit('req_room_data');
        }

        // quando ouvir um evento vai chamar o switchTypeData para seleciona qual processo seguir
        this.#ws.onmessage = msg => {
            const data = JSON.parse(msg.data);
            console.log(data.body)
            this.#switchTypeData(data);
        }
    }

    // emit um evento
    #emit(type, body) {
        this.#ws.send(JSON.stringify({ type, body }));
    }

    // seleciona evento baseado no tipo de data
    #switchTypeData(data) {
        switch(data.type) {
            case 'res_room_data':
                this.#roomUpdate(data.body);
                break;

            case 'new_canine_profine':
                this.#roomUpdate(data.body);
                break;

            case 'delete_canine_profile':
                
                //this.#roomUpdate(data.body);
                break;
        }
    }

    // seta os dados da lista de membros da sala
    #roomUpdate(room) {
        this.#Components.documents.membersInfo.innerHTML = ""
        room.membersInRoom.forEach(canineProfile => {
            this.#Components.documents.membersInfo.innerHTML += this.#Components.member(canineProfile);
        });
    }
}