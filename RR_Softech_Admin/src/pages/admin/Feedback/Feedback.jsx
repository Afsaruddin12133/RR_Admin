import React, { useEffect, useState } from "react";
import { Search, Reply, Archive, Star } from "lucide-react";
import SearchBar from "../../../components/shared/admin/SearchBar";
import { fetchReviews } from "../../../api/UserDashboard/reviews";
import Pagination from "../../../components/shared/userDashboard/Pagination";


function getUserName(user) {
  if (!user) return "Unknown User";
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ");
  return name || user.email;
}

function getService(user) {
  return user?.profile?.company_name || "N/A";
}

function getImage(user) {
  // Placeholder for real avatar if available, otherwise use generated
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    getUserName(user)
  )}`; // Adapt if user image available
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString();
}

export default function Feedback() {
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5; // Adjust as needed

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetchReviews({ page: currentPage, page_size: pageSize })
      .then((res) => {
        if (ignore) return;
        setReviews(res.items || res.data || []); // Use res.items for paginated results if provided
        setTotalPages(res.totalPages || res.total_pages || 1);
        setError(null);
      })
      .catch((e) => setError(e.message || "Failed to load"))
      .finally(() => setLoading(false));
    return () => {
      ignore = true;
    };
  }, [currentPage]);

  // Filtering for search
  const filteredData = reviews.filter(
    (item) => {
      const name = getUserName(item.user).toLowerCase();
      const service = getService(item.user).toLowerCase();
      return (
        name.includes(search.toLowerCase()) ||
        service.includes(search.toLowerCase())
      );
    }
  );

  const handleArchive = async (id) => {
    await deleteReview(id);
    setReviews((old) => old.filter((r) => r.id !== id));
  };

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

      <SearchBar
        type="text"
        placeholder="name or service"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-5"
      />

      {loading ? (
        <p className="text-center py-6 text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center py-6 text-red-500">{error}</p>
      ) : (
        <>
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
                        src={getImage(item.user)}
                        alt={getUserName(item.user)}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {getUserName(item.user)}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {getService(item.user)}
                        </p>
                        <div className="flex items-center mt-1">
                          {Array.from({
                            length: Math.max(0, Math.min(5, item.rating)),
                          }).map((_, i) => (
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
                      {formatDate(item.created_at)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">{item.comment}</p>
                  <div className="flex gap-2 mt-4">
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-100 transition">
                      <Reply size={15} /> Reply
                    </button>
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                      onClick={() => handleArchive(item.id)}
                    >
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
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
