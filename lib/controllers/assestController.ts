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

    public retriveSingleRecord(req: Request, res: Response){
        let id=req.params.id;
        Assest.find({_id: id},(err,payload)=>{
            if(err){
                res.status(500).send({
                    message: "unable to fetch the record"
                })
            }
            else{
                res.status(200).send(payload);
            }
        });
    }

    public updateSystemNumberForRecord(req: Request, res: Response){
        Assest.find({_id:req.body._id},(err,record)=>{
            if(err){
                res.status(500).send({
                    message: "unable to fetch the record"
                })
            }
            else{
                let newAssest= new Assest(record[0]);
                newAssest["system_number"]=req.body.system_number;
                newAssest.save((err,assest)=>{
                    if(err){
                        res.status(500).send({
                            message: "unable to update the record"
                        })
                    }
                    else{
                        res.status(200).send(assest);
                    }
                })
            }
        })
    }

    deleteSingleRecord(req: Request, res: Response){
        Assest.deleteOne({_id: req.body._id},(err) => {
            if(err){
                res.status(500).send({
                    message: "there was a problem to delete your request"
                })
            }
            else{
                res.status(200).send({
                    message: "record deleted aairuchu"
                });
            }
        })
    }
}