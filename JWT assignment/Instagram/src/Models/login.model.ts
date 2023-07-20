const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({

    user_name :{
        type : String ,
        required : true ,
    },
    password : {
        type : String ,
        required : true ,
    }

})

const LoginModel = mongoose.model('LoginModel',LoginSchema)

export {LoginModel};