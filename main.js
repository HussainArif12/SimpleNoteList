const express = require('express');
const body_parser = require("body-parser")
const path  = require('path')
const pug=  require('pug');
const Notes = require("./database")

const app = express()
let id = 0;
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
    const Note = new Notes({})

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
  
  })
 


app.get("/delete/:__id", (req,res,next)=>{
  //console.log('parameter: ' + req.params.__id);
    Notes.findByIdAndRemove(req.params.__id ,{useFindAndModify : false}, (err,document)=> {
       if(err) console.log(err)
       console.log(document);
    })
  res.redirect('/index');
   
})



app.get('/update/:__id',(req,res,next)=>{
  id = req.params.__id
  Notes.findById( id).exec((err,document)=>{
    //app.render('updatepage' , {data: document});
    if(err) console.log(err);
    console.log('the document in question is ' + document);
   res.render('updatepage', {data:document})
  })
})

app.post('/updatepage',(req,res,next)=>{
  console.log(req.body);
  Notes.findByIdAndUpdate(id , {title : req.body.title , description: req.body.description },{useFindAndModify:false},(err,document)=>{
console.log('updated');
res.redirect('/index');
  })
  Notes.findById()
})

/*
  app.get('/updatepage/:__id',(req,res,next)=>{
    
  })
  */
  app.listen(3000);