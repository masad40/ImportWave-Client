import { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const AddExportProduct = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const baseUrl =
    import.meta.env.VITE_API_URL ||
    "https://import-export-server-sigma.vercel.app";

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    country: "",
    rating: "",
    quantity: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "image") setImagePreview(value || null);

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.price || Number(formData.price) < 0)
      newErrors.price = "Valid price is required";
    if (!formData.country.trim())
      newErrors.country = "Origin country is required";
    if (
      !formData.rating ||
      Number(formData.rating) < 0 ||
      Number(formData.rating) > 5
    )
      newErrors.rating = "Rating must be between 0 and 5";
    if (!formData.quantity || Number(formData.quantity) <= 0)
      newErrors.quantity = "Quantity must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      toast.error("You must be logged in to add a product");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

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

      if (!res.ok) throw new Error("Failed to add product");

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Product added successfully! 🎉");
        setFormData({
          name: "",
          image: "",
          price: "",
          country: "",
          rating: "",
          quantity: "",
        });
        setImagePreview(null);
      } else {
        toast.error("Failed to add product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding product. Please try again.");
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
          content="Add a new product to export on the ImportWave global marketplace."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-10 lg:mb-14">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Add New Export Product
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
            Share your products with traders from 150+ countries
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Premium Leather Wallet"
                  className="input input-bordered w-full"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  required
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="99.99"
                    className="input input-bordered w-full"
                    required
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Origin Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g., Italy"
                    className="input input-bordered w-full"
                    required
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="4.8"
                    className="input input-bordered w-full"
                    required
                  />
                  {errors.rating && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.rating}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Available Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    placeholder="100"
                    className="input input-bordered w-full"
                    required
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.quantity}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold text-lg rounded-xl shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner" />
                    Adding Product...
                  </>
                ) : (
                  "Add Product to Export"
                )}
              </button>
            </form>
          </div>

          <div className="order-first lg:order-last">
            <h3 className="text-xl md:text-2xl font-bold mb-5 text-center lg:text-left">
              Live Preview
            </h3>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-4 border-dashed border-gray-300 dark:border-gray-600 min-h-80 sm:min-h-96 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x600?text=Invalid+URL";
                  }}
                />
              ) : (
                <div className="text-center p-8">
                  <div className="bg-gray-300 dark:bg-gray-700 rounded-xl w-28 h-28 mx-auto mb-5" />
                  <p className="text-gray-500 dark:text-gray-400 text-base">
                    Enter an image URL to see preview
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExportProduct;
