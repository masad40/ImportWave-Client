import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Register = () => {
  const { createUser, updateProfileInfo, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (pass) => {
    if (pass.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(pass)) return "Must contain an uppercase letter";
    if (!/[a-z]/.test(pass)) return "Must contain a lowercase letter";
    return "";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handlePhotoChange = (e) => {
    const url = e.target.value.trim();
    setPhotoURL(url);
    setPhotoPreview(url);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Invalid email format");
    if (passwordError) return toast.error(passwordError);

    setLoading(true);

    try {
      const userCredential = await createUser(email, password);
      await updateProfileInfo(name.trim(), photoURL || null);

      toast.success("Account created successfully! Welcome to ImportWave 🎉");
      
      setName("");
      setEmail("");
      setPassword("");
      setPhotoURL("");
      setPhotoPreview("");
      setPasswordError("");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Signed in with Google! Welcome 🎉");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Google sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | ImportWave - Join Global Marketplace</title>
        <meta
          name="description"
          content="Create your free account on ImportWave and start importing/exporting products worldwide."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Join ImportWave
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Start trading globally in minutes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Registration Form */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold mb-8 text-center">Create Your Account</h2>

              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="input input-bordered w-full text-lg py-4"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input input-bordered w-full text-lg py-4"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
                      className="input input-bordered w-full text-lg py-4 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-600 dark:text-gray-400"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                  {password && !passwordError && password.length >= 6 && (
                    <p className="text-green-600 text-sm mt-2">✓ Strong password</p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Profile Photo URL (Optional)</label>
                  <input
                    type="url"
                    value={photoURL}
                    onChange={handlePhotoChange}
                    placeholder="https://example.com/your-photo.jpg"
                    className="input input-bordered w-full text-lg py-4"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Paste a direct image link for your avatar
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || passwordError}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-xl rounded-2xl shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-8">
                <div className="divider text-gray-500 dark:text-gray-400">OR</div>

                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full mt-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 text-gray-800 dark:text-gray-200 font-bold text-lg rounded-2xl shadow-lg transition flex items-center justify-center gap-4 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <FaGoogle className="text-xl text-red-500" />
                  )}
                  Continue with Google
                </button>
              </div>

              <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-bold">
                  Login here
                </Link>
              </p>
            </div>

            <div className="order-first lg:order-last">
              <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">Your Profile Preview</h3>
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
                <div className="relative inline-block mb-8">
                  <img
                    src={
                      photoPreview ||
                      "https://i.ibb.co/Q3LYhjtx/pngtree-user-icon-png-image-1796659.jpg"
                    }
                    alt="Profile preview"
                    className="w-48 h-48 rounded-full object-cover border-8 border-gray-200 dark:border-gray-800 shadow-2xl"
                    onError={(e) => {
                      e.target.src = "https://i.ibb.co/Q3LYhjtx/pngtree-user-icon-png-image-1796659.jpg";
                    }}
                  />
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-green-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                </div>

                <h2 className="text-3xl font-bold mb-3">
                  {name || "Your Name"}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                  {email || "your@email.com"}
                </p>

                <div className="p-6 bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 rounded-2xl">
                  <p className="text-lg font-medium">Ready to trade globally!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;