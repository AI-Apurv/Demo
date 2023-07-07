const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>
{
    res.send('This is main page')
})
router.get('/service/login',(req,res)=>
{
    res.send("this is login page")
})

router.get('/home',(req,res)=>
{
    res.send("this is home page")
})

router.get('/settings',(req,res)=>
{
    res.send("this is settings page")
})

router.get('/logout',(req,res)=>
{
    res.send("this is logout page")
})

module.exports = router