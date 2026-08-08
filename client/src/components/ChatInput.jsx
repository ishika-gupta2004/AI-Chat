import api from "../services/api";
import { useState } from "react";
import { Image, X } from "lucide-react";

function ChatInput({
    message,
    setMessage,
    messages,
    setMessages,
    loading,
    setLoading }) {

    const [selectedImage, setSelectedImage] = useState(null);

    // const handleSend = async () => {
    //     const trimmed = message.trim();
    //     if (!trimmed || loading) return;

    //     const userMessage = {
    //         role: "user",
    //         message: trimmed
    //     };

    //     setMessages([...messages, userMessage]);
    //     setMessage("");
    //     setLoading(true);

    //     try {
    //         const response = await api.post("/chat", {
    //             message: trimmed
    //         });

    //         const aiMessage = {
    //             role: "assistant",
    //             message: response.data.reply
    //         };

    //         setMessages((prev) => [...prev, aiMessage]);
    //     } catch (error) {
    //         console.log(error);

    //         setMessages((prev) => [
    //             ...prev,
    //             {
    //                 role: "assistant",
    //                 message: "Something went wrong. Please try again."
    //             }
    //         ]);
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (!file) return;
    //     setSelectedImage(file);
    // }

    const handleSend = async () => {
        const trimmed = message.trim();

        if ((!trimmed && !selectedImage) || loading) return;

        setLoading(true);

        try {
            // IMAGE
            if (selectedImage) {
                const imageUrl = URL.createObjectURL(selectedImage);

                // Image ko chat me show karo
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "user",
                        imageUrl: imageUrl
                    }
                ]);

                const formData = new FormData();
                formData.append("image", selectedImage);

                const response = await api.post("/chat/image", formData);

                // AI response
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        message: response.data.reply
                    }
                ]);

                setSelectedImage(null);
            }
            // TEXT
            if (trimmed) {
                const userMessage = {
                    role: "user",
                    message: trimmed
                };

                setMessages((prev) => [...prev, userMessage]);
                setMessage("");

                const response = await api.post("/chat", {
                    message: trimmed
                });

                const aiMessage = {
                    role: "assistant",
                    message: response.data.reply
                };

                setMessages((prev) => [...prev, aiMessage]);
            }

        } catch (error) {
            console.error("Message or image upload failed:", error.response?.data || error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    message: error.response?.data?.message || "Something went wrong. Please try again."
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setSelectedImage(file);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-gray-200 bg-white px-6 py-4">

            <label className="w-9 h-9 shrink-0 mb-1 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                <Image size={20} className="text-gray-500" />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
            </label>


            <div className="max-w-3xl mx-auto flex items-end gap-2 border border-gray-300 rounded-3xl px-4 py-2 focus-within:border-gray-400 shadow-sm">

                {/*  */}
                {selectedImage && (
                    <div className="mb-3 relative w-fit">
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Selected"
                            className="w-20 h-20 object-cover rounded-xl border"
                        />

                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}

                {/*  */}


                <textarea
                    rows={1}
                    placeholder="Message AI Memory Chat..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 resize-none outline-none py-2 max-h-40 text-[15px] placeholder:text-gray-400"
                />

                <button
                    onClick={handleSend}
                    // disabled={!message.trim() || loading}
                    className="w-9 h-9 shrink-0 mb-1 rounded-full bg-gray-900 text-white flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                    aria-label="Send message"
                >
                    ⮞
                </button>
            </div>
        </div>
    );
}

export default ChatInput;
