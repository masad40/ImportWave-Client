import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import {
  SunIcon,
  MoonIcon,
  HomeIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  PhoneIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  KeyIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleLogout = async () => {
    await logOut();
    toast.success("Logged out successfully!");
  };

  return (
    <>
      <Helmet>
        <title>ImportWave — Global Trade Hub</title>
        <meta
          name="description"
          content="ImportWave makes global trade simpler with secure tools and effortless import & export solutions."
        />
      </Helmet>

      <div className="navbar bg-base-100 dark:bg-gray-900 shadow-xl px-4 sm:px-6 lg:px-12 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 p-4 shadow-lg bg-base-100 dark:bg-gray-800 rounded-box w-72 z-50 space-y-1"
            >
              <li>
                <NavLink
                  to="/"
                  end
                  className="flex items-center gap-3 py-3 text-base font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <HomeIcon className="h-5 w-5" />
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/explore"
                  className="flex items-center gap-3 py-3 text-base font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <GlobeAltIcon className="h-5 w-5" />
                  Explore
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className="flex items-center gap-3 py-3 text-base font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <InformationCircleIcon className="h-5 w-5" />
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className="flex items-center gap-3 py-3 text-base font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <PhoneIcon className="h-5 w-5" />
                  Contact
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/privacy"
                  className="flex items-center gap-3 py-3 text-base font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ShieldCheckIcon className="h-5 w-5" />
                  Privacy
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/terms"
                  className="flex items-center gap-3 py-3 text-base font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <DocumentTextIcon className="h-5 w-5" />
                  Terms
                </NavLink>
              </li>

              <div className="border-t border-gray-300 dark:border-gray-600 my-4" />

              {user ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className="flex items-center gap-3 py-3 text-base font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    >
                      <ChartBarIcon className="h-5 w-5" />
                      Dashboard
                    </NavLink>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 py-3 text-base font-medium text-error w-full text-left rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className="btn btn-outline btn-primary w-full text-base font-medium py-2.5 rounded-lg flex items-center justify-center gap-2"
                    >
                      <KeyIcon className="h-5 w-5" />
                      Login
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/register"
                      className="btn btn-primary w-full text-base font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-md"
                    >
                      <UserPlusIcon className="h-5 w-5" />
                      Register
                    </NavLink>
                  </li>
                </>
              )}

              <div className="border-t border-gray-300 dark:border-gray-600 my-4" />

              <li>
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-between w-full py-3 text-base font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 px-3"
                >
                  <span className="flex items-center gap-3">
                    {theme === "dark" ? (
                      <SunIcon className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <MoonIcon className="h-5 w-5 text-indigo-600" />
                    )}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-3 group">
            <div className="text-4xl group-hover:scale-110 transition-transform">
              🌍
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition">
                ImportWave
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium -mt-1">
                Global Trade Hub
              </p>
            </div>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-8 text-lg font-medium">
            {[
              { to: "/", label: "Home", icon: HomeIcon },
              { to: "/explore", label: "Explore", icon: GlobeAltIcon },
              { to: "/about", label: "About", icon: InformationCircleIcon },
              { to: "/contact", label: "Contact", icon: PhoneIcon },
              { to: "/privacy", label: "Privacy", icon: ShieldCheckIcon },
              { to: "/terms", label: "Terms", icon: DocumentTextIcon },
            ].map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 transition ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 border-b-4 border-blue-600 pb-2"
                        : "hover:text-blue-600 dark:hover:text-blue-400"
                    }`
                  }
                >
                  <Icon className="h-6 w-6" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle tooltip tooltip-bottom group"
            data-tip={theme === "dark" ? "Light Mode" : "Dark Mode"}
          >
            <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
              <SunIcon
                className={`h-7 w-7 text-yellow-500 absolute transition-all duration-700 ${
                  theme === "dark"
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-16 opacity-0"
                } group-hover:text-yellow-400`}
              />
              <MoonIcon
                className={`h-7 w-7 text-indigo-500 absolute transition-all duration-700 ${
                  theme === "dark"
                    ? "translate-y-16 opacity-0"
                    : "translate-y-0 opacity-100"
                } group-hover:text-indigo-400`}
              />
            </div>
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-12 rounded-full ring-4 ring-blue-600 ring-offset-2 ring-offset-base-100 shadow-xl">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/Q3LYhjtx/pngtree-user-icon-png-image-1796659.jpg"
                    }
                    alt="User"
                    className="object-cover"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-4 p-6 shadow-2xl bg-base-100 dark:bg-gray-800 rounded-2xl w-64 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-center pb-4 border-b dark:border-gray-700">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/Q3LYhjtx/pngtree-user-icon-png-image-1796659.jpg"
                    }
                    alt="User"
                    className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-blue-600"
                  />
                  <p className="font-bold text-xl">
                    {user?.displayName || "Trader"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>

                <li className="mt-4">
                  <NavLink
                    to="/dashboard"
                    className="flex items-center gap-3 justify-center py-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    <ChartBarIcon className="h-6 w-6" />
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 justify-center py-4 text-error rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30"
                  >
                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <NavLink className="btn btn-outline btn-primary px-6 py-3 text-base font-medium rounded-xl" to="/login">
                Login
              </NavLink>
              <NavLink className="btn btn-primary px-6 py-3 text-base font-bold rounded-xl shadow-lg" to="/register">
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
