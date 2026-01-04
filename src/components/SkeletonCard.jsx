const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <div className="h-64 bg-gray-300 dark:bg-gray-700"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded mt-6"></div>
    </div>
  </div>
);

export default SkeletonCard;