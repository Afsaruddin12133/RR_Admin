// File: UsersManagement.jsx
import React, { useState, useEffect } from "react";
import { UserPlus, Search } from "lucide-react";
import UserModal from "../../../components/shared/admin/UserModel";
import SearchBar from "../../../components/shared/admin/SearchBar";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    status: "Active",
  });

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

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email)
      return alert("All fields are required");
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

      <div className="mb-6">
        <SearchBar
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

      {/* Reusable User Modal */}
      <UserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddUser}
        title="Add New User"
        userData={newUser}
        setUserData={setNewUser}
      />
    </div>
  );
};

export default UsersManagement;
