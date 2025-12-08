import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"; 
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser, updateProfileInfo } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handelRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const photoUrl = event.target.photoURL.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must include at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must include at least one lowercase letter");
      return;
    }

    setError("");

    createUser(email, password)
      .then(() => {
        updateProfileInfo(name, photoUrl)
          .then(() => {
            toast.success("Profile updated successfully!");
          })
          .catch((err) => {
            console.error("Profile update error:", err);
            toast.error("Profile update failed!");
          });

        event.target.reset();
        toast.success("Registered Successfully!");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="hero min-h-screen my-10 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <Helmet>
        <title>Register - ImportWave</title>
      </Helmet>
      <div className="card w-full max-w-md shadow-2xl bg-white dark:bg-gray-800 transition-colors duration-500">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
            Create Account
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Join GameHub and start your journey
          </p>
          <form onSubmit={handelRegister} className="space-y-4">           
            <div>
              <label className="label font-medium text-gray-900 dark:text-gray-200">User Name</label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="label font-medium text-gray-900 dark:text-gray-200">Photo URL</label>
              <input
                name="photoURL"
                type="text"
                className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded"
                placeholder="Enter photo URL"
              />
            </div>
            <div>
              <label className="label font-medium text-gray-900 dark:text-gray-200">Email</label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded"
                placeholder="Enter your email"
                required
              />
            </div>        
            <div>
              <label className="label font-medium text-gray-900 dark:text-gray-200">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              Already have an account?{" "}
              <Link className="text-blue-500 link link-hover" to={"/login"}>
                Login
              </Link>
            </p>
            <button className="btn btn-neutral w-full mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-colors duration-300">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
