const express = require('express')
const router = express.Router()
const FileDB = require('../models').Files
const NoteDB = require('../models').Notes

router.get('/:note_id/files', async(req, res)=>{
    try{
        const note = await NoteDB.findByPk(req.params.note_id, {
            include:[FileDB],
        })
        if(note){
            res.status(200).send(note.files)
        } else {
            res.status(404).send({message:'Note not found'})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:'Error ocured while gering files'})
    }
})

router.get('/files/:file_id', async(req, res)=>{
    try{
        const file = await FileDB.findByPk(req.params.file_id)
        if(file){
            res.status(200).send(file)
        } else {
            res.status(404).send({message:'File not found'})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:'Error ocured while gering file'})
    }
})

router.post('/:note_id/create-file', async(req, res) =>{
    const note = await NoteDB.findByPk(req.params.note_id)
    if(note){
        const file = {
            name: req.body.name,
            link:req.body.link,
            noteId:note.id
        }
        const errors = []
        
        if(!file.name){
            errors.push('No name')
        }
        if(!file.link){
            errors.push('No link')
        }
    
        if(errors.length === 0){
            try{
                await FileDB.create(file)
                res.status(201).send({message:'File created'})
            }
            catch{
                res.status(500).send({message:'Error ocured while creating file'})
            }
        } else {
            res.status(400).send(errors)
        }
    } else {
        res.status(404).send({message:'Note not found'})
    }
})

router.delete('/delete-file/:file_id', async(req, res)=>{
    try{
        const file = await FileDB.findByPk(req.params.file_id)
        if(file){
            FileDB.destroy({
                where:{id:file.id}
            }).then(res.status(200).send({message:'File deleted'}))
        } else {
            res.status(404).send({message:'File not found'})
        }
    }
    catch {
        res.status(500).send({message:'Error ocured while deleting file'})
    }
})

module.exports = router