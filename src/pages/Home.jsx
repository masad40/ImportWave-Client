import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";

// Animated CountUp Component (React Way - No DOM Error)
const CountUp = ({ end, label }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) observer.observe(countRef.current);

    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={countRef} className="group text-center">
      <h3 className="text-5xl md:text-6xl font-extrabold mb-3 group-hover:scale-110 transition-transform duration-500">
        {count.toLocaleString()}+
      </h3>
      <p className="text-xl font-medium opacity-90">{label}</p>
    </div>
  );
};

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_URL || "https://import-export-server-sigma.vercel.app";
  const url = `${baseUrl}/products`;

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        if (alive) {
          setLatestProducts(Array.isArray(data) ? data.slice(0, 6) : []);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        if (alive) setLatestProducts([]);
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
      <Helmet>
        <title>ImportWave - Global Import Export Marketplace</title>
        <meta
          name="description"
          content="Connect with global traders. Import premium products or export yours worldwide with secure payments and fast shipping."
        />
      </Helmet>

      {/* 1. Hero Section - Premium Polished */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden rounded-b-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-emerald-900 opacity-95"></div>
        <img
          src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
          alt="Global Trade Logistics"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight drop-shadow-2xl">
            Trade Smarter.<br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Grow Faster.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light">
            Join the world's fastest-growing import-export platform. Connect with verified traders in 150+ countries.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/explore"
              className="px-12 py-6 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-xl"
            >
              Explore Products
            </Link>
            <Link
              to="/register"
              className="px-12 py-6 bg-white/20 backdrop-blur-md border-2 border-white/50 hover:bg-white/30 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-xl"
            >
              Start Free Today
            </Link>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-10 h-10 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 2. Animated Statistics */}
      <section className="py-24 bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <CountUp end={1000} label="Products Listed" />
          <CountUp end={150} label="Countries Served" />
          <CountUp end={5000} label="Active Traders" />
          <CountUp end={10000} label="Successful Deals" />
        </div>
      </section>

      {/* 3. Latest Products - Fresh Arrivals */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Fresh Arrivals</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Discover the newest products added by global exporters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            ) : latestProducts.length > 0 ? (
              latestProducts.map((product) => (
                <div key={product._id} className="group">
                  <div className="transform group-hover:-translate-y-4 transition-all duration-500">
                    <ProductCard item={product} />
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-2xl text-gray-500 py-20">
                No products available yet.
              </p>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl shadow-lg transition"
            >
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
     
      {/* 5. How It Works */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-3xl text-white font-bold mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Register & Verify</h3>
              <p>Create your account in minutes</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-full mx-auto flex items-center justify-center text-3xl text-white font-bold mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Add or Browse</h3>
              <p>Export your products or find imports</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-500 rounded-full mx-auto flex items-center justify-center text-3xl text-white font-bold mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Connect & Trade</h3>
              <p>Secure negotiation and payment</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-3xl text-white font-bold mb-4">4</div>
              <h3 className="text-xl font-bold mb-2">Ship & Track</h3>
              <p>Global delivery with tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose ImportWave</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl text-center">
              <h3 className="text-2xl font-bold mb-4">Secure Transactions</h3>
              <p>Escrow protection & verified users</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl text-center">
              <h3 className="text-2xl font-bold mb-4">Fast Global Shipping</h3>
              <p>Partnered with top logistics providers</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl text-center">
              <h3 className="text-2xl font-bold mb-4">24/7 Support</h3>
              <p>Multilingual customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Global Reach */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">We Serve 150+ Countries</h2>
          <img 
            src="https://thumbs.dreamstime.com/b/cargo-ship-containers-harbor-digital-world-map-background-transportation-global-trade-logistic-concept-international-385455363.jpg" 
            alt="Global Trade Network" 
            className="rounded-2xl shadow-2xl mx-auto max-w-full"
          />
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg">
              <p className="italic mb-6">"Best platform for exporting my handmade goods to Europe!"</p>
              <h4 className="font-bold">— Ayesha, Bangladesh</h4>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg">
              <p className="italic mb-6">"Imported high-quality electronics at unbeatable prices."</p>
              <h4 className="font-bold">— John, USA</h4>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg">
              <p className="italic mb-6">"Support team helped me with customs clearance. Amazing!"</p>
              <h4 className="font-bold">— Maria, Brazil</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Newsletter */}
      <section className="py-20 bg-blue-600 text-white">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
    <p className="text-xl mb-8">
      Get latest products, trade tips & exclusive deals
    </p>

    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Your email"
        className="px-6 py-4 rounded-xl bg-white text-gray-900 border border-white/40 focus:border-white focus:ring-2 focus:ring-amber-400 flex-1 placeholder-gray-500"
        required
      />

      <button
        type="submit"
        className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl"
      >
        Subscribe
      </button>
    </form>
  </div>
</section>


      {/* 10. FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {["Is registration free?", "How secure are payments?", "Do you handle shipping?", "Can I import to any country?"].map((q, i) => (
              <details key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <summary className="font-bold text-lg cursor-pointer">{q}</summary>
                <p className="mt-4">Yes, registration is completely free. We offer verified accounts for added trust.</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-700 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8">Ready to Start Trading Globally?</h2>
          <p className="text-2xl mb-10">Join thousands of traders today</p>
          <Link to="/register" className="px-12 py-6 bg-white text-blue-700 font-bold text-xl rounded-xl hover:bg-gray-100 transition transform hover:scale-105 shadow-2xl inline-block">
            Get Started Free
          </Link>
        </div>
      </section>

      
    </>
  );
};

export default Home;