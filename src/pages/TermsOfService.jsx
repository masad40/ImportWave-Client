import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | ImportWave</title>
        <meta
          name="description"
          content="ImportWave Terms of Service. Read the rules and guidelines for using our global trading platform."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Last updated: January 04, 2026
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
              Please read these Terms carefully before using ImportWave
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 md:p-16 border border-gray-200 dark:border-gray-700">
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
              {/* Acceptance of Terms */}
              <section>
                <h2 className="text-3xl font-bold mb-6">1. Acceptance of Terms</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  By accessing or using ImportWave ("the Platform"), you agree to be bound by these Terms of Service ("Terms"), 
                  all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  If you do not agree with any of these Terms, you are prohibited from using or accessing this Platform.
                </p>
              </section>

              {/* Use of the Platform */}
              <section>
                <h2 className="text-3xl font-bold mb-6">2. Use of the Platform</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  ImportWave provides a marketplace for exporters and importers to connect and conduct international trade.
                </p>
                <ul className="list-disc pl-8 mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>You may use the Platform only for lawful purposes and in accordance with these Terms</li>
                  <li>You agree not to use the Platform to list prohibited items or engage in illegal activities</li>
                  <li>You are responsible for all content you post, including product listings and messages</li>
                  <li>We reserve the right to remove any content or suspend accounts for violations</li>
                </ul>
              </section>

              {/* User Accounts */}
              <section>
                <h2 className="text-3xl font-bold mb-6">3. User Accounts</h2>
                <ul className="list-disc pl-8 mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>You must register to list products or import items</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You must provide accurate and complete information</li>
                  <li>You may not use another person's account without permission</li>
                  <li>We reserve the right to terminate accounts for violations of these Terms</li>
                </ul>
              </section>

              {/* Transactions */}
              <section>
                <h2 className="text-3xl font-bold mb-6">4. Transactions</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  ImportWave facilitates connections between traders but is not a party to any transaction.
                </p>
                <ul className="list-disc pl-8 mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>All transactions are between buyers and sellers directly</li>
                  <li>We use escrow protection for payments where available</li>
                  <li>You are responsible for shipping, customs, and compliance with international trade laws</li>
                  <li>We are not liable for product quality, delivery delays, or disputes</li>
                </ul>
              </section>

              {/* Prohibited Activities */}
              <section>
                <h2 className="text-3xl font-bold mb-6">5. Prohibited Activities</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You agree not to:
                </p>
                <ul className="list-disc pl-8 mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>List prohibited or illegal items</li>
                  <li>Engage in fraudulent activities</li>
                  <li>Spam or harass other users</li>
                  <li>Attempt to bypass platform fees or security measures</li>
                  <li>Use automated systems to access the Platform</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-3xl font-bold mb-6">6. Intellectual Property</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  The Platform and its original content, features, and functionality are owned by ImportWave and protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  You retain ownership of content you post but grant us a worldwide, royalty-free license to use, display, and distribute it on the Platform.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-3xl font-bold mb-6">7. Limitation of Liability</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  ImportWave is provided "as is" without warranties of any kind. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Platform.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-3xl font-bold mb-6">8. Termination</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-3xl font-bold mb-6">9. Changes to Terms</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or platform announcement.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Continued use of the Platform after changes constitutes acceptance of the new Terms.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-3xl font-bold mb-6">10. Contact Us</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <ul className="list-disc pl-8 mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Email: legal@importwave.com</li>
                  <li>Address: Dhaka, Bangladesh</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;