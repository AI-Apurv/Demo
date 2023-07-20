import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {UserModel} from "../Models/user.model";
import { PostModel} from '../Models/posts.model'; 

const JWT_SECRET_KEY = 'secretKey'

export async function createPost(req: Request, res: Response) {
  try {
    const { caption, post_url } = req.body;
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    // Verify the token and extract user information from it
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY,) as { user_name: string , email: string };
    const { user_name, email } = decodedToken;

   
    PostModel.findOne({email})
        .then((email : any)=> {
          if(email){
            return res.status(500).json({error : 'Post already exists'})
          }
        })

    // Create a new post using the Post model and save it to the database
    const newPost = new PostModel({
      user_id: UserModel._id, // Associate the post with the user using their user_id
      caption,
      post_url,
    });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', createdBy: { user_name, email }, post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}






