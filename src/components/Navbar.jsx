import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { IoLogOut, IoLogIn } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits, MdOutlineImportantDevices } from "react-icons/md";
import { TbDatabaseExport, TbDatabaseImport } from "react-icons/tb";
import { AiOutlineExport } from "react-icons/ai";

import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";

const NavBar = () => {
  const { user, logOut, setLoading, setUser } = useContext(AuthContext);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold border-b-2 border-blue-600 dark:text-blue-400"
              : "hover:text-blue-600 transition-colors duration-200 dark:hover:text-blue-400"
          }
        >
          <IoMdHome className="inline mr-1" />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allProducts"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold border-b-2 border-blue-600 dark:text-blue-400"
              : "hover:text-blue-600 transition-colors duration-200 dark:hover:text-blue-400"
          }
        >
          <MdOutlineProductionQuantityLimits className="inline mr-1" />
          All Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myExport"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold border-b-2 border-blue-600 dark:text-blue-400"
              : "hover:text-blue-600 transition-colors duration-200 dark:hover:text-blue-400"
          }
        >
          <TbDatabaseExport className="inline mr-1" />
          My Export
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myImport"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold border-b-2 border-blue-600 dark:text-blue-400"
              : "hover:text-blue-600 transition-colors duration-200 dark:hover:text-blue-400"
          }
        >
          <TbDatabaseImport className="inline mr-1" />
          My Import
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addExport"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 dark:text-blue-400"
              : "hover:text-blue-600 transition-colors duration-200 dark:hover:text-blue-400"
          }
        >
          <AiOutlineExport className="inline mr-1" />
          Add Export
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar py-0 min-h-0 z-50 rounded-full shadow-lg px-4 sm:px-8 lg:px-12
                    bg-gradient-to-r from-[#f3e7ff]/90 via-[#e0f7fa]/90 to-[#fff3e0]/90 
                    dark:from-[#1e1b4b]/90 dark:via-[#1e293b]/90 dark:to-[#0f172a]/90 
                    backdrop-blur-md border border-white/20 dark:border-gray-700 glass-card">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 dark:stroke-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow dark:bg-gray-900"
          >
            {links}
          </ul>
        </div>
        <Link
          to="/"
          className="flex items-center gap-1 text-xl font-bold text-gray-800 dark:text-gray-200"
        >
          <MdOutlineImportantDevices className="mr-1" />
          IᗰᑭOᖇTᗯᗩᐯE
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-10 text-gray-800 dark:text-gray-200">
          {links}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-9 border-2 border-gray-300 rounded-full dark:border-gray-600">
                <img
                  alt="User avatar"
                  referrerPolicy="no-referrer"
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  className="rounded-full"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow dark:bg-gray-900"
            >
              <div className="pb-3 border-b border-gray-200 dark:border-gray-700">
                <li className="text-sm font-bold text-gray-900 dark:text-gray-100">{user.displayName}</li>
                <li className="text-xs text-gray-600 dark:text-gray-400">{user.email}</li>
              </div>

              <li className="mt-1">
                <Link to="/myProfile" className="text-gray-800 dark:text-gray-200">
                  My Profile
                </Link>
              </li>

              <li className="mt-2 flex items-center justify-between px-2">
                <span className="text-gray-800 dark:text-gray-200 text-sm">
                  {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </span>
                <label className="swap swap-rotate">
                  <input
                    type="checkbox"
                    onChange={(e) => handleTheme(e.target.checked)}
                    checked={theme === "dark"}
                    className="hidden"
                    aria-label="Toggle dark mode"
                  />
                  <svg
                    className="swap-on fill-current w-6 h-6 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64 17.657A7.957 7.957 0 0112 4a7.956 7.956 0 016.364 13.657 8.003 8.003 0 01-12.724 0z" />
                  </svg>
                  <svg
                    className="swap-off fill-current w-6 h-6 text-gray-800 dark:text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636m12.728 12.728l-1.414-1.414M6.05 17.95l-1.414 1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </label>
              </li>

              <li className="mt-2">
                <button
                  onClick={() => {
                    logOut();
                    setUser(null);
                    toast.success("Logout successfully");
                    setLoading(false);
                  }}
                  className="btn btn-xs text-left bg-gradient-to-r from-pink-500 to-red-500 text-white"
                >
                  <IoLogOut className="inline mr-1" /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="btn rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg px-5 py-2 transition-all duration-300"
            >
              <IoLogIn className="inline mr-1" /> Log In
            </Link>
            <Link
              to="/register"
              className="btn bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-5 py-2 rounded-xl transition-all duration-300 hover:shadow-xl"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
