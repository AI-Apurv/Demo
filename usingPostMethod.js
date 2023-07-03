const express = require('express')
const app = express();

app.use(express.json());

app.post('/add',(req, res)=>
{
    var num1 = req.body.a ;
    var num2 = req.body.b ;
    var sum = num1 + num2 ;
    console.log(sum);
    res.send(`Sum is ${sum}`);
})

app.post('/sub',(req, res)=>
{
    var num1 = req.body.a ;
    var num2 = req.body.b ;
    var sub = num1 - num2 ;
    console.log(sub);
    res.send(`sub is ${sub}`);
})

app.post('/mul',(req, res)=>
{
    var num1 = req.body.a ;
    var num2 = req.body.b ;
    var mul = num1 * num2 ;
    console.log(mul);
    res.send(`mul is ${mul}`);
})

app.post('/div',(req, res)=>
{
    var num1 = req.body.a ;
    var num2 = req.body.b ;
    var div = num1 / num2 ;
    console.log(div);
    res.send(`div is ${div}`);
})

app.listen(3000 , (error)=>
{
    console.log('Successfully started')
})
