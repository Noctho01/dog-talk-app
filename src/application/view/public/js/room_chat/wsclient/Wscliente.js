export class Wsclient extends WebSocket {

    #components;
    #roomName;

    constructor(andress, Components, roomName) {
        super(andress)
        this.#components = Components
        this.#roomName = roomName
    }

    message(msg) {
        const data = JSON.parse(msg.data);
        switch (data.type) {
            case 'message':
                this.#newMessage(data.body);
                break;
            case 'room_members_updated':
                this.#membersUpdate(data.membersInRoom);
                break;
            default :
                console.log('uma menssagem sem indentificação foi enviada:', data);
                break;
        }
    }

    #newMessage(body) {
        this.#components.documents.chatScreen.innerHTML += this.#components.getMsg(body);
        this.#components.documents.chatScreen.scrollTo(this.#components.documents.chatScreen.scrollWidth, this.#components.documents.chatScreen.scrollHeight + 1000);
    }

    #membersUpdate(membersInRoom) {
        this.#components.documents.chatInfo.innerHTML = this.#components.chatInfo(this.#roomName, membersInRoom.length)
        this.#components.documents.membersInfo.innerHTML = ""
        membersInRoom.forEach(canineProfile => {
            this.#components.documents.membersInfo.innerHTML += this.#components.member(canineProfile);
        });
    }
}
