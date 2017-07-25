import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';

import BaseController from './controllers/BaseController';
import DisplayController from './controllers/DisplayController';

class App   {
    public express: express.Application;
    
    constructor()   {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void  {
        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'testing') {
            this.express.use(morgan('dev'));
        }
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
    }

    private routes(): void   {
        this.express.use('/', BaseController.router);
        this.express.use('/display', DisplayController.router);
    }
}

export default new App().express;
