const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    // name :String ,
    // email : String ,
    // mobile: Number
    _id : {
        type : Object
    },
    user_name : {
        type : String ,
        required: true ,
        lowercase : true
    },
    first_name : {
        type : String ,
        required: true 
    },

    last_name : {
        type : String ,
        required: true ,
    },

    bio : {
        type : String ,
        required: true ,
    }
})

const UserModel = mongoose.model('UserModel',UserSchema)

export {UserModel};