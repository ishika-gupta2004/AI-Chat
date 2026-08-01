const axios = require("axios");
console.log(process.env.OPENROUTER_API_KEY);
const generateReply = async (history) => {

    const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model: "openrouter/free",

            messages: history
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            }
            
            
        },
        
    );
   
    return response.data.choices[0].message.content;

};

module.exports = {
    generateReply
};