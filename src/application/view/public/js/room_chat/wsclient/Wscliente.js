export class Wsclient extends WebSocket {

    #components;

    constructor(andress, Components) {
        super(andress)
        this.#components = Components
    }

    message(msg) {
        const data = JSON.parse(msg.data);
        switch (data.type) {
            case 'message':
                this.#newMessage(data.message);
                break;
            case 'room_members_updated':
                this.#membersUpdate(data.membersInRoom);
                break;
            default :
                console.log('uma menssagem sem indentificação foi enviada:', data);
                break;
        }
    }

    #newMessage(message) {}

    #membersUpdate(membersInRoom) {
        this.#components.documents.membersInfo.innerHTML = ""
        membersInRoom.forEach(canineProfile => {
            this.#components.documents.membersInfo.innerHTML += this.#components.member(canineProfile);
        });
    }
}
