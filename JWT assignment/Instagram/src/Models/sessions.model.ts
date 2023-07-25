const mongoose = require('mongoose')
import {boolean} from 'joi' ;
import {Schema , model} from 'mongoose'

// interface Session {
//     user_id : string;
//     device_id : string ;
//     status : boolean
// }

const SessionSchema = new mongoose.Schema({

    // session_id : {
    //     type : Object
    // },
    user_id : {
        type : String ,
        required: true ,
        ref : 'UserModel'
    },
    device_id : {
        type : String ,
       // required: true 
    },

    status : {
        type : Boolean ,
        required: true ,
    },

    // session_end : {
    //     type : Date ,
    //     required: true ,
    // }
})

const SessionModel = mongoose.model('SessionModel',SessionSchema)

export {SessionModel};