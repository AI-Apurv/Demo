const express = require('express');
const index = express();
const port = 7000;
index.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

index.get('/add/:num1/:num2', function (req, res) {
    var num1 =0 
    num1 = parseInt(req.params.num1)
    var num2 =0 
    num2 = parseInt(req.params.num2)
    var sum =0 
    sum =  (num1 + num2).toString()
    res.send(sum)
})

index.get('/subtract/:num1/:num2', function (req, res) {
    var num1 =0 
    num1 = parseInt(req.params.num1)
    var num2 =0 
    num2 = parseInt(req.params.num2)
    var subtract =0 
    subtract =  (num1 - num2).toString()
    res.send(subtract)
})

index.get('/multiply/:num1/:num2', function (req, res) {
    var num1 =0 
    num1 = parseInt(req.params.num1)
    var num2 =0 
    num2 = parseInt(req.params.num2)
    var multiply =0 
    multiply =  (num1 * num2).toString()
    res.send(multiply)
})

index.get('/divide/:num1/:num2', function (req, res) {
    var num1 =0 
    num1 = parseInt(req.params.num1)
    var num2 =0 
    num2 = parseInt(req.params.num2)
    var divide =0 
    divide =  (num1 / num2).toString()
    res.send(divide)
})


index.listen(port , (error)=>
{
    if(!error)
    console.log("Server is successfully running");
    else 
    console.log("Error occured");
});