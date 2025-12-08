import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const MainLayout = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="w-11/12 mx-auto flex-grow py-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
