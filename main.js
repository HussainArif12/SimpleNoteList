const express = require('express');
const body_parser = require("body-parser")
const path  = require('path')
const pug=  require('pug');
const Notes = require("./database")


const app = express()
const Note = new Notes({})

app.set('view engine','pug');
app.set('views',path.join(__dirname,"views"));
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use((req,res,next)=> {
    console.log(req.method + " : " + req.url);
next();
})

app.get("/" , (req,res,next)=> {
  // console.log("get perfomed")
  //now find them
  res.redirect('/notes-added')
})

app.get("/notes-added" , (req,res,next)=>{
  res.render('notes-add');
})

app.get('/index' , (req,res,next)=>{
  Notes.find({}).exec((err,document)=> {
        
    if(err) console.log(err);
      let Data = [];
      document.forEach((value) => {
      Data.push(value)
    })
  res.render('view',{data:Data})
    
  })
})

app.post("/notes-added" , (req,res,next)=> {
    console.log(req.body);
    Note.title = req.body.title
    Note.description = req.body.description
      //save notes first
    Note.save((err,product)=>{
        if(err) console.log(err);
        console.log(product);
    })
  
 //    const compiledFunction = pug.compileFile(path.join(__dirname,"views", "view.pug"))
    // console.log(compiledFunction({data : Data}))
   ///  compiledFunction({data : Data}) 
     res.redirect('/index') 
      console.log(Data);
  })
 


app.delete("/:title", (req,res,next)=>{
  console.log(req.params.title);
    Notes.deleteMany({title : req.params.title} , (err)=> {
       if(err) console.log(err)
    })
    res.write("deleted")
    res.end();
})

  app.listen(3000);