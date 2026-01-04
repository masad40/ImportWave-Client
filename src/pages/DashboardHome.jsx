import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    myExports: 0,
    myImports: 0,
    totalAdded: 0,
    recentActivities: [],
  });

  const [loading, setLoading] = useState(true);

  const baseUrl =
    import.meta.env.VITE_API_URL ||
    "https://import-export-server-sigma.vercel.app";

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      setLoading(true);

      try {
        const [exportsRes, importsRes] = await Promise.all([
          fetch(`${baseUrl}/my-exports/${user.email}`),
          fetch(`${baseUrl}/my-imports/${encodeURIComponent(user.email)}`),
        ]);

        const exportsData = await exportsRes.json();
        const importsData = await importsRes.json();

        const recentActivities = [
          ...exportsData.map((e) => ({
            ...e,
            type: "export",
            date: e.createdAt || new Date(),
          })),
          ...importsData.map((i) => ({
            ...i,
            type: "import",
            date: i.createdAt || new Date(),
          })),
        ]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);

        setStats({
          myExports: Array.isArray(exportsData) ? exportsData.length : 0,
          myImports: Array.isArray(importsData) ? importsData.length : 0,
          totalAdded: Array.isArray(exportsData) ? exportsData.length : 0,
          recentActivities,
        });
      } catch (err) {
        toast.error("Could not load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, baseUrl]);

  return (
    <>
      <Helmet>
        <title>Dashboard | ImportWave</title>
        <meta
          name="description"
          content="Your personal dashboard – track exports, imports, and trading activity on ImportWave."
        />
      </Helmet>

      <div className="p-6 md:p-8 lg:p-12">
        <div className="mb-10 lg:mb-12 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Welcome back, {user?.displayName?.split(" ")[0] || "Trader"}! 👋
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Here's what's happening with your global trading activity today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-14 lg:mb-16">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-7 lg:p-8 text-white shadow-2xl transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">My Exports</h3>
              <span className="text-5xl">📤</span>
            </div>
            <p className="text-5xl font-extrabold">
              {loading ? "..." : stats.myExports}
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-7 lg:p-8 text-white shadow-2xl transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">My Imports</h3>
              <span className="text-5xl">📥</span>
            </div>
            <p className="text-5xl font-extrabold">
              {loading ? "..." : stats.myImports}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-7 lg:p-8 text-white shadow-2xl transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Total Added</h3>
              <span className="text-5xl">➕</span>
            </div>
            <p className="text-5xl font-extrabold">
              {loading ? "..." : stats.totalAdded}
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-7 lg:p-8 text-white shadow-2xl transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Active Trades</h3>
              <span className="text-5xl">🔥</span>
            </div>
            <p className="text-5xl font-extrabold">
              {loading ? "..." : stats.myExports + stats.myImports}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-7 lg:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-8">Recent Activity</h2>

            {loading ? (
              <p className="text-center text-gray-500">Loading activities...</p>
            ) : stats.recentActivities.length === 0 ? (
              <p className="text-center text-gray-500">No recent activity yet</p>
            ) : (
              <div className="space-y-4">
                {stats.recentActivities.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">
                        {activity.type === "export" ? "📤" : "📥"}
                      </span>

                      <div>
                        <p className="font-semibold">{activity.name}</p>

                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.type === "export" ? "Exported" : "Imported"}{" "}
                          {activity.importedQuantity || 1} unit(s)
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-7 lg:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-8">Quick Actions</h2>

            <div className="grid grid-cols-1 gap-6">
              <Link
                to="/dashboard/addExport"
                className="flex items-center justify-center gap-4 py-6 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-xl rounded-2xl shadow-xl transition transform hover:scale-105"
              >
                <span className="text-3xl">➕</span>
                Add New Export Product
              </Link>

              <Link
                to="/allProducts"
                className="flex items-center justify-center gap-4 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl rounded-2xl shadow-xl transition transform hover:scale-105"
              >
                <span className="text-3xl">🌍</span>
                Browse Global Products
              </Link>

              <Link
                to="/dashboard/myExport"
                className="flex items-center justify-center gap-4 py-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xl rounded-2xl shadow-xl transition transform hover:scale-105"
              >
                <span className="text-3xl">📤</span>
                View My Exports
              </Link>

              <Link
                to="/dashboard/myImport"
                className="flex items-center justify-center gap-4 py-6 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold text-xl rounded-2xl shadow-xl transition transform hover:scale-105"
              >
                <span className="text-3xl">📥</span>
                View My Imports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
