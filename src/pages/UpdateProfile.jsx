import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { user, updateProfileInfo } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfileInfo(name, photoURL)
      .then(() => {
        toast.success("Profile updated successfully!");
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update profile!");
      });
  };
  return (
    <div className="hero min-h-screen my-10 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <Helmet>
        <title>Update Profile - ImportWave</title>
      </Helmet>
      <div className="card w-full max-w-md shadow-2xl bg-white dark:bg-gray-900 rounded-xl">
        <div className="card-body p-8">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
            Update Profile
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Keep your profile up to date
          </p>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="label font-medium text-gray-800 dark:text-gray-200">
                Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="label font-medium text-gray-800 dark:text-gray-200">
                Photo URL
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Enter photo URL"
              />
            </div>
            <button
              type="submit"
              className="btn btn-success w-full mt-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md transition duration-300"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
