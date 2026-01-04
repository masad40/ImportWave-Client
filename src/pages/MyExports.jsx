import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import SkeletonCard from "../components/SkeletonCard"; 
const MyExports = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const baseUrl = import.meta.env.VITE_API_URL || "https://import-export-server-sigma.vercel.app";

  const [exportsData, setExportsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!userEmail) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${baseUrl}/my-exports/${userEmail}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load exports");
        return res.json();
      })
      .then((data) => {
        setExportsData(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load your exports");
        setLoading(false);
      });
  }, [userEmail, baseUrl]);

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    fetch(`${baseUrl}/delete-product/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Product deleted successfully");
          setExportsData((prev) => prev.filter((item) => item._id !== id));
        } else {
          toast.error("Failed to delete");
        }
      })
      .catch(() => toast.error("Delete failed"));
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;
    const updatedProduct = {
      name: form.name.value.trim(),
      price: Number(form.price.value),
      country: form.country.value.trim(),
      rating: Number(form.rating.value),
      quantity: Number(form.quantity.value),
      image: form.image.value.trim(),
    };

    try {
      const res = await fetch(`${baseUrl}/update-product/${selectedProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Product updated successfully!");
        setExportsData((prev) =>
          prev.map((item) =>
            item._id === selectedProduct._id ? { ...item, ...updatedProduct } : item
          )
        );
        setModalOpen(false);
      } else {
        toast.error("No changes detected or update failed");
      }
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Exports | ImportWave - Manage Your Products</title>
        <meta name="description" content="View, update, and delete products you have exported on ImportWave global marketplace." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Exported Products</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Manage all products you've added for export
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {Array(8).fill(0).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && exportsData.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-200 dark:bg-gray-800 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-8" />
            <h3 className="text-2xl font-semibold mb-4">No exported products yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start exporting your products to the global market today!
            </p>
            <Link
              to="/dashboard/addExport"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg transition"
            >
              Add Your First Product
            </Link>
          </div>
        )}

        {/* Products Grid */}
        {!loading && exportsData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {exportsData.map((item) => (
              <div
                key={item._id}
                className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
              >
                <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                  <img
                    src={item.image || "https://via.placeholder.com/400"}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.country}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{item.name}</h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="text-2xl font-bold text-blue-600">${item.price}</p>
                    <p className="flex items-center gap-1">
                      Rating: {"⭐".repeat(Math.round(item.rating))} ({item.rating})
                    </p>
                    <p>Available: {item.quantity} units</p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openUpdateModal(item)}
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Update Modal */}
        {modalOpen && selectedProduct && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 w-full max-w-2xl relative shadow-2xl">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-red-600 transition"
                aria-label="Close"
              >
                ×
              </button>

              <h2 className="text-3xl font-bold mb-8 text-center">Update Product</h2>

              <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <input
                    name="name"
                    defaultValue={selectedProduct.name}
                    required
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price ($)</label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={selectedProduct.price}
                    required
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Origin Country</label>
                  <input
                    name="country"
                    defaultValue={selectedProduct.country}
                    required
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Rating (1-5)</label>
                  <input
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    defaultValue={selectedProduct.rating}
                    required
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Available Quantity</label>
                  <input
                    name="quantity"
                    type="number"
                    min="0"
                    defaultValue={selectedProduct.quantity}
                    required
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    name="image"
                    defaultValue={selectedProduct.image}
                    required
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="md:col-span-2 text-center mt-6">
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-12 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl shadow-lg transition disabled:opacity-70"
                  >
                    {updating ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyExports;