import { File, Paperclip, Send } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function ChatBox({
  currentUser = "user",
  storageKey = "chatMessages",
  divHight = "sm:h-[670px]",
}) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            sender: "user",
            text: "Hi! I wanted to check on the status of my PPC campaign.",
            time: "10:30 AM",
          },
          {
            id: 2,
            sender: "admin",
            text: "Hello! Your campaign is performing well. I'll send you the latest metrics shortly.",
            time: "10:32 AM",
          },
          {
            id: 3,
            sender: "user",
            text: "Thank you for your help!",
            time: "10:35 AM",
          },
        ];
  });

  const [input, setInput] = useState("");

  // Listen for updates across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === storageKey) {
        const updated = JSON.parse(e.newValue);
        setMessages(updated);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [storageKey]);

  const handleFileChange = () => {
    // const file = e.target.files[0];
    // if (file) {
    //   onFileSelect(file);
    //   console.log(file);
      
    // }
  };

  // Send a new message
  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: currentUser,
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setInput("");
  };

  return (
    <div className={`bg-white rounded-lg flex flex-col h-[480px] ${divHight}`}>
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.sender === currentUser
                  ? "bg-[#0095FF] text-white"
                  : "bg-[#D7E7FF] text-gray-800"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs opacity-70 mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-gray-300 p-3 flex items-center gap-2">
        <div>
          <input
            type="file"
            id="fileInput"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-[#0095FF] hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-all"
          >
            <Paperclip size={18} />
            <span>Attach File</span>
          </label>
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded px-4 py-2 outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-[#0095FF] hover:bg-blue-600 text-white px-4 py-3 rounded transition-all"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
