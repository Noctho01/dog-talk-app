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

    findById(userid) {
        return this.userDb.find(user => user._id === userid);
    }
}