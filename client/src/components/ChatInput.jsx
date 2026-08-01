import api from "../services/api";

function ChatInput({
    message,
    setMessage,
    messages,
    setMessages,
    loading,
    setLoading
}) {
    const handleSend = async () => {
        const trimmed = message.trim();
        if (!trimmed || loading) return;

        const userMessage = {
            role: "user",
            message: trimmed
        };

        setMessages([...messages, userMessage]);
        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/chat", {
                message: trimmed
            });

            const aiMessage = {
                role: "assistant",
                message: response.data.reply
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.log(error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    message: "Something went wrong. Please try again."
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="max-w-3xl mx-auto flex items-end gap-2 border border-gray-300 rounded-3xl px-4 py-2 focus-within:border-gray-400 shadow-sm">
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
