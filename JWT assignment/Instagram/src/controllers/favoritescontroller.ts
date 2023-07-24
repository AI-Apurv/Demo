import User from "../models/user.schema";
import { Post } from "../models/post.schema";
import Favourites from "../models/favourites.schema";
import { Verify } from "../middleware/verify.user";

export class UserFavourites{
    static async user_favourites(req:any, res:any){
        try{
            const user = await Verify.verify_token(req.headers.authorization);
            const isUser = await User.find({email: user.email});

            if(isUser){
                const user_id = isUser[0]._id;
                const isPost = await Post.find({user_id : user_id});
                if(isPost){
                    const add_favourites = new Favourites({
                        user_id: isPost[0].user_id,
                        post_id: isPost[0]._id
                    });
                    const AddFav = await add_favourites.save();
                    res.status(201).json({message: "Add to Favourites Successfully"});
                    console.log(AddFav);
                }
                else{
                    res.status(404).json({message: "Post Not Found"});
                }
            }
            else{
                res.status(404).json({message: "User Not Found"});
            }
        }
        catch(err){
            res.status(500).json({message: "Server Error"});
        }
    }
}