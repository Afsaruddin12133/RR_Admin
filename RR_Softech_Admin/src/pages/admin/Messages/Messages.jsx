import React, { useState, useEffect } from "react";

export default function Messages() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
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
          { id: 3, sender: "user", text: "Thank you for your help!", time: "10:35 AM" },
        ];
  });
  const [input, setInput] = useState("");

  // Listen for message updates from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "chatMessages") {
        const updated = JSON.parse(e.newValue);
        setMessages(updated);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Send new message
  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: "admin",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem("chatMessages", JSON.stringify(updated));
    setInput("");
  };

  return (
    <div className="bg-white rounded-lg flex flex-col mx-auto">
      {/* Header */}
      {/* <div className="border-b p-4 flex items-center gap-3">
        <img src="https://i.pravatar.cc/40?img=1" alt="User" className="w-10 h-10 rounded-full" />
        <div>
          <h2 className="font-semibold text-lg">Nur Hasan Hasib</h2>
          <p className="text-sm text-green-600">Active Now</p>
        </div>
      </div> */}

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.sender === "admin" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs opacity-70 mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t p-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 outline-none"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-full">
          Send
        </button>
      </div>
    </div>
  );
}
