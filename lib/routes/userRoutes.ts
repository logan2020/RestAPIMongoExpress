import { Request, Response } from "express";

import { UserController } from "../controllers/userController";

export class UserRoutes{

    public userController: UserController = new UserController();

    public userRoutes(app): void{
        app.route('/addUser')
        // To register the user
        .post(this.userController.addUser)

        app.route('/signIn')
        // to login and get jwt token
        .post(this.userController.signIn)
    }
}