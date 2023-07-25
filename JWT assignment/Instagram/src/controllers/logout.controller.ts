import { UserModel } from "../Models/user.model";
import { Redis } from "../middleware/session.redis";
import { Sessions } from "./session.controller";
import { SessionModel } from "../Models/sessions.model";
import { authenticateToken } from "../middleware/auth";
import { Verify } from "../middleware/auth.user";

export class Logout{
    static async logout_user(req: any, res:any){
        try{
            const userToken = await Verify.verify_token(req.headers.authorization);
            const user = await UserModel.findOne({email: userToken.email});
            console.log(user)
            if(user){
                const id = user.id;
                const userSession = await SessionModel.findOne({user_id: id});
                if(userSession){
                    if(userSession.status){
                        Redis.logout_session_redis(userSession);
                        await SessionModel.findOneAndUpdate({_id: userSession.id}, {status: userSession.status});
                        res.status(201).json({message: "User logOut Successfully"});
                    }
                    else{
                        res.status(404).json({message:"User is already inactive"});
                    }
                }
                else{
                    res.status(404).json({message: "Session not found"});
                }
            }
            else{
                res.status(404).json({message:"User not found"});
            }

        }
        catch(err){
            res.status(500).json({message: "Server Error"});
        }
    }
    
}