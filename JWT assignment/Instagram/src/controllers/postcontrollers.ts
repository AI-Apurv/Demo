import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {UserModel} from "../Models/user.model";
import { PostModel} from '../Models/posts.model'; 

const JWT_SECRET_KEY = 'secretKey'

export async function createPost(req: Request, res: Response) {
  try {
    const { caption, post_url } = req.body;
    const token = req.header('Authorization')?.split(' ')[1];
    console.log(token)

    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    // Verify the token and extract user information from it
    const decodedToken = jwt.verify(token, 'secretKey')
    console.log(decodedToken)
    const  user_name  = decodedToken;
  
   
    // Check if a post with the same post_url already exists
    const existingPost = await PostModel.findOne({ post_url });

    if (existingPost) {
      return res.status(409).json({ error: 'Post with the same URL already exists' });
    }

    // Create a new post using the Post model and save it to the database
    const newPost = new PostModel({
      user_id: UserModel._id, // Associate the post with the user using their user_id
      caption,
      post_url,
    });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', createdBy: { user_name }, post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}






