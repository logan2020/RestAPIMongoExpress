import * as mongoose from 'mongoose';
import {Request, Response} from 'express';

import { assestSchema } from "../models/assestModel";

const Assest= mongoose.model('Assest', assestSchema);

export class AssestController{

    public addNewRecord(req: Request, res: Response){
        let newAssest= new Assest(req.body);
        newAssest.save((err,assest)=>{
            if(err)
                res.status(500).send(err);
            else
                res.status(200).send(assest);
        })
    }

    public retriveRecords(req: Request, res: Response){
        Assest.find({},(err, data)=>{
            if(err)
                res.status(500).send(err);
            else
                res.status(200).send(data);
        })
    }
}