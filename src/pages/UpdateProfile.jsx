import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { user, updateProfileInfo } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [photoPreview, setPhotoPreview] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handlePhotoChange = (e) => {
    const url = e.target.value;
    setPhotoURL(url);
    setPhotoPreview(url || user?.photoURL || null);
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (photoURL && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)/i.test(photoURL)) {
      newErrors.photoURL = "Please enter a valid image URL";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors");
      return;
    }

    setLoading(true);

    try {
      await updateProfileInfo(name.trim(), photoURL.trim() || null);
      toast.success("Profile updated successfully! 🎉");
      setTimeout(() => {
        window.history.back(); 
      }, 1000);
    } catch (err) {
      console.error("Profile update failed:", err);
      toast.error("Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Update Profile | ImportWave</title>
        <meta name="description" content="Update your name and profile picture on ImportWave global marketplace." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Update Profile
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Keep your trader identity fresh and professional
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-gray-700">
              <form onSubmit={handleUpdate} className="space-y-8">
                <div>
                  <label className="block text-lg font-medium mb-3">Display Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="input input-bordered w-full text-lg py-4"
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-lg font-medium mb-3">Profile Photo URL</label>
                  <input
                    type="url"
                    value={photoURL}
                    onChange={handlePhotoChange}
                    placeholder="https://example.com/your-photo.jpg"
                    className="input input-bordered w-full text-lg py-4"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Paste a direct link to your photo (jpg, png, etc.)
                  </p>
                  {errors.photoURL && <p className="text-red-500 text-sm mt-2">{errors.photoURL}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-xl rounded-2xl shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button
                  onClick={() => window.history.back()}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                >
                  ← Cancel and go back
                </button>
              </div>
            </div>

            {/* Live Preview */}
            <div className="order-first lg:order-last">
              <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">Live Preview</h3>
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
                <div className="relative inline-block mb-6">
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

                <h2 className="text-3xl font-bold mb-2">
                  {name || user?.displayName || "Your Name"}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">{user?.email}</p>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 rounded-2xl">
                  <p className="text-lg font-medium">This is how others will see you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;