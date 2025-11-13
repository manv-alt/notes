//mongodb+srv://manishkarkera927_db_user:Villan@12@cluster0.gzdlcxh.mongodb.net/?appName=Cluster0
const mongoose =require('mongoose');

function Runserver(){
    try {
 mongoose.connect(process.env.MONGO_URL)
         console.log("DataBase connected successfully!!");
    } catch (error) {
        console.log("Error while connecting to database", error);
    }
    
}
module.exports= Runserver;