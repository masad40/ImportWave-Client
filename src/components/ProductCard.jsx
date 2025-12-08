import React from "react";
import { useNavigate } from "react-router-dom";
import { LiaStarHalfAltSolid } from "react-icons/lia";
import { motion } from "framer-motion";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  if (!item) return null;

  const quantity = item.quantity ?? 0;
  const imageSrc = item.image || "https://via.placeholder.com/640x480?text=No+Image";
  const name = item.name || "Untitled product";
  const rating = item.rating ?? 0;
  const price = item.price ?? "N/A";
  const origin = item.origin || item.country || "Unknown";

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${name}`}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/productDetails/${item._id}`)}
      onClick={() => navigate(`/productDetails/${item._id}`)}
      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(168,85,247,0.4)" }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative bg-gradient-to-br from-purple-600/20 via-gray-900/40 to-blue-600/20 
                 p-[2px] rounded-2xl shadow-lg hover:shadow-purple-500/40 transition-all 
                 duration-300 cursor-pointer w-full sm:w-[90%] md:w-[320px] lg:w-[350px] mx-auto
                 dark:from-purple-900/50 dark:via-gray-800/80 dark:to-blue-900/50"
    >
      <div className="bg-base-200 rounded-2xl overflow-hidden dark:bg-gray-900">
        <div className="relative">
          <img
            src={imageSrc}
            alt={name}
            loading="lazy"
            className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-t-2xl" />
          <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-md dark:bg-purple-800">
            {origin}
          </span>
        </div>

        <div className="p-4">
          <h2 className="text-lg md:text-xl font-extrabold text-gray-800 dark:text-gray-100 line-clamp-1">
            {name}
          </h2>
          <p className="text-gray-500 text-sm mt-1 dark:text-gray-400">
            Available: <span className="font-semibold">{quantity} pcs</span>
          </p>
          <div className="flex justify-between items-center mt-4">
            <p className="flex items-center gap-1 text-yellow-400 font-semibold">
              {rating} <LiaStarHalfAltSolid />
            </p>
            <p className="text-blue-500 font-bold text-sm dark:text-blue-400">
              {price === "N/A" ? price : `💲${price}`}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/productDetails/${item._id}`);
            }}
            className="btn btn-primary w-full mt-4"
            aria-label={`See details about ${name}`}
          >
            See Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
