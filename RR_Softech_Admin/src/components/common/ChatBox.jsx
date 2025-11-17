import { Paperclip, Send } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { fetchChatting, postChatting } from "../../api/UserDashboard/chatting";

export default function ChatBox({
  currentUser,
  orderId,
  divHight = "sm:h-[670px]",
  chatUser = null   

}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);

  //Scroll to bottom after every new message
  // useEffect(() => {
  //   messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  // Fetch messages every 2 seconds (real-time)
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchChatting();
        const filterData = data.filter((d) => d.order === orderId);
        setMessages(filterData);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    loadMessages();
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }, [orderId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const payload = {
      message: input.trim(),
      order: orderId
    };

    try {
      await postChatting(payload);
      setInput("");

      const data = await fetchChatting();
      const filterData = data.filter((d) => d.order === orderId);
      setMessages(filterData);
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className={`bg-white rounded-lg flex flex-col ${divHight}`}>

      {(currentUser === "EMPLOYEE" || currentUser === "ADMIN") && chatUser && (
        <div className="p-4 border-b bg-blue-50 rounded-t-lg flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-300 text-white rounded-full flex items-center justify-center font-semibold">
            {chatUser.first_name?.[0]}
          </div>

          <div>
            <p className="font-semibold">
              {chatUser.first_name} {chatUser.last_name}
            </p>
            <p className="text-sm text-gray-600">{chatUser.email}</p>
            <p className="text-xs text-gray-500 capitalize">{chatUser.role?.toLowerCase()}</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages?.map((msg) => {
          
          const sender =
            msg?.author?.role === "CUSTOMER" ? "CUSTOMER" : "EMPLOYEE";

          return (
            <div
              key={msg.id}
              className={`flex ${
                sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  sender === currentUser
                    ? "bg-[#0095FF] text-white"
                    : "bg-[#D7E7FF] text-gray-800"
                }`}
              >
                <p>{msg?.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(msg?.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
                <p className="text-xs opacity-70 mt-1" >Massage from {msg.author.role.toLowerCase()}</p>
              </div>
            </div>
          );
        })}

        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-300 p-3 flex items-center gap-2">
        <div>
          <input type="file" id="fileInput" className="hidden" />
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-[#0095FF] hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Paperclip size={18} />
            <span className="hidden md:block">Attach File</span>
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
          className="bg-[#0095FF] hover:bg-blue-600 text-white px-4 py-3 rounded"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
