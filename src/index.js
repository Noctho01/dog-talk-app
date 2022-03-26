import { application } from "./application/application.js";
import { createServer } from 'http';
import { config } from "dotenv";

config({ path: process.env.NODE_ENV === 'dev' ? 'src/.env.dev' : null });

export const server = createServer(application);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server listening in port ${PORT}`));