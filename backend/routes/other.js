const express = require('express')
const router = express.Router()
const connection = require('../models').connection

router.get('/reset', async(req, res)=>{
    connection.sync({
        force:true
    }).then(()=>{
        res.status(200).send({ message:'Database reseted'})
    })
    .catch(()=>{
        res.status(500).send({message:'Error ocured'})
    })
})
    
module.exports = router 