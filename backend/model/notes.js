const mongoose =require('mongoose');

const notesschema = new mongoose.Schema({

 title:{
    type:String,
    required:true
 },
 message:{
    type:String,
    required:true,
    trim:true
 },
 category:{
    type:String,
    default:"General"
 },
  createdAt: {
        type: Date,
        default: Date.now
    },
 updatedAt: {
        type: Date,
        default: Date.now
    }

})


 const notesModel = mongoose.model('Notes',notesschema)
 module.exports=notesModel

 