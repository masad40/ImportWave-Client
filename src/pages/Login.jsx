import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signInUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInUser(email, password)
      .then(() => {
        setError("");
        event.target.reset();
        navigate("/");
        toast.success("Login successful!");
      })
      .catch((err) => {
        setError("Invalid email or password");
        console.error(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        toast.success(`Welcome, ${result.user.displayName}!`);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google login failed!");
      });
  };

  return (
    <div className="hero min-h-screen my-10 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-500">

     
      <Helmet>
        <title>Login | ImportWave</title>
        <meta name="description" content="Login to your ImportWave account." />
      </Helmet>

      <div className="card w-full max-w-md shadow-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg transition-colors duration-500">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
            Welcome Back
          </h2>
          <p className="text-center font-medium text-gray-600 dark:text-gray-400 mb-6">
            Please login to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label font-medium text-gray-800 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="label font-medium text-gray-800 dark:text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full pr-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="flex justify-between text-sm mt-1">
              <Link
                to="/forgetPassword"
                className="link link-hover text-blue-600 dark:text-blue-400"
              >
                Forgot password?
              </Link>
              <p className="text-gray-700 dark:text-gray-300">
                New here?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 dark:text-blue-400 link link-hover"
                >
                  Register
                </Link>
              </p>
            </div>

            <button className="btn btn-neutral w-full mt-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-700 transition-colors duration-300">
              Login
            </button>

            <div className="divider text-gray-700 dark:text-gray-400">OR</div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-info w-full flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 border-gray-400 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-300"
            >
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
