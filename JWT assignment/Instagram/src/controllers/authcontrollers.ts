import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi, { any } from 'joi';
import { SessionModel } from '../Models/sessions.model';
import { UserModel } from '../Models/user.model';
import { createClient } from 'redis';
import redisclient from '../redis/redis.client'
//import {redisConnect} from 'redis';



async function redisConnect() {
  const client = createClient();

  client.on('error', err => console.log('Redis Client Error', err));

}


//---------------------------------------------------------signup api ------------------------------------------------------
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const signup = async (req: Request, res: Response) => {
  // Joi validation schema
    const userValidationSchema = Joi.object({
      user_name: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().pattern(emailRegex).required(),
      bio: Joi.string().required(),
      profile_pic: Joi.string().required(),
      password: Joi.string().required().min(6).regex(/^(?=.*[A-Z])(?=.*[@$!*?&])[A-Za-z\d@$!%*?&]+$/),
    });

  // Validate the request body against the validation schema
      const { error } = userValidationSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

        const { user_name,first_name,last_name,email, bio ,profile_pic, password } = req.body;
        UserModel.findOne({user_name : user_name})
        .then((user_name : any)=> {
          if(user_name){
            return res.status(500).json({error : 'User already exists'})
          }
        })
      
    // Hash the password
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to hash password' });
      }
  
      // Create a new user document using the User model
      const newUser = new UserModel({user_name,first_name,last_name,email,bio,profile_pic, password: hashedPassword });

      //stored the registered user in redis
      await redisclient.set(`user: ${newUser.user_name}`,JSON.stringify(newUser))
  
      // Save the user document to the database
      newUser
        .save()
        .then(() => {
          res.status(201).json({ message: 'User registered successfully' });
        })
        .catch((err:any) => {
          res.status(500).json({ error: 'Failed to register user' });
        });
    });
  };
  






  
  //--------------------------------------------------------Login API endpoint---------------------------------------------------------------------------
  export const login = async (req: Request, res: Response) => {
    const { user_name, password } = req.body;
  
    try {
      // Find the user document by username
      const user: any = await UserModel.findOne({ user_name });
  
      if (!user) {
        console.log("user not found ")
        return res.status(401).json({ error: 'Authentication failed' });
      }
      
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
     
  
      if (!isPasswordValid) {
        console.log("password invalid")
        console.log(isPasswordValid)
        return res.status(401).json({ error: 'Authentication failed' });
      }
      
      // Create a JSON Web Token (JWT)
      const user_temp = {
        user_name : user_name ,

      }
      const token = jwt.sign(user_temp, 'secretKey');
      
      //Store the login token and status in redis
      await redisclient.set(`token:${user_temp}`,token)
      await redisclient.set(`status:${user_temp}`,'true')
  
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: 'Failed to authenticate user' });
    }
  };

  // export const login = async (req: Request, res: Response) => {
  //   const { email, password } = req.body;
  //   const client = createClient();
  //   client.connect();
  //   try {
  //     redisConnect();
  //     console.log("redis connected");
  //   }
    
  //   catch (err) { console.log(err); }
  //   UserModel.findOne({ email })
  //     .then((user:any) => {
  //       if (!user) {
  //         return res.status(401).json({ error: 'Authentication failed' });
  //       }
  //       bcrypt.compare(password, user.password, async (err, result) => {
  //         if (err || !result) {
  //           return res.status(401).json({ error: 'Authentication failed' });
  //         }
  //         const token = jwt.sign({ userId: user._id }, '8765');
  
  //         // res.status(200).json({ token });
  //         console.log("before")
  //         let session_payload: any = {
  //           user_id: user._id,
  //           device_id: "8765",
  //           IP_address: "876iuyt76jhg",
  //           isSessionSctive: true
  
  //         }
  //         console.log("after paylod")
  //         await SessionModel.insertMany([
  //           session_payload
  //         ])
  //         console.log(user._id)
  //         console.log("after insertion in session")
  //         await client.set(`${user._id}_session`, JSON.stringify(session_payload))
  //         console.log("after stringfy")
  //         return res.send({ message: "user login Successfully", token: token })
  //       });
  //     })
  //     .catch((err:any) => {
  //       res.status(500).json({ error: 'Failed to authenticate user' });
  //     });
  // };
  
  
 
 
    
  

