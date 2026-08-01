const express = require("express");
const { sendMessage , getChats } = require("../controllers/chatController");

const router = express.Router();

router.post("/", sendMessage);
router.get("/", getChats);

module.exports = router;