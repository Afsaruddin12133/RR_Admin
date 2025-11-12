import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModelTitle from "./ModelTitle";

export default function RightSideModal({ isOpen, onClose, selectedService, children }) {
  motion
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-1/2 bg-white shadow-2xl z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* Model Header */}
            <div className="">
              <ModelTitle selectedService={selectedService} onClose={onClose} />
            </div>

            {/* Modal Body */}
            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
