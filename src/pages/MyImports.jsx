import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const MyImports = () => {
  const { user } = useContext(AuthContext);
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    fetch(`${baseUrl}/my-imports/${encodeURIComponent(user.email)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setImports(Array.isArray(data) ? data : []);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch imports failed:", err);
        setError(err.message || "Failed to load imports");
        setImports([]);
        setLoading(false);
      });
  }, [user, baseUrl]);

  const handleRemove = async (id) => {
    setDeleting(id);
    try {
      const res = await fetch(`${baseUrl}/remove-import/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setImports((prev) => prev.filter((item) => item._id !== id));
        setError("");
        toast.success("Removed");
      } else {
        setError("Failed to remove import");
      }
    } catch (err) {
      console.error("Delete import failed:", err);
      setError("Failed to remove import");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-700 dark:text-gray-300">Loading imports...</p>;
  }

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500 dark:text-red-400">
        Please login to view imports.
      </p>
    );
  }

  return (
    <div className="max-w-6xl my-10 mx-auto px-4 pb-20">
      <Helmet>
        <title>My Imports | ImportWave</title>
        <meta name="description" content="View all products you have imported on ImportWave." />
      </Helmet>

      <h2 className="text-3xl font-bold text-center my-8 text-gray-900 dark:text-gray-100">
        My Imported Products
      </h2>

      {error && (
        <p className="text-center text-red-500 font-semibold mb-4 dark:text-red-400">{error}</p>
      )}

      {imports.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No imported products found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imports.map((item) => (
            <div
              key={item._id}
              className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 transition-colors duration-300"
            >
              <figure>
                <img
                  src={item.image || "https://placehold.co/400x300?text=No+Image"}
                  alt={item.name || "No name"}
                  className="h-52 w-full object-cover rounded-lg"
                />
              </figure>

              <div className="card-body mt-3">
                <h2 className="card-title text-gray-900 dark:text-gray-100">{item.name || "Untitled"}</h2>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Price: ${item.price ?? "N/A"}</p>
                <p className="text-gray-700 dark:text-gray-300">Rating: ⭐ {item.rating ?? "N/A"}</p>
                <p className="text-gray-700 dark:text-gray-300">Origin Country: {item.country || "Unknown"}</p>
                <p className="text-gray-700 dark:text-gray-300">
                  Imported Quantity: <b>{item.importedQuantity ?? 0}</b>
                </p>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleRemove(item._id)}
                    disabled={deleting === item._id}
                    className={`btn btn-error text-white rounded-lg px-4 py-2 ${
                      deleting === item._id ? "loading" : "hover:bg-red-700"
                    } transition-colors duration-200`}
                  >
                    {deleting === item._id ? "Removing..." : "Remove"}
                  </button>

                  <Link to={`/productDetails/${item.productId}`}>
                    <button className="btn btn-primary rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors duration-200">
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
  );
};

export default MyImports;
