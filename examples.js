const express = require('express');
const app  = express()

app.get('/',(req,res,next)=>{
    req.message = 'Hello World';
    res.send('data sent');
})

app.get('/hi',(req,res,next)=>{
    
})

