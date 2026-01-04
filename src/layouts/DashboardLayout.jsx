import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

import {
  Package,
  PlusCircle,
  UploadCloud,
  DownloadCloud,
  User,
  LogOut,
  Menu,
  X,
  Globe,
} from "lucide-react";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed. Try again.");
      console.error(error);
    }
  };

  const menuItems = [
    { to: "", label: "Overview", icon: <Package className="w-6 h-6" /> },
    { to: "myExport", label: "My Exports", icon: <UploadCloud className="w-6 h-6" /> },
    { to: "myImport", label: "My Imports", icon: <DownloadCloud className="w-6 h-6" /> },
    { to: "addExport", label: "Add Export", icon: <PlusCircle className="w-6 h-6" /> },
    { to: "allProduct", label: "All Products", icon: <Globe className="w-6 h-6" /> },
    { to: "profile", label: "My Profile", icon: <User className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      
      {/* Mobile Sidebar Toggle */}
      <button
        aria-label="Toggle sidebar"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden btn btn-circle btn-ghost bg-white/90 dark:bg-gray-800 shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-gray-900 shadow-2xl
        transform transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="p-8 border-b dark:border-gray-800">
            <Link
              to="/"
              className="flex items-center gap-4"
              onClick={() => setSidebarOpen(false)}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl">
                IW
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ImportWave
                </p>
              </div>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-6 border-b dark:border-gray-800 text-center">
            <img
              src={
                user?.photoURL ||
                "https://i.ibb.co/Q3LYhjtx/pngtree-user-icon-png-image-1796659.jpg"
              }
              alt="User Avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-600 shadow-xl object-cover"
            />
            <p className="font-bold text-xl text-gray-900 dark:text-white">
              {user?.displayName || "Trader"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user?.email}
            </p>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-6 overflow-y-auto">
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === ""}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-xl"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-6 border-t dark:border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-4 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-2xl shadow-xl transition"
            >
              <LogOut className="w-6 h-6" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 transition-all duration-300">
        <div className="p-6 lg:p-12 min-h-screen">
          <Outlet />
        </div>
      </main>

      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
