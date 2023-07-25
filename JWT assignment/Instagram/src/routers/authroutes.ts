import express, { Router } from 'express';
import {signup, login} from '../controllers/authcontrollers'
import { createPost, deletePost, editPost } from '../controllers/postcontrollers';

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/post',createPost);
router.put('/editPost',editPost)
router.post('/deletePost',deletePost)
router.get('/logout',Logout.logout_user);


export default router ;

