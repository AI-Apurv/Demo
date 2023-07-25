import express from 'express';
import { connectToDatabase } from './src/database/connection';
import { UserModel } from './src/Models/user.model'
import { PostModel } from './src/Models/posts.model'
//import { SignupModel } from './src/Models/signup.model';
import  authroutes  from './src/routers/authroutes'
import router from './src/routers/authroutes';
import { swaggerDefinition} from './src/swagger/userSwagger';
const swaggerJSDoc = require('swagger-jsdoc') 
const swaggerUi = require('swagger-ui-express')
import {redFun} from './src/redis/redis.client';

const app = express()
app.use(express.json())
const mongoose = require('mongoose')
//---------------------------------------------------swagger------------------------------------------
const options={
    swaggerDefinition,
    apis: ['./src/swagger/*'],
};
redFun();
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//------------------------------------------

connectToDatabase();


app.use('/api',authroutes)

app.get('/',(req,res)=>{
    res.send('welcome to api ! ')
})

const port = 3000;
// swaggerDocs(app,port)
app.listen(port,async()=>{
    console.log('listening on 3000');
});

