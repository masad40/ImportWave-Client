import { createBrowserRouter, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import Explore from "../pages/Explore";          
import ProductDetails from "../pages/ProductDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";                  
import MyExports from "../pages/MyExports";
import MyImports from "../pages/MyImports";
import AddExport from "../pages/AddExport";
import MyProfile from "../pages/MyProfile";
import UpdateProfile from "../pages/UpdateProfile";
import AllProduct from "../pages/AllProducts"

import PrivateRoute from "../routes/PrivateRoutes";  
import DashboardHome from "../pages/DashboardHome";

export const router = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "explore", element: <Explore /> },                   
      { path: "productDetails/:id", element:<PrivateRoute> <ProductDetails /></PrivateRoute> },  
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy", element: <PrivacyPolicy /> },
      { path: "terms", element: <TermsOfService /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
     
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },              
      { path: "myExport", element: <MyExports /> },
      { path: "myImport", element: <MyImports /> },
      { path: "addExport", element: <AddExport /> },
      { path: "profile", element: <MyProfile /> },
      { path: "updateProfile", element: <UpdateProfile /> },
      {path: "allProduct", element:<AllProduct></AllProduct> }
    ],
  },

  {
    path: "*",
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">Page Not Found</p>
          <Link to="/" className="btn btn-primary text-lg">
            Go Home
          </Link>
        </div>
      </div>
    ),
  },
]);