import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [importQty, setImportQty] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/product/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        if (isMounted) setProduct(data);
      } catch (err) {
        console.error(err);
        if (isMounted) setProduct(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id, baseUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        <span className="loading loading-spinner loading-lg text-blue-600 dark:text-blue-400"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <p className="text-center text-red-600 dark:text-red-400 mt-10 bg-gray-100 dark:bg-gray-900 p-4 rounded transition-colors duration-500">
        Product not found!
      </p>
    );
  }

  const isDisabled = Number(importQty) <= 0 || Number(importQty) > product.quantity;

  const handleImport = async () => {
    if (!user) return alert("Please login to import products");

    const importData = {
      productId: product._id,
      userEmail: user.email,
      quantity: Number(importQty),
    };

    try {
      const res = await fetch(`${baseUrl}/import-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(importData),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Product Imported Successfully!");
        setProduct((prev) => ({ ...prev, quantity: prev.quantity - Number(importQty) }));
        setOpenModal(false);
        setImportQty("");
      } else {
        toast.error("Failed to import product.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error importing product.");
    }
  };

  return (
    <div className="max-w-2xl my-10 mx-auto p-6 shadow-md rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-500">
      
      <Helmet>
        <title>{product.name} - GameHub</title>
        <meta
          name="description"
          content={`View details and import ${product.name} from GameHub. Price: $${product.price}, Rating: ${product.rating}, Available: ${product.quantity}`}
        />
      </Helmet>

      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded-xl h-45 md:h-90 lg:h-80 object-cover"
      />
      <h1 className="text-3xl font-semibold mt-4 text-gray-900 dark:text-gray-100">
        {product.name}
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">Price: ${product.price}</p>
      <p className="text-lg text-gray-700 dark:text-gray-300">Origin Country: {product.country}</p>
      <p className="text-lg text-gray-700 dark:text-gray-300">Rating: ⭐ {product.rating}</p>
      <p className="text-lg font-semibold text-green-600 dark:text-green-400">
        Available: {product.quantity}
      </p>
      <button
        onClick={() => setOpenModal(true)}
        className="btn bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white mt-4 transition-colors duration-300"
      >
        Import Now
      </button>

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 shadow-xl transition-colors duration-500">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Enter Quantity
            </h2>
            <input
              type="number"
              className="input input-bordered w-full mt-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded"
              placeholder="Import Quantity"
              value={importQty}
              onChange={(e) => setImportQty(e.target.value)}
              min="1"
              max={product.quantity}
            />
            {Number(importQty) > product.quantity && (
              <p className="text-red-600 dark:text-red-400 mt-1 text-sm">
                Quantity cannot exceed available stock!
              </p>
            )}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setOpenModal(false)}
                className="btn btn-outline text-gray-900 dark:text-gray-100 border border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                disabled={isDisabled}
                onClick={handleImport}
                className={`btn text-white ${
                  isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                } transition-colors duration-300`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
