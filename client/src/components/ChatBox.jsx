import ChatMessage from "../components/ChatMessages";
import { useRef, useEffect } from "react";

function ChatBox({ messages, loading }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, loading]);

    

    return (
        <div className="flex-1 overflow-y-auto bg-white">
            <div className="max-w-3xl mx-auto px-6 py-6">
                {messages.length === 0 && !loading && (
                    <div className="h-full flex items-center justify-center text-gray-400 text-sm pt-24">
                        Start the conversation below
                    </div>
                )}

                {messages.map((item, index) => (
                    <ChatMessage
                        key={index}
                        role={item.role}
                        message={item.message}
                    />
                ))}

                {loading && (
                    <ChatMessage role="assistant" message="Typing..." />
                )}

                <div ref={bottomRef}></div>
            </div>
        </div>
    );
}

export default ChatBox;
