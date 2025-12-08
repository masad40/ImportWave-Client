import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetch(
        `${baseUrl}/products${
          search ? `?search=${encodeURIComponent(search)}` : ""
        }`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch products");
          }
          return res.json();
        })
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search, baseUrl]);

  return (
    <>
      <Helmet>
        <title>All Products | ImportWave</title>
        <meta
          name="description"
          content="Browse all export products available on the ImportWave marketplace."
        />
      </Helmet>

      <div
        className="max-w-7xl py-10  mx-auto px-4 mt-8
                 bg-white dark:bg-gray-900
                 text-gray-900 dark:text-gray-100
                 rounded-lg shadow-md
                 border border-gray-200 dark:border-gray-700
                 transition-colors duration-300"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>

        <div className="mb-6 my-10 flex justify-center">
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full max-w-md
                     bg-gray-100 dark:bg-gray-800
                     border border-gray-300 dark:border-gray-600
                     text-gray-900 dark:text-gray-100
                     placeholder-gray-500 dark:placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                     transition-colors duration-300"
            aria-label="Search products by name"
          />
        </div>

        {loading && (
          <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
            Loading products...
          </p>
        )}
        {error && (
          <p className="text-center mt-10 text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No products found.
          </p>
        )}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
