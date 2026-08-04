const express = require("express");
const { sendMessage , getChats , deleteChats} = require("../controllers/chatController");

const router = express.Router();

router.post("/", sendMessage);
router.get("/", getChats);
router.delete("/", deleteChats);

module.exports = router;
