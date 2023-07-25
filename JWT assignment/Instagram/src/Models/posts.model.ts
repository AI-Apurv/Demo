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
        type : Number ,
        ref : 'UserModel',
        required : true ,
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
        required: true ,
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
        type : String ,
        required : true 
    }
    // hashtags : {
    //     type : hashtags
    // }
})

const PostModel = mongoose.model('PostModel',PostSchema)
export {PostModel};