import redis from "redis";
import { createClient } from "redis";
import { UserModel } from "../Models/user.model";
import { authenticateToken } from "./auth";
import { Verify } from "./auth.user";

const client = createClient();

export class Redis{
    static async maintain_session_redis(user,device){
        await client.connect();
        client.on('error', err => console.log('Redis client error', err));
        try{
            if(user){
                await client.SET(user.username, JSON.stringify({
                    'user_id': user._id,
                    'device_id': device,
                    'status': true
                }));
                const session = await client.get(user.username);
                console.log(session);
            }
            else{
                console.log("User not found");
            }
        }
        catch(err){
            console.log(err);
        }
    }
    static async logout_session_redis(user){
        try{
            await client.SET(user.username, JSON.stringify({
                user_id: user.id,
                status: false
            }));
            const session = await client.get(user.username);
            console.log(session);
        }
        catch(err){
            console.log(err);
        }
    }
}