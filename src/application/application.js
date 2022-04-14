// Libs
import cors from 'cors';
import path from 'path';
import express from 'express';
import { renderFile } from 'ejs';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

// My Modules
import { viewRouter } from './route/viewRouter.js';
import { apiRouter } from './route/apiRouter.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

// configurando uso do __dirname
const
__filename = fileURLToPath(import.meta.url),
__dirname	= path.dirname(__filename);

// instaniando application
const application = express();

// render engine
application
.engine('html', renderFile)
.set('view engine', 'html')
.set('views', path.join(__dirname, '/view'));

// parsers
application
.use(express.static(path.join(__dirname, '/view/public')))
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
.use(viewRouter)
.use(apiRouter)
.use(errorMiddleware);

export { application }