import { FollowerFollowingModel } from "../Models/followerAndFollowing.model";
import { UserModel } from "../Models/user.model";
//import { Verify } from "../middleware/verify.user";


// API endpoint to handle follower-following requests
export async function follow(req: Request, res:Response){
  try {
    const { Sender_id, Receiver_id } = req.body;

    // Check if both sender and receiver exist in the database
    const sender = await UserModel.findById(Sender_id);
    const receiver = await UserModel.findById(Receiver_id);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }

    // Check if the follower-following relationship already exists
    const existingRelationship = await FollowerFollowingModel.findOne({
      Sender_id: Sender_id,
      Receiver_id: Receiver_id,
    });

    if (existingRelationship) {
      return res.status(409).json({ error: 'Relationship already exists' });
    }

    // Create a new follower-following relationship
    const newRelationship = new FollowerFollowingModel({
      Sender_id: Sender_id,
      Receiver_id: Receiver_id,
    });

    await newRelationship.save();

    return res.json({ message: 'Successfully followed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



