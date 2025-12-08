import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ProductCard from "../components/ProductCard";
import s1 from "../assets/Gemini_Generated_Image_r0jh1lr0jh1lr0jh.png";
import s2 from "../assets/Gemini_Generated_Image_dwsnl1dwsnl1dwsn.png";
import s3 from "../assets/Gemini_Generated_Image_q8by70q8by70q8by.png";

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL || "https://import-export-server-sigma.vercel.app";
  const url = `${baseUrl}/products`;

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        if (!alive) return;
        setLatestProducts(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (err) {
        if (alive) {
          setError(err.message || "Failed to load products");
          setLatestProducts([]);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [url]);

  return (
    <>
      {/* Dynamic Page Title */}
      <Helmet>
        <title>Home | ImportWave</title>
        <meta
          name="description"
          content="Welcome to ImportWave — Your trusted import-export marketplace with quality products and global shipping."
        />
      </Helmet>

      <div
        className="max-w-7xl my-10 mx-auto px-4
               bg-white dark:bg-gray-900
               text-gray-900 dark:text-gray-100
               rounded-lg shadow-md
               border border-gray-200 dark:border-gray-700
               transition-colors duration-300"
      >
        <div className="carousel h-96 w-full rounded-lg mt-5">
          <div id="slide1" className="carousel-item relative w-full">
            <img src={s3} className="w-full object-cover rounded-xl" alt="Slide 1" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 transition">❮</a>
              <a href="#slide2" className="btn btn-circle bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 transition">❯</a>
            </div>
          </div>

          <div id="slide2" className="carousel-item relative w-full">
            <img src={s1} className="w-full object-cover rounded-xl" alt="Slide 2" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 transition">❮</a>
              <a href="#slide3" className="btn btn-circle bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 transition">❯</a>
            </div>
          </div>

          <div id="slide3" className="carousel-item relative w-full">
            <img src={s2} className="w-full object-cover rounded-xl" alt="Slide 3" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 transition">❮</a>
              <a href="#slide1" className="btn btn-circle bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 transition">❯</a>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-10 mb-5 text-center">Latest Products</h2>

        {loading && (
          <p className="text-center text-lg font-semibold text-gray-600 dark:text-gray-400">
            Loading products...
          </p>
        )}

        {!loading && latestProducts.length === 0 && (
          <p className="text-center text-lg font-semibold text-gray-500 dark:text-gray-400">
            No products found!
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {latestProducts.map((product) => (
            <ProductCard key={product._id || product.id} item={product} />
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-6">Why Choose Our Platform</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 shadow-xl rounded-lg bg-gray-100 dark:bg-gray-800">
              <h3 className="text-xl font-bold mb-2">Global Network</h3>
              <p>We import/export products to 40+ countries.</p>
            </div>
            <div className="p-6 shadow-xl rounded-lg bg-gray-100 dark:bg-gray-800">
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p>Guaranteed safe and quick shipping world-wide.</p>
            </div>
            <div className="p-6 shadow-xl rounded-lg bg-gray-100 dark:bg-gray-800">
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p>Multiple secure payment methods available.</p>
            </div>
          </div>
        </section>

        <section className="mt-16 mb-16">
          <h2 className="text-3xl font-bold text-center mb-6">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-800">
              <p>"Great quality products! Shipping was smooth."</p>
              <h3 className="font-bold mt-2">— Rakib</h3>
            </div>
            <div className="p-6 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-800">
              <p>"Best import-export service I’ve used so far."</p>
              <h3 className="font-bold mt-2">— Hossain</h3>
            </div>
            <div className="p-6 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-800">
              <p>"Customer support was super helpful."</p>
              <h3 className="font-bold mt-2">— Fatima</h3>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
