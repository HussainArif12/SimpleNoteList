const express = require("express");
const bodyparser = require("body-parser")
const app = express()
app.use(bodyparser.text());

app.post('/',(req,res)=>{
    console.log(req.body)
    res.send(req.body);
})
app.post('/poster', (req,res)=>{
    console.log(req.body);
})
app.listen(3000);