const mongooseClient = require("mongoose");

mongooseClient.connect("mongodb://localhost/notepadDB", {useNewUrlParser:true, useUnifiedTopology:true},(err)=> {
  if(err)   console.log(err);
});

const NotesSchema = mongooseClient.Schema({
    title : {
        type : String,
        default:'none',
        get: function(value) {
            return value
        },
        set : function(value) {
         return  value; 
        }
    },
     description : {
        type: String,
        default: "none",
        get: function(value ) {
            return value
        },
        set : function(value) {
            return  value;
        }
    }
})

const Notes = mongooseClient.model("Notes", NotesSchema);

module.exports =Notes;