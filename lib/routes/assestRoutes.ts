import {Request, Response} from "express";

import { AssestController } from "../controllers/assestController";

export class Routes{

    public assestController: AssestController= new AssestController();

    public routes(app): void{
        app.route('/')
        .get((req:Request, res: Response)=>{
            res.status(200).send({
                message:"Get request successfull"
            });
        })

        // To retrive all assest records
        app.route('/assest')
        .get(this.assestController.retriveRecords)

        // To post a Record to server
        .post(this.assestController.addNewRecord)

        // To delete a Record from server
        .delete(this.assestController.deleteSingleRecord)
        
        app.route('/assest/edit')
        .put(this.assestController.updateSystemNumberForRecord)

        // to retrive single record
        app.route('/assest/:id')
        .get(this.assestController.retriveSingleRecord)
    }
}