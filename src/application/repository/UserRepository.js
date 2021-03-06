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

    async findAll(condition, projection) {
        return await this._userModel.find(condition, projection);
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

    async update(condition, updated){
        return await this._userModel.updateOne(condition, updated);
    }
}