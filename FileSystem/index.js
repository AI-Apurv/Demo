const fs = require('fs')
const express = require('express')
const app = express();
const multer = require('multer')
//const path = require('path')


const upload = multer({dest:'upload/'})

app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    return res.send('<form action="/upload" method="POST" enctype="multipart/form-data"><input type="file"name="Textfile"><button type="submit">upload</button></form>')
})
app.post('/upload',upload.single('Textfile'),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    return res.redirect('/')
})
    
app.listen(3000,()=>{
    console.log("server connected")
})