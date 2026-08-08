const express = require("express");
const multer = require("multer");

const {
    sendMessage,
    getChats,
    deleteChats,
    uploadImage
} = require("../controllers/chatController");

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
});

router.post("/", sendMessage);
router.get("/", getChats);
router.delete("/", deleteChats);
router.post("/image", upload.single("image"), uploadImage);

module.exports = router;