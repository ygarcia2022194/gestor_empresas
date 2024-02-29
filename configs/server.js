'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import dotenv from 'dotenv';
import userRoutes from '../src/user/user.routes.js';
import companyRoutes from '../src/companies/company.routes.js';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/companyControl/v1/users'
        this.companyPath = '/companyControl/v1/company'

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
       this.app.use(this.userPath, userRoutes);
       this.app.use(this.companyPath, companyRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;