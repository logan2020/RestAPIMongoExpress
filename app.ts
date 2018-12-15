import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import { Routes } from './lib/routes/assestRoutes'

class App{

    public app: express.Application;
    public route: Routes = new Routes();
    public mongoUrl="mongodb://logan2020:vijay2020@ds251727.mlab.com:51727/mpoc";

    constructor(){
        this.app=express();
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    private mongoSetup(){
        mongoose.promise=global.Promise;
        mongoose.connect(this.mongoUrl);
    }

}

export default new App().app;