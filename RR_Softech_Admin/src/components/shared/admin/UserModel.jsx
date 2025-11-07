// File: components/UserModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const UserModal = ({
  open,
  onClose,
  onSubmit,
  userData,
  setUserData,
}) => {
  return (
    <AnimatePresence>
        {motion}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay with fade animation */}
          <motion.div
            className="absolute inset-0 backdrop-blur-sm bg-black/20"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          ></motion.div>

          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <h2 className="text-lg font-semibold mb-4">Add New User</h2>
            <div className="space-y-3">
              <input
                placeholder="Full Name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="border rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                required
                placeholder="Email Address"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="border rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                
              />
              <select
                className="border rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userData.status}
                onChange={(e) =>
                  setUserData({ ...userData, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={onSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserModal;
