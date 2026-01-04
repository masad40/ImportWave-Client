import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  GlobeAltIcon,
  TruckIcon,
  ShieldCheckIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import {
  FaTwitter,
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Helmet>
        <title>ImportWave — Global Trade Hub</title>
        <meta
          name="description"
          content="ImportWave helps businesses simplify international import and export with trusted partners worldwide."
        />
      </Helmet>

      <footer className="bg-gradient-to-r from-blue-500 to-emerald-500 dark:from-blue-950 dark:to-emerald-950 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <GlobeAltIcon className="h-12 w-12 text-white" />
              <div>
                <h3 className="text-3xl font-black">ImportWave</h3>
                <p className="text-sm opacity-90 -mt-1">Global Trade Hub</p>
              </div>
            </div>

            <p className="text-white/80 leading-relaxed">
              Your trusted platform for seamless international import and export.
              Connecting businesses worldwide since 2024.
            </p>

            <div className="flex gap-5 mt-6 flex-wrap">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-125 transition-transform duration-300"
              >
                <FaTwitter className="h-7 w-7" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-125 transition-transform duration-300"
              >
                <FaFacebookF className="h-7 w-7" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-125 transition-transform duration-300"
              >
                <FaLinkedinIn className="h-7 w-7" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-125 transition-transform duration-300"
              >
                <FaYoutube className="h-7 w-7" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-125 transition-transform duration-300"
              >
                <FaInstagram className="h-7 w-7" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
              <TruckIcon className="h-6 w-6" />
              Quick Links
            </h4>

            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-white/70">Home</Link></li>
              <li><Link to="/explore" className="hover:text-white/70">Explore Products</Link></li>
              <li><Link to="/about" className="hover:text-white/70">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white/70">Contact</Link></li>
              <li><Link to="/dashboard" className="hover:text-white/70">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
              <ShieldCheckIcon className="h-6 w-6" />
              Legal & Support
            </h4>

            <ul className="space-y-4">
              <li><Link to="/privacy" className="hover:text-white/70">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white/70">Terms of Service</Link></li>
              <li><Link to="/shipping" className="hover:text-white/70">Shipping Policy</Link></li>
              <li><Link to="/faq" className="hover:text-white/70">FAQ</Link></li>
              <li><Link to="/support" className="hover:text-white/70">Support Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
              <PhoneIcon className="h-6 w-6" />
              Get in Touch
            </h4>

            <ul className="space-y-4 text-white/80">
              <li className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5" />
                support@importwave.com
              </li>

              <li className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5" />
                +1 (555) 123-4567
              </li>

              <li className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-white/70 text-sm">
            © {currentYear} <span className="font-bold text-white">ImportWave</span>. All rights reserved.
            Empowering global trade, one connection at a time.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
