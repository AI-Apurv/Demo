import express from 'express';
import { connectToDatabase } from './src/database/connection';
import { UserModel } from './src/Models/user.model';
import { PostModel } from './src/Models/posts.model'

const mongoose = require('mongoose')

/*Error*///const UserModel = require('./Models/user.model');
const app = express();
app.use(express.json())

connectToDatabase();

UserModel({
    _id : 1,
    user_name : "ritvik_sahu",
    first_name : "ritvik",
    last_name : "sahu",
    bio : "ritvik bio"

}).save()

// PostModel({
//      user_id: 2 ,
//      post_id: 100 ,
     
//      caption: "caption1" ,
//      total_likes : 16,
//      total_comments : 25 ,
     
// }).save()

const port = 3000;
app.listen(port,async()=>{
    console.log('listening on 3000');
  
});

