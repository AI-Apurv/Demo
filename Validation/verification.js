const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

app.post('/',(req,res)=>{
    res.send("This is our main page")
})

app.post('/userVerification',(req,res)=>{
         var name = req.body.n
         var password = req.body.p 

         if(name == 'Apurv' && password =='qwerty123')
         {
            res.send('Login Successful')
         }
         else 
         {
            res.send('Login Id or password is incorrect')
         }
})

app.listen(port,()=>{
    console.log("Page working")
})