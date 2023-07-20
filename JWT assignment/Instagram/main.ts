import express from 'express';
import { connectToDatabase } from './src/database/connection';
import { UserModel } from './src/Models/user.model'
import { PostModel } from './src/Models/posts.model'
//import { SignupModel } from './src/Models/signup.model';
import  authroutes  from './src/routers/authroutes'
const mongoose = require('mongoose')

/*Error*///const UserModel = require('./Models/user.model');
const app = express();
app.use(express.json())

connectToDatabase();

                                                                // UserModel({
                                                                //     _id : 1,
                                                                //     user_name : "ritvik_sahu",
                                                                //     first_name : "ritvik",
                                                                //     last_name : "sahu",
                                                                //     bio : "ritvik bio"

                                                                // }).save()

                                                                // PostModel({
                                                                //      user_id: 2 ,
                                                                //      post_id: 100 ,
                                                                //      created_at :  new Date()    ,
                                                                //      caption: "caption1" ,
                                                                //      total_likes : 16,
                                                                //      total_comments : 25 ,
                                                                //      hashtags : 
                                                                //      {
                                                                //         _id : 500,
                                                                //         hashtag_name : "hashtag1",
                                                                //      }
                                                                    
                                                                // }).save()

                                                                // SignupModel({
                                                                //     first_name : "Apurv" ,
                                                                //     last_name : "Dubey" ,
                                                                //     mail : "apurv7012001@gmail.com" ,
                                                                //     phone : 1234556789 ,
                                                                //     password : "HelloWorld!!!!!"
                                                                // }).save();
app.use('/api',authroutes)

app.get('/',(req,res)=>{
    res.send('welcome to api ! ')
})

const port = 3000;
app.listen(port,async()=>{
    console.log('listening on 3000');
  
});

