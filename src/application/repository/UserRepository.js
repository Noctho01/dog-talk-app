
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
     * @param {String} especification 
     * @returns {Promise<UserModel>}
     */
    async findOne(props, especification) {
        return await this._userModel.findOne(props, especification);
    }
}