import React, { useState } from "react";
import { Search, Reply, Archive, Star } from "lucide-react";
import { feedbacks } from "../../../api/admin/feedbacks";
import SearchBar from "../../../components/shared/admin/SearchBar";

export default function Feedback() {
  const [search, setSearch] = useState("");

  const filteredData = feedbacks.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6  mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Customer Feedback
        </h2>
        <p className="text-gray-500 text-sm">
          Review and respond to client feedback and ratings.
        </p>
      </div>

      {/* Search */}
      {/* <div className="relative mb-5">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div> */}

      <SearchBar
        type="text"
        placeholder="name or service"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-5"
      />

      {/* Feedback Cards */}
      <div className="space-y-4">
        {filteredData.length ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex items-start gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.service}</p>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <span className="text-xs text-gray-500 mt-2 sm:mt-0">
                  {item.date}
                </span>
              </div>

              <p className="text-gray-600 text-sm mt-3">{item.comment}</p>

              <div className="flex gap-2 mt-4">
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-100 transition">
                  <Reply size={15} /> Reply
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-100 transition">
                  <Archive size={15} /> Archive
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6 text-sm">
            No feedback found
          </p>
        )}
      </div>
    </div>
  );
}
