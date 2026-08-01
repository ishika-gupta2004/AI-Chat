function Avatar({ isUser }) {
    return (
        <div
            className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-medium ${isUser ? "bg-gray-700 text-white" : "bg-emerald-600 text-white"
                }`}
        >
            {isUser ? "U" : "AI"}
        </div>
    );
}

function ChatMessage({ role, message }) {
    const isUser = role === "user";

    return (
        <div className={`flex gap-3 mb-6 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
            <Avatar isUser={isUser} />

            <div
                className={`max-w-[75%] px-4 py-2.5 text-[15px] leading-relaxed ${isUser
                        ? "bg-gray-100 text-gray-900 rounded-2xl rounded-tr-sm"
                        : "text-gray-800"
                    }`}
            >
                <p className="whitespace-pre-wrap">{message}</p>
            </div>
        </div>
    );
}

export default ChatMessage;
