import envConfig from '../../../envConfig.js';
import { Log as log} from '../../../jobs/log.js';
import mongoose from 'mongoose';

const { Schema, model, connect, connection } = mongoose;
const DB_URL = envConfig.DB_URL;

main()

async function main() {
    try {
        // conectando ao banco de dados mongodb atlas
        await connect(DB_URL);
        log.debug('db.js', 12, 'db is connected');

        // testando connexão
        connection.on('error', err => {
            if (err) throw err
        });

    } catch (err) {
        log.error(err);
    }
}

export { model, Schema }