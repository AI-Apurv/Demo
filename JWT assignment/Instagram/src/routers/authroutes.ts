import express from 'express';
import {signup, login} from '../controllers/authcontrollers'
import { createPost } from '../controllers/postcontrollers';


const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/post',createPost);

export default router ;

