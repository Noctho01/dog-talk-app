export class Room {

    static #repository;

    /**@type {String} */
    #id;

    /**@type {String} */
    #name;

    /**@type {Number} */
    #limit;

    /**@type {Number} */
    #inRoom;

    /**
     * @description Constructor Method
     * @param {String} name
     * @param {Number} limit 
     * @param {Array} inRoom
     */
    constructor(id, name, limit, inRoom) {
        this.#id = id;
        this.#name = name;
        this.#limit = limit;
        this.#inRoom = inRoom;
    }

    // Getter Methods
    get id() { return this.#id }
    get name() { return this.#name }
    get limit() { return this.#limit }
    get inRoom() { return this.#inRoom }

    /**
     * @description Metodo Statico de inicialização de repositorio
     * @param {RoomRepository} repository
     * @static
     * @public
     */
     static initRepository(repository) {
        Room.#repository = repository;
    }

    /**
     * @description Retorna resposta de confirmação da existencia de um repositorio no objeto Room
     * @static
     * @public
     * @returns {Boolean}
     */
    static repositoryExist() {
        return Room.#repository ?true:false;
    }

    /**
     * @description Retorna array com todos as salas
     * @returns {Array<Room>}
     */
    static async findAll() {
        const roomsDomain = [];
        const rooms = await Room.#repository.findAll('_id name limit inRoom');
        if (!rooms || rooms.length === 0) throw new Error('Salas não encontradas');
        rooms.forEach(room => {
            let newRoom = new Room(
                room._id,
                room.name,
                room.limit,
                room.inRoom,
            );

            roomsDomain.push({
                name: newRoom.name,
                limit: newRoom.limit,
                inRoom: newRoom.inRoom.length
            });
        });

        return roomsDomain;
    }

    /**
     * @description aduciona os dados do documento refente ao id na instancia de Room
     * @param {String} roomName 
     * @static
     * @public
     * @returns {Room}
     */
     static async initWithName(roomName) {
        if (!roomName || roomName === undefined || roomName === null) throw new Error('o nome da sala não foi informado');
        const room = await Room.#repository.findOne({name: roomName}, '_id name limit inRoom');
        if (!room) throw new Error('Esta sala não existe');
        
        return new Room(
            room._id,
            room.name,
            room.limit,
            room.inRoom
        );
    }

    /**
     * @description Adiciona mais um id de uma entidade CanineProfile ao array inRoom de Room
     * @param {String} newCanineProfileBreed
     */
    addInRoom(newCanineProfileBreed) {
        this.#inRoom.push(newCanineProfileBreed);
    }

    removeInRoom(canineProfileId) {
        this.#inRoom.splice(this.#inRoom.indexOf(canineProfileId), 1)
    }

    /**
     * @description Metodo insere objeto<documento> ao banco de dados
     * @public
     */
     async save() {
        if (!this.#id) throw new Error('id não foi definido');
        if (!this.#name) throw new Error('name não foi definido');
        if (!this.#limit) throw new Error('limit não foi definido');
        if (!this.#inRoom) throw new Error('inRoom não foi definido');

        const room = await Room.#repository.findOne({ _id: this.#id }, '_id name');
        if (!room || room === undefined || room == null || room.length === 0) throw new Error('Sala não encontrada');
        
        const updateResult = await Room.#repository.update({_id: this.#id}, { inRoom: this.#inRoom });

        if (!updateResult.acknowledged) throw new Error('As alterações desta sala não foram salvas');
    }
}