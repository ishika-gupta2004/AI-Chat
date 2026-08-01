const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require ("cors");
const chatRoutes = require("./routes/chatRoutes")


connectDB();

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ai-chat-three-iota-14.vercel.app"
  ],
  credentials: true // agar cookies/auth headers use kar rahe hain to
}))
console.log(require("cors"));

app.get("/", (req, res) => {
    res.send("Server Running...");
});

app.use("/api/chat", chatRoutes);

const PORT =  5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});