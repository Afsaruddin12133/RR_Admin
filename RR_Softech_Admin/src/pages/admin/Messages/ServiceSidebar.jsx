import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, User } from "lucide-react";
import { fetchChatting } from "../../../api/UserDashboard/chatting";
import { Services } from './../../../api/UserDashboard/Services';


export default function ServiceSidebar({
  setSelectedOrderId,
  setSelectedCustomer
}) {
  const [expandedServiceId, setExpandedServiceId] = useState(null);
  const [categorizedUsers, setCategorizedUsers] = useState({
    CUSTOMER: [],
    EMPLOYEE: [],
    ADMIN: []
  });

  useEffect(() => {
    loadChatData();
    const interval = setInterval(loadChatData, 2000);
    return () => clearInterval(interval);
  }, []);

  

  const loadChatData = async () => {
    try {
      const data = await fetchChatting();

      const authorMap = new Map();

      data.forEach((msg) => {
        const a = msg.author;

        if (!authorMap.has(a.id)) {
          authorMap.set(a.id, {
            ...a,
            orders: [],
            lastMessage: "",
            lastMessageTime: ""
          });
        }

        const entry = authorMap.get(a.id);
        entry.orders.push(msg.order);
        entry.lastMessage = msg.message;
        entry.lastMessageTime = msg.timestamp;
      });

      const uniqueAuthors = [...authorMap.values()];

      /** ---- Categorize by role ---- **/
      const categorized = {
        CUSTOMER: [],
        EMPLOYEE: [],
        ADMIN: []
      };

      uniqueAuthors.forEach((user) => {
        if (categorized[user.role]) {
          categorized[user.role].push(user);
        }
      });

      /** ---- Sort within categories by latest message ---- **/
      Object.keys(categorized).forEach((key) => {
        categorized[key].sort(
          (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
        );
      });

      setCategorizedUsers(categorized);
    } catch (error) {
      console.error("Failed to load chat data:", error);
    }
  };

  /** Format timestamp **/
  const formatTime = (time) => {
    if (!time) return "";
    const date = new Date(time);
    return date.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const toggleService = (serviceId) => {
    setExpandedServiceId((prev) => (prev === serviceId ? null : serviceId));
  };

  return (
    <div className="w-[300px] bg-white border-r p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Conversations</h2>

      {Services.map((service) => (
        <div key={service.id} className="mb-3">
          {/* CATEGORY HEADER */}
          <div
            className="flex justify-between items-center p-3 rounded-lg bg-blue-50 cursor-pointer hover:bg-blue-100"
            onClick={() => toggleService(service.id)}
          >
            <span className="font-medium">{service.name}</span>
            {expandedServiceId === service.id ? (
              <ChevronDown />
            ) : (
              <ChevronRight />
            )}
          </div>

          {/* USER LIST */}
          {expandedServiceId === service.id && (
            <div className="ml-4 mt-2 space-y-2">
              {categorizedUsers[service.id].length === 0 ? (
                <p className="text-gray-500 text-sm">No users found.</p>
              ) : (
                categorizedUsers[service.id].map((user) => {
                  const latestOrder =
                    user.orders[user.orders.length - 1] || null;

                  return (
                    <div
                      key={user.id}
                      onClick={() => {
                        setSelectedCustomer(user);
                        setSelectedOrderId(latestOrder);
                      }}
                      className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100"
                    >
                      <User size={16} className="text-gray-600" />

                      <div className="flex flex-col flex-1">
                        <span className="font-medium text-sm">
                          {user.first_name} {user.last_name}
                        </span>
                        <span className="text-xs text-gray-500 truncate">
                          {user.lastMessage}
                        </span>
                      </div>

                      <span className="text-xs text-gray-400">
                        {formatTime(user.lastMessageTime)}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
