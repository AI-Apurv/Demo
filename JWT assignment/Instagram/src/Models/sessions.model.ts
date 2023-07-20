const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({

    session_id : {
        type : Object
    },
    user_id : {
        type : Object ,
        required: true ,
        ref : 'UserModel'
    },
    session_duration : {
        type : Number ,
        required: true 
    },

    session_start : {
        type : Date ,
        required: true ,
    },

    session_end : {
        type : Date ,
        required: true ,
    }
})

const SessionModel = mongoose.model('SessionModel',SessionSchema)

export {SessionModel};