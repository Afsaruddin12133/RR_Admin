import {
  LayoutDashboard,
  Clock,
  CheckCircle,
  XCircle,
  Flag,
  MessageCircle,
} from "lucide-react";

export const menuItems = [
  { name: "All Orders", icon: <LayoutDashboard size={18} />, path: "/services" },
  { name: "Pending", icon: <Clock size={18} />, path: "/pending" },
  { name: "Accepted", icon: <CheckCircle size={18} />, path: "/accepted" },
  { name: "Rejected", icon: <XCircle size={18} />, path: "/rejected" },
  { name: "Finished", icon: <Flag size={18} />, path: "/finished" },
  { name: "Free Consultancy", icon: <MessageCircle size={18} />, path: "/free-consultancy" },
];
