const express = require('express')
const router = express.Router()
const UserDB = require('../models').Users
const NoteDB = require('../models').Notes
const ShareDB = require('../models').Shares

router.get('/:user_id/shares', async(req, res)=>{
    try{
        const IDs = await ShareDB.findAll({
            where:{
                userId:req.params.user_id
            }
        })
        const notesIDs = []
        for(let i = 0; i < IDs.length; i++){
            notesIDs[i] = IDs[i].noteId
        }
        //res.status(200).send(notesIDs)
        if(notesIDs.length !== 0){
            NoteDB.findAll({
                where: {
                    id: notesIDs
                }
            }).then(notes => {
                res.status(200).send(notes)
            }) 
        }
        else{
            res.status(200).send({message:'No notes shared with you'})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:'Error ocured while geting notes'})
    }
})

router.post('/:note_id/share', async(req, res)=>{
    try{
        const note = await NoteDB.findByPk(req.params.note_id)
        if(note){
            const user = await UserDB.findByPk(req.body.user_id)
            if(user){
                const share = {
                    noteId: note.id,
                    userId: user.id
                }

                await ShareDB.create(share)
                res.status(201).send({message:'Share created'})
            } else{
                res.status(404).send({message:'User not found'})
            }
        } else{
            res.status(404).send({message:'Note not found'})
        }
    }
    catch{
        res.status(500).send({message:'Error ocured while creating share'})
    }
})

module.exports = router

