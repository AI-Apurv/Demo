const mongoose = require('mongoose')
const hashtags = new mongoose.Schema({

    _id : {
        type : Object
    },
    hashtag_name : {
        type : String,
    },

})
const PostSchema = new mongoose.Schema({
   
    user_id : {
        type : Object ,
        ref : 'UserModel'
    },
    post_id : {
        type : Object ,
        //required: true ,
    },
    created_at : {
        type : String ,
    },

    caption : {
        type : String ,
       // required: true ,
    },

    total_likes : {
        type : Number ,
       // required: true ,
    },
    total_comments : {
        type : Number ,
       // required : true
    },
    post_url  :
    {
        type : String
    }
    // hashtags : {
    //     type : hashtags
    // }
})

const PostModel = mongoose.model('PostModel',PostSchema)
export {PostModel};