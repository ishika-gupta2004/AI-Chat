const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require ("cors");
const path = require("path");

const app = express();
app.set("trust proxy", 1);


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ai-chat-three-iota-14.vercel.app"
  ],
  credentials: true 
}))
const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes")


connectDB();


app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


console.log(require("cors"));

app.get("/", (req, res) => {
    res.send("Server Running...");
});

app.use("/api/chat", chatRoutes);

const PORT =  5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
