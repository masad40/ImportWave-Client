import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import SkeletonCard from "../components/SkeletonCard";

const MyImports = () => {
  const { user } = useContext(AuthContext);
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL || "https://import-export-server-sigma.vercel.app";

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    fetch(`${baseUrl}/my-imports/${encodeURIComponent(user.email)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load imports (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setImports(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading imports:", err);
        setError("Failed to load your imported products. Please try again later.");
        setLoading(false);
      });
  }, [user, baseUrl]);

  const handleRemove = async (id) => {
    if (!confirm("Are you sure you want to remove this product from your imports?")) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`${baseUrl}/remove-import/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success || data.deletedCount > 0) {
        toast.success("Product removed from imports");
        setImports((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error("Failed to remove product");
        setError("Could not remove the product.");
      }
    } catch (err) {
      console.error("Remove failed:", err);
      toast.error("Remove failed");
      setError("Network error. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Imports | ImportWave - Your Imported Products</title>
        <meta
          name="description"
          content="View and manage all products you've imported on ImportWave global marketplace."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Imported Products</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Track and manage all items you've imported from global exporters
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center mb-8">
            <p className="text-red-600 dark:text-red-400 text-lg font-medium">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {Array(8).fill(0).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && imports.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-200 dark:bg-gray-800 border-2 border-dashed rounded-xl w-40 h-40 mx-auto mb-8 opacity-50" />
            <h3 className="text-2xl font-semibold mb-4">No imported products yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Start exploring global products and import your favorites today!
            </p>
            <Link
              to="/allProducts"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl shadow-lg transition transform hover:scale-105"
            >
              Browse Products Now
            </Link>
          </div>
        )}

        {/* Imports Grid */}
        {!loading && imports.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {imports.map((item) => (
              <div
                key={item._id}
                className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "https://via.placeholder.com/400x300?text=No+Image"}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.country || "Unknown"}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{item.name || "Untitled Product"}</h3>

                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="text-2xl font-bold text-emerald-600">${item.price ?? "N/A"}</p>
                    <p className="flex items-center gap-1">
                      Rating: {"⭐".repeat(Math.round(item.rating || 0))} ({item.rating || "N/A"})
                    </p>
                    <p className="font-medium">
                      Imported: <span className="text-blue-600">{item.importedQuantity || 0}</span> units
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => handleRemove(item._id)}
                      disabled={deletingId === item._id}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-xl transition disabled:cursor-not-allowed"
                    >
                      {deletingId === item._id ? "Removing..." : "Remove"}
                    </button>

                    <Link to={`/productDetails/${item.productId}`} className="flex-1">
                      <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition">
                        See Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyImports;