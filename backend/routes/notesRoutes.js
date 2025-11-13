 const express = require('express')
const { createnotes, getallnotes, updatenotes, deletenotes } = require('../controllers/notesCtrl')
 


const noteRoutes = express.Router()

noteRoutes.post('/createnote', createnotes)
noteRoutes.get('/getnotes',getallnotes)
noteRoutes.put('/updatenote/:id',updatenotes)
noteRoutes.delete('/deletenote/:id',deletenotes)

module.exports = noteRoutes
