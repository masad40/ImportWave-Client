import { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../contexts/AuthContext";

const AddExportProduct = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    country: "",
    rating: "",
    quantity: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.image ||
      !formData.price ||
      !formData.country ||
      !formData.rating ||
      !formData.quantity
    ) {
      setErrorMsg("Please fill all fields.");
      return false;
    }

    if (
      Number(formData.price) < 0 ||
      Number(formData.rating) < 0 ||
      Number(formData.rating) > 5 ||
      Number(formData.quantity) <= 0
    ) {
      setErrorMsg("Please enter valid numeric values.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      setErrorMsg("User email not found. Please login.");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const product = {
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
      quantity: Number(formData.quantity),
      authorEmail: userEmail,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${baseUrl}/add-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (data.insertedId) {
        setSuccessMsg("Product added successfully!");
        setFormData({
          name: "",
          image: "",
          price: "",
          country: "",
          rating: "",
          quantity: "",
        });
      } else {
        setErrorMsg("Failed to add product. Please try again.");
      }
    } catch {
      setErrorMsg("Error occurred while adding product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Export Product | ImportWave</title>
        <meta
          name="description"
          content="Add and export products on ImportWave platform."
        />
      </Helmet>

      <div
        className="max-w-xl my-10 mx-auto px-6 py-10 rounded-lg shadow-lg
                    bg-white dark:bg-gray-800
                    text-gray-900 dark:text-gray-100
                    border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Add Export Product
        </h2>

        {successMsg && (
          <p className="text-green-600 dark:text-green-400 font-semibold mb-4 text-center">
            {successMsg}
          </p>
        )}
        {errorMsg && (
          <p className="text-red-600 dark:text-red-400 font-semibold mb-4 text-center">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700
                     border-gray-300 dark:border-gray-600
                     text-gray-900 dark:text-gray-100"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700
                     border-gray-300 dark:border-gray-600
                     text-gray-900 dark:text-gray-100"
            value={formData.image}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700
                     border-gray-300 dark:border-gray-600
                     text-gray-900 dark:text-gray-100"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700
                     border-gray-300 dark:border-gray-600
                     text-gray-900 dark:text-gray-100"
            value={formData.country}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="rating"
            placeholder="Rating (0-5)"
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700
                     border-gray-300 dark:border-gray-600
                     text-gray-900 dark:text-gray-100"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Available Quantity"
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700
                     border-gray-300 dark:border-gray-600
                     text-gray-900 dark:text-gray-100"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full
                     bg-blue-600 hover:bg-blue-700 text-white
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-300"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddExportProduct;
