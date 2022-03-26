import { Schema, model, connect, connection } from 'mongoose';

main()

async function main() {
    try {
        // conectando ao banco de dados mongodb atlas
        await connect(process.env.DB_URL);
        console.log('db is connected');

        // testando connexão
        connection.on('error', err => {
            if (err) throw err
        });

    } catch (err) {
        throw err
    }
}

export { model, Schema }