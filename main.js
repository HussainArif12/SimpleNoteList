const express = require('express');
const body_parser = require("body-parser")
const path  = require('path')
const pug=  require('pug');
const Notes = require("./database")
const updateRouter = require('./update-router');
const app = express()

app.set('view engine','pug');
app.set('views',path.join(__dirname,"views"));

app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use('/updatepage',updateRouter);
app.use((req,res,next)=> {
    console.log(req.method + " : " + req.url);
next();
})


app.get("/" , (req,res,next)=> {
  // console.log("get perfomed")
  //now find them
  res.redirect('/notes-add')
})

app.route("/notes-add")
    .get((req,res,next)=>{
      res.render('notes-add');
})
    .post( (req,res,next)=> {
          console.log(req.body);
          const Note = new Notes({})
      
          Note.title = req.body.title
          Note.description = req.body.description
            //save notes first
      Note.save((err,product)=>{
              if(err) console.log(err);
              console.log(product);
          })
        res.redirect('/index')
        })
      
app.get('/index' , (req,res,next)=>{

  Notes.find({}).exec((err,document)=> {
        
    if(err) console.log(err);
      let Data = [];
      document.forEach((value) => {
        Data.push(value)
      })
      res.render('view',{data:document})
  })
})

  
 //    const compiledFunction = pug.compileFile(path.join(__dirname,"views", "view.pug"))
    // console.log(compiledFunction({data : Data}))
   ///  compiledFunction({data : Data}) 

app.get("/delete/:__id", (req,res,next)=>{
  //console.log('parameter: ' + req.params.__id);
    Notes.findByIdAndRemove(req.params.__id ,{useFindAndModify : false}, (err,document)=> {
       if(err) console.log(err)
       console.log(document);
    })
  res.redirect('/index');
   
})


app.get('/updatepage/:__id',(req,res)=>{
  console.log('id for get request: ' + req.id);
  Notes.findById(req.id,(err,document)=>{
    console.log(document);

    res.render('updatepage',{data:document});
  })
})

app.post('/updatepage',(req,res,next)=>{
  console.log('id: ' + req.id);
  Notes.findByIdAndUpdate(req.id , {title : req.body.title , description: req.body.description },{useFindAndModify:false}
    ,(err,document)=>{
console.log('updated');
})
res.redirect('/index');
return next();
})

/*
  app.get('/updatepage/:__id',(req,res,next)=>{
    
  })
  */
  app.listen(3000);
