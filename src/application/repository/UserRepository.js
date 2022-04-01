export class UserRepository {

    /**
     * @param {Object} userModel 
     */
    constructor(userModel) {
        this._userModel = userModel;
    }


    /**
     * @param {Object} userData 
     */
    async create(userData) {
        this._userModel.create(userData);
    }


    /**
     * @param {Objects} props 
     * @param {String} projection
     * @returns {Promise<UserModel>}
     */
    async findOne(props, projection) {
        return await this._userModel.findOne(props, projection);
    }


    /**
     * @param {String} userid 
     * @param {String} projection 
     * @returns  {Promise<UserModel>}
     */
    async  findById(userid, projection) {
        return await this._userModel.findById(userid, projection)
    }


    async deleteById(userid) {
        return await this._userModel.deleteOne({ _id: userid });
    }
}