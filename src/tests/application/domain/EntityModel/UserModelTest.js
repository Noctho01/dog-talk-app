export class UserModelTest {
    constructor() {
        this.userDb = [{ _id:'123', email: 'vinicius@gmail.com', pwdHash: 'minhaSenha123' }];
    }

    async findOne(props) {
        let findeds;
        this.userDb.forEach(user => {
            Object.keys(props).forEach(prop => {
                if (user[prop] === props[prop]) findeds = user;
            });
        });
        return findeds;
    }

    async create(props) {
        this.userDb.push(props);
    }

    async findById(userid) {
        return this.userDb.find(user => user._id === userid);
    }

    async deleteOne(prop) {
        const user = this.userDb.find(user => user._id === prop._id);
        if (!user) return { deletedCount: 0 };
        this.userDb.splice(this.userDb.indexOf(user), 1);
        return { deletedCount: 1 };
    }

    async updateOne(condition, updated){
        let result = false;
        this.userDb.forEach(user => {
            Object.keys(condition).forEach(prop => {
                if (user[prop] === condition[prop]) {
                    result = true;
                    Object.keys(updated).forEach(propUd => {
                        user[propUd] = updated[propUd];
                    });
                }
            });
        });

        return result;
    }
}