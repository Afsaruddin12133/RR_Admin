// File: UsersManagement.jsx
import React, { useState, useEffect } from "react";
import { UserPlus, Search } from "lucide-react";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", status: "Active" });

  // Simulate fetching data from API
  useEffect(() => {
    const fetchUsers = async () => {
      const data = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          status: "Active",
          joined: "2024-01-15",
        },
        {
          id: 2,
          name: "Sourav Debnath",
          email: "sourav@example.com",
          status: "Inactive",
          joined: "2024-01-15",
        },
      ];
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // Handle adding new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return alert("All fields are required");
    setUsers([
      ...users,
      {
        id: Date.now(),
        ...newUser,
        joined: new Date().toISOString().split("T")[0],
      },
    ]);
    setNewUser({ name: "", email: "", status: "Active" });
    setOpenModal(false);
  };

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <div className="p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Users Management</h1>
          <p className="text-gray-500 text-sm">
            Manage all registered users and their permissions.
          </p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by name, email, or status..."
          className="pl-9 pr-3 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* User List */}
      <div className="space-y-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  user.status === "Active"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-emerald-100 text-emerald-600"
                }`}
              >
                {user.status}
              </span>
              <p className="text-gray-400 text-sm">Joined {user.joined}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add User Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blur Background */}
          <div
            className="absolute inset-0 backdrop-blur-sm bg-black/20"
            onClick={() => setOpenModal(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50">
            <h2 className="text-lg font-semibold mb-4">Add New User</h2>
            <div className="space-y-3">
              <input
                placeholder="Full Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="border rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="Email Address"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="border rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                className="border rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newUser.status}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-all"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
