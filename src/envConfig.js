import { config } from "dotenv";
config({ path: process.env.NODE_ENV === 'dev' ? 'src/.env.dev' : null });

export default {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    SECRET_KEY: process.env.SECRET_KEY
}