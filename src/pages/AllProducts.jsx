import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const baseUrl =
    import.meta.env.VITE_API_URL ||
    "https://import-export-server-sigma.vercel.app";

  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [baseUrl]);

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      let filtered = [...products];

      if (search) {
        filtered = filtered.filter((p) =>
          p?.name?.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (country) {
        filtered = filtered.filter((p) => p.originCountry === country);
      }

      if (priceRange) {
        const [min, max] = priceRange.split("-").map(Number);
        filtered = filtered.filter(
          (p) => p.price >= min && (!max || p.price <= max)
        );
      }

      filtered.sort((a, b) => {
        if (sort === "newest")
          return new Date(b.createdAt) - new Date(a.createdAt);
        if (sort === "priceLow") return a.price - b.price;
        if (sort === "priceHigh") return b.price - a.price;
        if (sort === "rating") return b.rating - a.rating;
        return 0;
      });

      setFilteredProducts(filtered);
      setPage(1);
    }, 400);
  }, [search, country, priceRange, sort, products]);

  const countries = [...new Set(products.map((p) => p.originCountry))].sort();

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Helmet>
        <title>All Products | ImportWave - Global Marketplace</title>
        <meta
          name="description"
          content="Explore thousands of products from global exporters. Filter by country, price, rating and more."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-10 md:mb-14">
          Explore All Products
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full bg-base-200"
          />

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="select select-bordered w-full bg-base-200"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="select select-bordered w-full bg-base-200"
          >
            <option value="">All Prices</option>
            <option value="0-100">$0 - $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500-1000">$500 - $1000</option>
            <option value="1000-">$1000+</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered w-full bg-base-200"
          >
            <option value="newest">Newest First</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <p className="text-center mb-6 md:mb-10 text-base md:text-lg">
          Showing {paginatedProducts.length} of {filteredProducts.length} products
        </p>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 text-2xl py-20">{error}</p>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-center text-2xl text-gray-500 py-20">
            No products match your filters.
          </p>
        )}

        {!loading && paginatedProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {paginatedProducts.map((item) => (
              <div key={item._id} className="group">
                <div className="transform group-hover:-translate-y-2 transition-all duration-300">
                  <ProductCard item={item} />
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-3 md:gap-4 mt-14">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="btn btn-outline"
            >
              Previous
            </button>

            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`btn ${
                    page === i + 1 ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="btn btn-outline"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
