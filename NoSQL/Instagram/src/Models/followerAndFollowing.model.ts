const mongoose = require('mongoose')

enum status {
    accepted = 'accepted',
    rejected = 'rejected',
    pending = 'pending'
}
const FollowerFollowingSchema = new mongoose.Schema({

    Sender_id : {
        type : Object,
        ref : 'UserModel'
    },
    Receiver_id : {
        type : Object,
        ref : 'UserModel'
    },
    status :{
        type : status
    }
  
})

const FollowerFollowingModel = mongoose.model('FollowerFollowingModel',FollowerFollowingSchema)

export {FollowerFollowingModel};