const Chat = require("../models/Chat");
const { generateReply , generateImageReply } = require("../services/aiService");

const sendMessage = async (req, res) => {

    try {


        const { message } = req.body;


        await Chat.create({
            role: "user",
            message
        });

        const chats = await Chat.find().sort({ createdAt: 1 });

        const history = [
            {
                role: "system",
                content: "You are a helpful AI assistant. Always answer using the previous conversation. Do not say that you cannot remember if the information is present in the chat history.Do not use **bold**, *, _, #, or bullet formatting."
            },

            ...chats.map((chat) => ({
                role: chat.role,
                content: chat.message
            }))
        ];

        const aiReply = await generateReply(history);

        await Chat.create({
            role: "assistant",
            message: aiReply
        });

        // 7. Response send
        res.json({
            success: true,
            reply: aiReply
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getChats = async (req, res) => {

    try {

        const chats = await Chat.find().sort({ createdAt: 1 });

        res.json({
            success: true,
            chats
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteChats = async (req, res) => {
    try {
        await Chat.deleteMany({});
        res.json({
            success: true,
            message: "All message deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const uploadImage = async (req, res) => {
    try {
        console.log("REQ FILE:", req.file);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded"
            });
        }

        const aiReply = await generateImageReply(
            req.file.buffer,
            req.file.mimetype,
            "What is in this image? Describe it clearly."
        );

        res.json({
            success: true,
            reply: aiReply
        });

    } catch (error) {
        console.log("IMAGE AI ERROR:", error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: error.response?.data?.error?.message || error.message
        });
    }
};

module.exports = {
    sendMessage, getChats , deleteChats , uploadImage
};
