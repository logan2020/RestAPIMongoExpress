import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const assestSchema= new Schema({
    name:{
        type: String,
        required: 'Enter name'
    },
    email: {
        type: String,
        required: 'Enter email address'
    },
    sap_id:{
        type: String,
        required: 'Enter sap id'
    },
    system_number:{
        type: String
    }
});