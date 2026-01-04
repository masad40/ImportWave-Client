import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";

const Explore = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const baseUrl =
    import.meta.env.VITE_API_URL ||
    "https://import-export-server-sigma.vercel.app";

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [baseUrl]);

  useEffect(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter((p) =>
        max ? p.price >= min && p.price <= max : p.price >= min
      );
    }

    filtered.sort((a, b) => {
      if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "priceLow") return a.price - b.price;
      if (sort === "priceHigh") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

    setFilteredProducts(filtered);
    setPage(1);
  }, [search, priceRange, sort, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginated = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Helmet>
        <title>Explore Products | ImportWave</title>
        <meta
          name="description"
          content="Browse thousands of products from global exporters. Filter by price, rating, and more."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Explore Global Products
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
            Discover premium goods from verified exporters worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full bg-white dark:bg-gray-800"
          />

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="select select-bordered w-full bg-white dark:bg-gray-800"
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
            className="select select-bordered w-full bg-white dark:bg-gray-800"
          >
            <option value="newest">Newest First</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <p className="text-center text-sm md:text-lg mb-6 md:mb-8 text-gray-700 dark:text-gray-300">
          Showing {paginated.length} of {filteredProducts.length} products
        </p>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && paginated.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {paginated.map((product) => (
              <div key={product._id} className="group">
                <div className="transform group-hover:-translate-y-4 transition-all duration-500">
                  <ProductCard item={product} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-7xl md:text-8xl mb-6 md:mb-8 opacity-30">
              🔍
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              No products found
            </h3>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-400">
              Try adjusting your filters or search term
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-12 md:mt-16">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="btn btn-outline btn-sm md:btn-lg"
            >
              Previous
            </button>

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`btn btn-sm md:btn-lg ${
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
              className="btn btn-outline btn-sm md:btn-lg"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Explore;
