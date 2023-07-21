import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi, { any } from 'joi';

import { UserModel } from '../Models/user.model';




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
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to hash password' });
      }
  
      // Create a new user document using the User model
      const newUser = new UserModel({user_name,first_name,last_name,email,bio,profile_pic, password: hashedPassword });
  
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
  
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: 'Failed to authenticate user' });
    }
  };


 
 
    
  

