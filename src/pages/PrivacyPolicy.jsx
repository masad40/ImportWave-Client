import React from "react";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | ImportWave</title>
        <meta
          name="description"
          content="Read ImportWave's Privacy Policy. We are committed to protecting your personal information and your right to privacy."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
              Last updated: January 04, 2026
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 md:p-16 border border-gray-200 dark:border-gray-700">
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
              {/* Introduction */}
              <section>
                <h2 className="text-3xl font-bold mb-6">1. Introduction</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Welcome to ImportWave ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  By using ImportWave, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-3xl font-bold mb-6">2. Information We Collect</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We may collect the following types of information:
                </p>
                <ul className="list-disc pl-8 mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Personal Information:</strong> Name, email address, profile photo, and any information you provide when creating an account.
                  </li>
                  <li>
                    <strong>Trading Information:</strong> Product listings, import/export history, and transaction details.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on pages, and other diagnostic data.
                  </li>
                  <li>
                    <strong>Cookies:</strong> We use cookies to improve your experience. You can instruct your browser to refuse cookies.
                  </li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-3xl font-bold mb-6">3. How We Use Your Information</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc pl-8 mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>To provide and maintain our service</li>
                  <li>To notify you about changes to our service</li>
                  <li>To allow you to participate in interactive features</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our service</li>
                  <li>To monitor the usage of our service</li>
                  <li>To detect, prevent, and address technical issues</li>
                  <li>To facilitate secure transactions between traders</li>
                </ul>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-3xl font-bold mb-6">4. Data Security</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  The security of your data is important to us. We use commercially acceptable means to protect your personal information, 
                  including encryption, secure servers, and regular security assessments.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use 
                  commercially acceptable means to protect your data, we cannot guarantee its absolute security.
                </p>
              </section>

              {/* Third-Party Services */}
              <section>
                <h2 className="text-3xl font-bold mb-6">5. Third-Party Services</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We may employ third-party companies and individuals to facilitate our service ("Service Providers"), provide the service on our behalf, 
                  perform service-related services, or assist us in analyzing how our service is used.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-3xl font-bold mb-6">6. Children's Privacy</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
                </p>
              </section>

              {/* Changes to Policy */}
              <section>
                <h2 className="text-3xl font-bold mb-6">7. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  You are advised to review this Privacy Policy periodically for any changes. Changes are effective when they are posted on this page.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-3xl font-bold mb-6">8. Contact Us</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="list-disc pl-8 mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Email: privacy@importwave.com</li>
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

export default PrivacyPolicy;