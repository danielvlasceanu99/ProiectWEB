const express = require('express')
const router = express.Router()
const FileDB = require('../models').Files
const NoteDB = require('../models').Notes
const fileUpload=require('express-fileupload');

router.use(fileUpload())
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

router.post("/:note_id/create-file", async (req, res) => {
    const note = await NoteDB.findByPk(req.params.note_id);
    if (note) {
        console.log(req.files);
        if (req.files === null) {
            return res.status(400).json({ msg: "No file uploaded " });
        }
        const file = req.files.file;
        file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
        });
        const fileX = {
            name: file.name,
            link: `${__dirname}/uploads/${file.name}`,
            noteId: note.id
        };
        try {
            await FileDB.create(fileX);
            res.json({ fileName: file.name, filePath: `/uploads/${file.name}`});
        } catch {
            res.status(500).send({ message: "Error ocured while creating file" });
        }
    } else {
        res.status(404).send({ message: "Note not found" });
    }
});

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

router.post('/upload',(req,res) =>{
    if(req.files===null){
      return res.status(400).json({msg: 'No file uploaded '});
    }
    const file=req.files.file;
    file.mv(`${__dirname}/uploads/${file.name}`, err => {
      if (err){
        console.error(err);
        return res.status(500).send(err);
      }
  
      res.json({fileName: file.name, filePath:`/uploads/${file.name}`});
    })
  })

module.exports = router