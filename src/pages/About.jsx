import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | ImportWave - Global Trade Hub</title>
        <meta
          name="description"
          content="Learn about ImportWave – the fastest-growing platform connecting exporters and importers worldwide with secure transactions and global reach."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              About ImportWave
            </h1>
            <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              Connecting global traders with trust, speed, and simplicity
            </p>
          </div>

          <section className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                At ImportWave, we believe international trade should be accessible to everyone – from small businesses to large enterprises. 
                Our mission is to eliminate barriers in global commerce by providing a secure, transparent, and efficient platform for exporters and importers worldwide.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Founded in 2024, we've grown rapidly by focusing on what matters most: verified users, secure payments, real-time tracking, and exceptional customer support.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-emerald-600 rounded-3xl shadow-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-6">Why Choose ImportWave?</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-4">
                  <span className="text-3xl">✅</span>
                  Verified traders only
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-3xl">🔒</span>
                  Escrow-protected payments
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-3xl">🚀</span>
                  Fast global shipping partners
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-3xl">🌍</span>
                  Serving 150+ countries
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Key Features</h2>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 text-center hover:shadow-3xl transition">
                <div className="text-6xl mb-6">📦</div>
                <h3 className="text-2xl font-bold mb-4">One-Click Import</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Import any product with just one click. Quantity validation and instant stock update.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 text-center hover:shadow-3xl transition">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold mb-4">Advanced Search & Filters</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Find exactly what you need with country, price range, rating, and keyword filters.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 text-center hover:shadow-3xl transition">
                <div className="text-6xl mb-6">🛡️</div>
                <h3 className="text-2xl font-bold mb-4">Secure & Transparent</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All transactions protected. Real-time updates on your exports and imports.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl shadow-2xl p-16 text-white text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-12">Trusted by Traders Worldwide</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div>
                <p className="text-6xl font-extrabold">150+</p>
                <p className="text-2xl mt-4">Countries Served</p>
              </div>

              <div>
                <p className="text-6xl font-extrabold">50K+</p>
                <p className="text-2xl mt-4">Active Traders</p>
              </div>

              <div>
                <p className="text-6xl font-extrabold">1M+</p>
                <p className="text-2xl mt-4">Successful Trades</p>
              </div>

              <div>
                <p className="text-6xl font-extrabold">24/7</p>
                <p className="text-2xl mt-4">Customer Support</p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Our Team</h2>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { name: "Sarah Chen", role: "CEO & Founder", desc: "15+ years in international trade" },
                { name: "Ahmed Rahman", role: "CTO", desc: "Full-stack engineer & blockchain expert" },
                { name: "Maria Gonzalez", role: "Head of Operations", desc: "Logistics specialist with global network" },
              ].map((member) => (
                <div
                  key={member.name}
                  className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 text-center hover:shadow-3xl transition"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full mx-auto mb-6 shadow-xl" />
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400">{member.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Trade Globally?
            </h2>

            <p className="text-2xl text-white mb-10 opacity-90">
              Join thousands of traders already using ImportWave
            </p>

            <Link
              to="/register"
              className="inline-block px-12 py-6 bg-white text-blue-600 font-bold text-2xl rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition transform"
            >
              Start Free Today
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
