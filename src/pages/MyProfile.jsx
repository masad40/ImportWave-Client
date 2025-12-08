import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="hero min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-500">
      
      <Helmet>
        <title>My Profile - ImportWave</title>
        <meta
          name="description"
          content="View and manage your GameHub profile, including account information and avatar."
        />
      </Helmet>

      <div className="card w-full max-w-md shadow-2xl bg-white dark:bg-gray-800 rounded-lg transition-colors duration-500">
        <div className="card-body px-8 py-10">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
            My Profile
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Manage your account information
          </p>

          <div className="text-center mb-6">
            <img
              src={
                user?.photoURL ||
                "https://i.ibb.co/Q3LYhjtx/pngtree-user-icon-png-image-1796659.jpg"
              }
              alt="User Avatar"
              className="w-24 h-24 mx-auto rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-md mb-3 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {user?.displayName || "No Name"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
          </div>

          <button
            onClick={() => navigate("/updateProfile")}
            className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300 text-white"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
