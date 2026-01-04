import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import SkeletonCard from "../components/SkeletonCard";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const baseUrl = import.meta.env.VITE_API_URL || "https://import-export-server-sigma.vercel.app";

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [importQty, setImportQty] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productRes, allRes] = await Promise.all([
          fetch(`${baseUrl}/product/${id}`),
          fetch(`${baseUrl}/products`),
        ]);

        if (!productRes.ok) throw new Error("Product not found");
        const productData = await productRes.json();
        const allProducts = await allRes.json();

        if (mounted) {
          setProduct(productData);
          setSelectedImage(productData.image);
          const related = allProducts
            .filter((p) => p._id !== id && p.country === productData.country)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

          if (related.length < 4) {
            const extra = allProducts
              .filter((p) => p._id !== id && p.country !== productData.country)
              .sort(() => 0.5 - Math.random())
              .slice(0, 4 - related.length);
            setRelatedProducts([...related, ...extra]);
          } else {
            setRelatedProducts(related);
          }
        }
      } catch (err) {
        console.error(err);
        if (mounted) setProduct(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => (mounted = false);
  }, [id, baseUrl]);

  const isDisabled = !importQty || Number(importQty) <= 0 || Number(importQty) > (product?.quantity || 0);

  const handleImport = async () => {
    if (!user) {
      toast.error("Please login to import products");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/import-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          userEmail: user.email,
          quantity: Number(importQty),
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(`Successfully imported ${importQty} unit(s)! 🎉`);
        setProduct((prev) => ({ ...prev, quantity: prev.quantity - Number(importQty) }));
        setModalOpen(false);
        setImportQty("");
      } else {
        toast.error(result.message || "Import failed");
      }
    } catch (err) {
      toast.error("Error during import");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <SkeletonCard />
          <div className="space-y-8">
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-2xl w-3/4"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-xl w-1/2"></div>
            <div className="space-y-4">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-red-600 mb-4">Product Not Found</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">The product you're looking for doesn't exist.</p>
          <Link to="/allProducts" className="mt-8 inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | ImportWave</title>
        <meta
          name="description"
          content={`Import ${product.name} from ${product.country}. Premium quality at $${product.price}. Rating: ${product.rating} stars.`}
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image Section */}
          <div className="order-2 lg:order-1">
            {/* Main Image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl mb-8 bg-white dark:bg-gray-900 p-4">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-96 md:h-[500px] object-contain rounded-2xl bg-gray-50 dark:bg-gray-800"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 opacity-50 pointer-events-none">
            </div>
          </div>

          {/* Right: Details */}
          <div className="order-1 lg:order-2">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Price & Discount */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-5xl font-extrabold text-emerald-600">${product.price}</span>
              <span className="text-3xl text-gray-500 line-through">${(product.price * 1.25).toFixed(2)}</span>
              <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg">
                20% OFF
              </span>
            </div>

            {/* Specs */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 mb-10 border border-gray-200 dark:border-gray-700">
              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Origin Country</span>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <span className="text-2xl">🌍</span> {product.country}
                  </span>
                </div>

                <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Customer Rating</span>
                  <span className="flex items-center gap-2 text-xl">
                    {"⭐".repeat(Math.round(product.rating))}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">({product.rating}/5)</span>
                  </span>
                </div>

                <div className="flex justify-between items-center py-4">
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Available Stock</span>
                  <span className={`text-2xl font-bold ${product.quantity < 10 ? "text-red-600 animate-pulse" : "text-emerald-600"}`}>
                    {product.quantity} units
                  </span>
                </div>

                {product.quantity < 10 && product.quantity > 0 && (
                  <p className="text-center text-red-600 dark:text-red-400 font-bold text-lg mt-4">
                    ⚠️ Only {product.quantity} left – Hurry!
                  </p>
                )}
              </div>
            </div>

            {/* Import Button */}
            <button
              onClick={() => setModalOpen(true)}
              disabled={product.quantity === 0}
              className={`w-full py-6 text-2xl font-bold rounded-3xl shadow-2xl transition-all duration-500 transform ${
                product.quantity === 0
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-3xl"
              }`}
            >
              {product.quantity === 0 ? "🚫 Out of Stock" : "🛒 Import This Product Now"}
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-32">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
              Related Products from Around the World
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {relatedProducts.map((rel) => (
                <Link to={`/productDetails/${rel._id}`} key={rel._id} className="group block">
                  <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transform group-hover:-translate-y-6 group-hover:shadow-3xl transition-all duration-500">
                    <div className="relative overflow-hidden">
                      <img
                        src={rel.image}
                        alt={rel.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {rel.country}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">{rel.name}</h3>
                      <p className="text-3xl font-extrabold text-emerald-600 mb-2">${rel.price}</p>
                      <p className="flex items-center gap-1 text-yellow-500">
                        {"⭐".repeat(Math.round(rel.rating))} <span className="text-gray-600 text-sm">({rel.rating})</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Import Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 max-w-lg w-full shadow-3xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-4xl font-extrabold text-center mb-8">Import Quantity</h2>

              <div className="mb-8">
                <label className="block text-xl font-medium mb-4 text-center">How many units do you want?</label>
                <input
                  type="number"
                  value={importQty}
                  onChange={(e) => setImportQty(e.target.value)}
                  min="1"
                  max={product.quantity}
                  placeholder="1"
                  className="input input-bordered w-full text-3xl py-8 text-center font-bold"
                />
                {Number(importQty) > product.quantity && (
                  <p className="text-red-600 dark:text-red-400 text-center mt-4 text-lg font-bold">
                    ⚠️ Only {product.quantity} units available!
                  </p>
                )}
                {Number(importQty) > 0 && Number(importQty) <= product.quantity && (
                  <p className="text-green-600 text-center mt-4 text-xl font-bold">
                    ✓ Valid quantity
                  </p>
                )}
              </div>

              <div className="flex gap-6">
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setImportQty("");
                  }}
                  className="flex-1 py-5 border-2 border-gray-400 dark:border-gray-600 hover:border-gray-600 rounded-2xl font-bold text-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={isDisabled}
                  className={`flex-1 py-5 rounded-2xl font-bold text-xl transition shadow-xl ${
                    isDisabled
                      ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white"
                  }`}
                >
                  Confirm Import
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;