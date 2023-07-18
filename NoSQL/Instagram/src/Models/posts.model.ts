const mongoose = require('mongoose')
const hashtags = new mongoose.Schema({

    _id : {
        type : Object
    },
    hashtag : {
        type : String,
    },

})
const PostSchema = new mongoose.Schema({
    // name :String ,
    // email : String ,
    // mobile: Number
    user_id : {
        type : Object ,
        ref : 'UserModel'
    },
    post_id : {
        type : Number ,
        required: true ,
        lowercase : true
    },
    created_at : {
        type : Date ,
    },

    caption : {
        type : String ,
        required: true ,
    },

    total_likes : {
        type : Number ,
        required: true ,
    },
    total_comments : {
        type : Number ,
        required : true
    },
    hashtags : {
        type : hashtags
    }
})

const PostModel = mongoose.model('PostModel',PostSchema)
export {PostModel};