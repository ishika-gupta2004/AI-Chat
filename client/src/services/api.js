import axios from "axios";

const api = axios.create(
    {
        baseURL: "https://https://ai-chat-810u.onrender.com.onrender.com/api"
    }
);

export default api;