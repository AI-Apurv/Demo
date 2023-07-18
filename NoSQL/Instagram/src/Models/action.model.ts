const mongoose = require('mongoose')
const comment_reply = new mongoose.Schema({
    reply_id : {
        type : Number
    },
    user_id : {
        type : Number,
    },
    reply_count :
    {
        type : Number
    },
    reply_message :{
        type : String
    },
    total_likes :
    {
        type : Number
    }

})
const PostSchema = new mongoose.Schema({
    user_id : {type : Object ,
        ref : 'UserModel'
    },
    post_id : { type : Number ,
        required: true ,
        lowercase : true
    },
    created_at : {type : Date ,
        required: true 
    },

    caption : { type : String ,
        required: true ,
    },

    total_likes : {type : Number ,
        required: true ,
    },
    total_comments : {type : Number ,
        required : true
    },
    comment_replies : {
        type : comment_reply
    }
})

const PostModel = mongoose.model('PostModel',PostSchema)

export {PostModel};