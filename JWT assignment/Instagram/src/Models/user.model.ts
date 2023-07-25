import Joi from "joi";

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    // name :String ,
    // email : String ,
    // mobile: Number
    // _id : {
    //     type : Object
    // },
    user_name : {
        type : String ,
        required: true ,
        lowercase : true ,
        unique : true 
    },
    first_name : {
        type : String ,
        required: true 
    },

    last_name : {
        type : String ,
        required: true ,
    },
    email : {
        type : String ,
        required : true ,
    },
    follower_count : {
        type : Number ,
     //   required : true ,
    },
    following_count : {
        type : Number ,
     //   required : true ,
    }, 
    post_count : {
        type : Number , 
    //    required : true 
    },

    bio : {
        type : String ,
        required: true ,
    },
    profile_pic :{
        type : String ,
        required : true ,
    },
    password :{
        type : String ,
        required : true ,
    },

})

const UserModel = mongoose.model('UserModel',UserSchema)



export {UserModel};