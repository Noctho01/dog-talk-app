// Libs
import express from 'express';
import cookieParser from 'cookie-parser';

// My Modules
import { router } from './route/routes.js';

// instaniando application
const application = express();

// parsers
application
.use(express.urlencoded({ extended: true }))
.use(express.json())
.use(cookieParser());

// middlewares
application
.use(router);

export { application }