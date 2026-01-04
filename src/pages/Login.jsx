import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signInUser, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signInUser(email, password);
      toast.success("Login successful! Welcome back 🎉");
      e.target.reset();
      navigate("/"); 
    } catch (err) {
      const message =
        err.code === "auth/user-not-found" || err.code === "auth/wrong-password"
          ? "Invalid email or password"
          : "Login failed. Please try again.";
      setError(message);
      toast.error(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await googleLogin();
      toast.success(`Welcome back, ${result.user.displayName || "Trader"}! 🎉`);
      navigate("/");
    } catch (err) {
      toast.error("Google login failed");
      setError("Google sign in failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | ImportWave - Access Your Global Trade Hub</title>
        <meta
          name="description"
          content="Log in to your ImportWave account and manage your international trade seamlessly."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Log in to continue your global trading journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Login Form */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold mb-8 text-center">Sign In to Your Account</h2>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="input input-bordered w-full text-lg py-4"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className="input input-bordered w-full text-lg py-4 pr-12"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      disabled={loading}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="alert alert-error shadow-lg py-3 rounded-xl">
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-xl rounded-2xl shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Signing In...
                    </>
                  ) : (
                    "Log In"
                  )}
                </button>
              </form>

              <div className="mt-8">
                <div className="divider text-gray-500 dark:text-gray-400">OR</div>

                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full mt-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 text-gray-800 dark:text-gray-200 font-bold text-lg rounded-2xl shadow-lg transition flex items-center justify-center gap-4 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <FcGoogle className="text-2xl" />
                  )}
                  Continue with Google
                </button>
              </div>

              <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
                New to ImportWave?{" "}
                <Link to="/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-bold">
                  Create an account
                </Link>
              </p>
            </div>

            {/* Visual Side */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-blue-600/10 to-emerald-600/10 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-3xl p-12 text-center border border-gray-200 dark:border-gray-700">
                <div className="mb-10">
                  <div className="text-9xl mb-6">🌍</div>
                  <h3 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    Access Your Global Marketplace
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Connect with suppliers, manage imports, track shipments — all in one powerful dashboard.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-12 text-center">
                  <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur rounded-2xl p-6">
                    <div className="text-4xl mb-2">📦</div>
                    <p className="font-semibold">Import Products</p>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur rounded-2xl p-6">
                    <div className="text-4xl mb-2">🚢</div>
                    <p className="font-semibold">Track Shipments</p>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur rounded-2xl p-6">
                    <div className="text-4xl mb-2">💼</div>
                    <p className="font-semibold">Manage Suppliers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;