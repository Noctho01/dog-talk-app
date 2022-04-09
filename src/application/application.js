// Libs
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

// My Modules
import { router } from './route/routes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

// instaniando application
const application = express();

// parsers
application
.use(express.urlencoded({ extended: true }))
.use(express.json())
.use(cookieParser());

// middlewares
application
.use(cors({
    origin: 'http://localhost:3001',
    methods: ['DELETE','GET','POST','PUT','PATH'],
    credentials: true
}))
.use(router)
.use(errorMiddleware);

export { application }