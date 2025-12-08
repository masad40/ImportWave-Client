import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const MyExports = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const baseUrl = import.meta.env.VITE_API_URL || "https://import-export-server-sigma.vercel.app";

  const [exportsData, setExportsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!userEmail) return;

    fetch(`${baseUrl}/my-exports/${userEmail}`)
      .then((res) => res.json())
      .then((data) => setExportsData(data))
      .catch((err) => console.error("Error loading exports:", err));
  }, [userEmail]);

  const handleDelete = (id) => {
    fetch(`${baseUrl}/delete-product/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Deleted");
          setExportsData((prev) => prev.filter((item) => item._id !== id));
        }
      });
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedProduct = {
      name: form.name.value,
      price: Number(form.price.value),
      country: form.country.value,
      rating: Number(form.rating.value),
      quantity: Number(form.quantity.value),
      image: form.image.value,
    };

    fetch(`${baseUrl}/update-product/${selectedProduct._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setExportsData((prev) =>
            prev.map((item) =>
              item._id === selectedProduct._id
                ? { ...item, ...updatedProduct }
                : item
            )
          );
          setModalOpen(false);
        }
      });
  };

  return (
    <div className="max-w-6xl my-10 mx-auto px-4 pb-20">

      <Helmet>
        <title>My Exported Products | ExportHub</title>
        <meta
          name="description"
          content="View and manage all the products you have exported. Update or delete your exported items easily."
        />
      </Helmet>

      <h2 className="text-3xl font-bold text-center my-8 text-gray-900 dark:text-gray-100">
        My Exported Products
      </h2>

      {exportsData.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No exported products found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exportsData.map((item) => (
            <div
              key={item._id}
              className="card bg-white dark:bg-gray-900 shadow-lg p-3 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            >
              <figure>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-52 w-full object-cover rounded-lg"
                />
              </figure>

              <div className="card-body text-gray-900 dark:text-gray-100">
                <h2 className="card-title">{item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Origin: {item.country}</p>
                <p>Rating: ⭐ {item.rating}</p>
                <p>Quantity: {item.quantity}</p>

                <div className="flex justify-between mt-4">
                  <button
                    className="btn btn-error text-white"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={() => openUpdateModal(item)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-lg relative border border-gray-300 dark:border-gray-700 transition-colors duration-300">
            <button
              className="absolute top-3 right-3 text-3xl text-red-600 hover:text-red-500 transition-colors duration-300"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              <IoIosCloseCircle />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
              Update Product
            </h2>

            <form onSubmit={handleUpdate} className="grid gap-4">
              <input
                name="name"
                defaultValue={selectedProduct?.name}
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              />

              <input
                name="price"
                type="number"
                defaultValue={selectedProduct?.price}
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              />

              <input
                name="country"
                defaultValue={selectedProduct?.country}
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              />

              <input
                name="rating"
                type="number"
                defaultValue={selectedProduct?.rating}
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              />

              <input
                name="quantity"
                type="number"
                defaultValue={selectedProduct?.quantity}
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              />

              <input
                name="image"
                defaultValue={selectedProduct?.image}
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              />

              <button className="btn btn-success text-white mt-4">
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyExports;
