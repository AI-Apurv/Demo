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
 

//------------------------------update the post--------------------------------
//some doubt
export async function editPost(req: Request, res: Response) {
  try {
    const postId = req.query._id;
    const { caption, post_url } = req.body;
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    try {
      // Verify the token using the secret or public key
      const decodedToken = jwt.verify(token, 'secretKey');
      // 'YOUR_SECRET_KEY' should be replaced with the actual secret key you used to sign the token.

      // Now you can use the decodedToken to access its properties, if needed.
      console.log(decodedToken);

      const post = await PostModel.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      post.caption = caption;
      post.post_url = post_url;
      await post.save();

      res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      // Token verification failed
      console.error('Error verifying token:', error);
      return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
  } catch (error) {
    console.error('Error editing post:', error);
    res.status(500).json({ error: 'Failed to edit post' });
  }
}



//--------------------------------------delete post----------------------------------
export async function deletePost(req: Request, res: Response) {
  try {
    const postId = req.params.postId;
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    try {
      // Verify the token using the secret or public key
      const decodedToken = jwt.verify(token, 'secretKey');
      // 'YOUR_SECRET_KEY' should be replaced with the actual secret key you used to sign the token.

      // Now you can use the decodedToken to access its properties, if needed.
      console.log(decodedToken);

      const post = await PostModel.findByIdAndDelete(postId);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      // Token verification failed
      console.error('Error verifying token:', error);
      return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
}





