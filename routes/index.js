const express = require("express");
const router = express.Router();

const otherRouter = require("./other");
const userRouter = require("./user");
const noteRouter = require("./note");
const fileRouter = require("./file");
const shareRouter = require("./share");

router.use("/", otherRouter);
router.use("/", userRouter);
router.use("/", noteRouter);
router.use("/", fileRouter);
router.use("/", shareRouter);

module.exports = router;
