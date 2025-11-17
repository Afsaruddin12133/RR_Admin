import {
  LayoutDashboard,
  Users,
  Briefcase,
  CreditCard,
  BarChart3,
  MessageSquare,
  MessageCircle,
  Settings,
  Star,
} from "lucide-react";

export const adminMenuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admindashboard"},
  { name: "User Manage", icon: <Users size={18} />, path: "/admindashboard/users-manage" },
  { name: "Services", icon: <Briefcase size={18} />, path: "/admindashboard/services" },
  { name: "Transactions", icon: <CreditCard size={18} />, path: "/admindashboard/transactions" },
  { name: "Analytics", icon: <BarChart3 size={18} />, path: "/admindashboard/analytics" },
  { name: "Messages", icon: <MessageSquare size={18} />, path: "/admindashboard/messages" },
  { name: "Feedback", icon: <Star size={18} />, path: "/admindashboard/feedback" },
  { name: "Settings", icon: <Settings size={18} />, path: "/admindashboard/settings" },
];
