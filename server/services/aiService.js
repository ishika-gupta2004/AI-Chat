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

const generateImageReply = async (imageBuffer, mimetype, question) => {
    const base64Image = imageBuffer.toString("base64");

    const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model: "openrouter/free",

            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: question || "What is in this image? Describe it clearly."
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:${mimetype};base64,${base64Image}`
                            }
                        }
                    ]
                }
            ]
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data.choices[0].message.content;
};

module.exports = {
    generateReply , generateImageReply
};