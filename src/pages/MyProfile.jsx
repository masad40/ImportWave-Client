import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ exports: 0, imports: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  const baseUrl = import.meta.env.VITE_API_URL || "https://import-export-server-sigma.vercel.app";

  useEffect(() => {
    if (!user?.email) {
      setLoadingStats(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const [exportsRes, importsRes] = await Promise.all([
          fetch(`${baseUrl}/my-exports/${user.email}`),
          fetch(`${baseUrl}/my-imports/${encodeURIComponent(user.email)}`),
        ]);

        const exportsData = await exportsRes.json();
        const importsData = await importsRes.json();

        setStats({
          exports: Array.isArray(exportsData) ? exportsData.length : 0,
          imports: Array.isArray(importsData) ? importsData.length : 0,
        });
      } catch (err) {
        console.error("Failed to load stats:", err);
        toast.error("Could not load your stats");
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [user, baseUrl]);

  const joinDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <>
      <Helmet>
        <title>My Profile | ImportWave</title>
        <meta name="description" content="View your profile, trading stats, and manage your account on ImportWave global marketplace." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Welcome back, {user?.displayName?.split(" ")[0] || "Trader"}!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Avatar & Info */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 text-center border border-gray-200 dark:border-gray-800">
                <div className="relative inline-block mb-6">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/Q3LYhjtx/pngtree-user-icon-png-image-1796659.jpg"}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl"
                  />
                  <div className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                </div>

                <h2 className="text-3xl font-bold mb-2">{user?.displayName || "Anonymous Trader"}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{user?.email}</p>

                <div className="space-y-4 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                    <span className="font-medium">{joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Account Status</span>
                    <span className="font-medium text-green-600">Verified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Role</span>
                    <span className="font-medium text-blue-600">Global Trader</span>
                  </div>
                </div>

                <Link
                  to="/dashboard/updateProfile"
                  className="mt-8 w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-lg rounded-2xl shadow-xl transition block text-center"
                >
                  Update Profile
                </Link>
              </div>
            </div>

            {/* Right: Stats & Actions */}
            <div className="lg:col-span-2 space-y-10">
              {/* Trading Stats */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-800">
                <h3 className="text-2xl font-bold mb-8">Your Trading Activity</h3>

                {loadingStats ? (
                  <div className="grid grid-cols-2 gap-8">
                    {Array(2).fill(0).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center p-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl text-white shadow-lg">
                      <h4 className="text-5xl font-extrabold mb-2">{stats.exports}</h4>
                      <p className="text-xl opacity-90">Products Exported</p>
                    </div>

                    <div className="text-center p-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl text-white shadow-lg">
                      <h4 className="text-5xl font-extrabold mb-2">{stats.imports}</h4>
                      <p className="text-xl opacity-90">Products Imported</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-800">
                <h3 className="text-2xl font-bold mb-8">Quick Actions</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link
                    to="/dashboard/myExport"
                    className="flex items-center justify-center gap-4 py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl transition transform hover:scale-105"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    View My Exports
                  </Link>

                  <Link
                    to="/dashboard/myImport"
                    className="flex items-center justify-center gap-4 py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-2xl shadow-xl transition transform hover:scale-105"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4" />
                    </svg>
                    View My Imports
                  </Link>

                  <Link
                    to="/dashboard/addExport"
                    className="flex items-center justify-center gap-4 py-6 bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg rounded-2xl shadow-xl transition transform hover:scale-105 md:col-span-2"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Product
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;