const mongooseClient = require("mongoose");

mongooseClient.connect("mongodb://localhost/notepadDB", {useNewUrlParser:true, useUnifiedTopology:true},(err)=> {
  if(err)   console.log(err);
});

const NotesSchema = mongooseClient.Schema({
    title : String,
     description : String,
        
})

const Notes = mongooseClient.model("Notes", NotesSchema);

module.exports =Notes;