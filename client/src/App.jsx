import { useState } from "react";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";

function App() {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="w-full max-w-4xl h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        <Header />

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