import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as logger from 'morgan';

import { Routes } from './lib/routes/assestRoutes'
import { UserRoutes } from "./lib/routes/userRoutes";

class App{

    public app: express.Application;
    public mongoUrl="mongodb://logan2020:vijay2020@ds251727.mlab.com:51727/mpoc";
    // public mongoUrl="mongodb://localhost:27017/mpoc";


    //our api routes
    public route: Routes = new Routes();
    public userRoutes: UserRoutes = new UserRoutes();
   


    constructor(){
        this.app=express();
        this.config();
        this.route.routes(this.app);
        this.userRoutes.userRoutes(this.app);
        this.mongoSetup();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(logger('dev'));
    }

    private mongoSetup(){
        mongoose.promise=global.Promise;
        mongoose.connect(this.mongoUrl);
    }

}

export default new App().app;