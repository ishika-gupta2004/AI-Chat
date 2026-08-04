import { useState } from "react";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import api from "./services/api";

function App() {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);

  const handleClear = async () => {
    if (loading || clearing || !window.confirm("Clear all chat messages?")) return;

    setClearing(true);
    try {
      await api.delete("/chat");
      setMessages([]);
      setMessage("");
    } catch (error) {
      // console.error("Unable to clear chat:", error);
      window.alert("Could not clear the chat. Please try again.");
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="w-full max-w-4xl h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        <Header onClear={handleClear} clearing={clearing} loading={loading} />

        <ChatBox messages={messages}
          loading={loading} />

        <ChatInput
          message={message}
          setMessage={setMessage}
          messages={messages}
          setMessages={setMessages}
          loading={loading}
          setLoading={setLoading}
        />

      </div>

    </div>
  );
}

export default App;
