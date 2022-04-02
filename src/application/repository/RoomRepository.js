export class RoomRepository {

    /**
     * @param {Object} roomModel 
     */
    constructor(roomModel) {
        this._roomModel = roomModel;
    }
    

    /**
     * @param {Objects} props 
     * @param {String} projection
     * @returns {Promise<UserModel>}
     */
    async findOne(props, projection) {
        return await this._roomModel.findOne(props, projection);
    }


    /**
     * @param {String} roomid 
     * @param {String} projection 
     * @returns  {Promise<UserModel>}
     */
    async  findById(roomid, projection) {
        return await this._roomModel.findById(roomid, projection)
    }

    async deleteById(roomid) {
        return await this._roomModel.deleteOne({ _id: roomid });
    }

    async findAll(projection) {
        return await this._roomModel.find().exec();
    }

    async update(condition, updated){
        return await this._roomModel.updateOne(condition, updated);
    }
}