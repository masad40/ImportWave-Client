import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import AddExport from "../pages/AddExport";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyProfile from "../pages/MyProfile";
import ProductDetails from "../pages/ProductDetails";   
import MyImports from "../pages/MyImports";
import MyExports from "../pages/MyExports";
import UpdateProfile from "../pages/UpdateProfile";
import PrivateRoute from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/allProducts",
        element: (
          <PrivateRoute>
            <AllProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/addExport",
        element: (
          <PrivateRoute>
            <AddExport />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/myProfile", element: <MyProfile /> },

      {
        path: "/productDetails/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/myImport",
        element: (
          <PrivateRoute>
            <MyImports />
          </PrivateRoute>
        ),
      },
      {
        path: "/myExport",
        element: (
          <PrivateRoute>
            <MyExports />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateProfile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
