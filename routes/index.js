const express = require('express')
const router = express.Router()

const otherRouter = require('./other')
const userRouter = require('./user')
const noteRouter = require('./note')

router.use('/', otherRouter);
router.use('/', userRouter);
router.use('/', noteRouter);

module.exports = router