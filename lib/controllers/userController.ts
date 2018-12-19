import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";

import { userSchema } from "../models/userModel";
const User = mongoose.model('User', userSchema);

export class UserController{
    
    public addUser(req:Request,res:Response){
        const saltRounds=10;
        let newUser=new User(req.body);
        // hash the password
        newUser.password=bcrypt.hashSync(newUser.password, saltRounds);

        //save into mongodb
        newUser.save((err,user)=>{
            if(err){
                console.log(err);
                res.status(500).send({
                    message: "Failed to insert user at this time"
                })
            }
            else{
                res.status(200).send(user);
            }
        })
    }

    public signIn(req:Request, res: Response){
        // User.findOne({req.body.email})
        // https://medium.com/@bhanushali.mahesh3/building-a-restful-crud-api-with-node-js-jwt-bcrypt-express-and-mongodb-4e1fb20b7f3d
    }
}
