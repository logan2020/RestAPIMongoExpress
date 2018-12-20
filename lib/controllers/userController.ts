import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
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
        User.findOne({email:req.body.email},(err,user)=>{
            if(err){
                res.status(500).send({
                    message: "There was an error while sign in"
                })
            }
            else{
                if(bcrypt.compareSync(req.body.password,user.password)){
                    const token = jwt.sign({id:user._id},req.app.get('secret'),{expiresIn: '1h'});
                    res.status(200).send({
                        status: "Logged In Successfully",
                        token: token,
                        userData: user
                    })
                }
            }
        })
        // https://medium.com/@bhanushali.mahesh3/building-a-restful-crud-api-with-node-js-jwt-bcrypt-express-and-mongodb-4e1fb20b7f3d
    }
}
