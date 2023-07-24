const mongoose = require('mongoose');

const statusEnum = ['accepted', 'rejected', 'pending'];

const FollowerFollowingSchema = new mongoose.Schema({
  Sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  Receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  status: {
    type: String,
    enum: statusEnum,
    default: 'pending', // Optional: Set a default value for the status field if not provided
  },
});

const FollowerFollowingModel = mongoose.model('FollowerFollowingModel', FollowerFollowingSchema);

export { FollowerFollowingModel };
