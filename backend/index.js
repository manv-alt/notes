require('dotenv').config();


const Runserver = require("./database/connection");
const express = require('express')
const cors = require('cors');
const noteRoutes = require('./routes/notesRoutes');
 const app =express()
const PORT = process.env.PORT



app.use(express.json())
app.use(cors())
 Runserver()
app.use('/api',noteRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
