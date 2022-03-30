import envConfig from '../../../envConfig.js';
import { Log as log} from '../../../jobs/log.js';
import mongoose from 'mongoose';

const { Schema, model} = mongoose;
const DB_URL = envConfig.DB_URL;

main()

async function main() {
    await mongoose.connect(DB_URL);
    try {
        mongoose.connection.on('error', err => { if (err) throw err });
        log.debug('src/application/model/database/db.js', 14, 'db is connected');
    } catch (err) {
        log.error(err);
    }
}

export { model, Schema, mongoose}