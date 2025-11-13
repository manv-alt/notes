const notesModel = require("../model/notes")

const createnotes =async (req,res)=>{
const body =req.body
try {
    if(body.message===""){
        return res.status(404).json({message:"Message field is  empty"})
    }
    const savedata =await notesModel.create({
        title:body.title,
        message:body.message,
        category:body.category
    })
    res.status(200).json({message:"Note created successfully",data:savedata})
} catch (error) {
    console.log("Error:", error);
    res.status(500).json({message:'error creating note'})
}
}
const getallnotes =async (req,res)=>{
    try {
         const notes=await notesModel.find()
    res.json(notes)
    } catch (error) {
        res.status(500).json({message:'error fetching notes'})

    }
   
}
const updatenotes =async (req,res)=>{
    try {
        const update=await notesModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({message:"Note updated successfully",data:update})
        if(!updated){
             res.status(404).json({message:"Note not found"})                             
        }
    } catch (error) {
        res.status(500).json({message:'error updating note'})
        
    }

}
const deletenotes =async (req,res)=>{
try {
    const dele =await notesModel.findByIdAndDelete(req.params.id)
    if(!dele){
         res.status(404).json({message:"Note not found"})
    }
    res.status(200).json({message:"Note deleted successfully",data:dele})
} catch (error) {
    res.status(500).json({message:'error deleting note'})
    
}
}
module.exports={createnotes,getallnotes,updatenotes,deletenotes}