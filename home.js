const express = require('express');
const app = express();
const service = require('./service');
app.use(express.json());

app.use(service);

app.listen(3000, ()=>
{
    console.log("Page working");
});