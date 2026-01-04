import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase/firebaseConfig";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in existing user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign In
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update profile (name + photoURL)
  const updateProfileInfo = (name, photoURL) => {
    if (!auth.currentUser) {
      return Promise.reject(new Error("No user is currently logged in"));
    }

    return updateProfile(auth.currentUser, {
      displayName: name || auth.currentUser.displayName,
      photoURL: photoURL || auth.currentUser.photoURL,
    }).then(() => {
      // Force refresh user state
      setUser({ ...auth.currentUser });
    });
  };

  // Reset password
  const resetPassword = (email) => {
    if (!email || !email.trim()) {
      return Promise.reject(new Error("Valid email is required"));
    }
    setLoading(true);
    return sendPasswordResetEmail(auth, email.trim());
  };

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Auth info to provide
  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    googleLogin,
    logOut,
    updateProfileInfo,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;