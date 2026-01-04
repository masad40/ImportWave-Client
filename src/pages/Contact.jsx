import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Thank you! Your message has been sent. We'll reply soon 📧");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | ImportWave</title>
        <meta
          name="description"
          content="Get in touch with ImportWave team. We're here to help with any questions about trading, accounts, or partnerships."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16 md:mb-20">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              Have questions? We're here to help you trade globally with confidence
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 mb-16 md:mb-24">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full text-lg py-4"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full text-lg py-4"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full text-lg py-4"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="textarea textarea-bordered w-full text-lg py-4"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 md:py-6 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-lg md:text-xl rounded-2xl shadow-2xl transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="text-2xl">➤</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
                Contact Information
              </h2>

              <div className="space-y-6 md:space-y-8">
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 md:p-8 flex items-center gap-6 border border-gray-200 dark:border-gray-700">
                  <div className="text-4xl md:text-5xl">📧</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Email Us</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400">support@importwave.com</p>
                    <p className="text-sm text-gray-500 mt-1">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 md:p-8 flex items-center gap-6 border border-gray-200 dark:border-gray-700">
                  <div className="text-4xl md:text-5xl">📞</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Call Us</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">Mon–Fri, 9AM–6PM UTC</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 md:p-8 flex items-center gap-6 border border-gray-200 dark:border-gray-700">
                  <div className="text-4xl md:text-5xl">📍</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Office</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400">Dhaka, Bangladesh</p>
                    <p className="text-sm text-gray-500 mt-1">Global operations, local support</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 md:mt-12">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Follow Us</h3>
                <div className="flex gap-4 md:gap-6">
                  <a className="btn btn-circle btn-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl">f</a>
                  <a className="btn btn-circle btn-lg bg-sky-500 hover:bg-sky-600 text-white shadow-xl">🐦</a>
                  <a className="btn btn-circle btn-lg bg-pink-600 hover:bg-pink-700 text-white shadow-xl">📸</a>
                  <a className="btn btn-circle btn-lg bg-blue-800 hover:bg-blue-900 text-white shadow-xl">💼</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
              Our Location
            </h2>
            <div className="rounded-3xl overflow-hidden shadow-2xl h-80 md:h-96 border border-gray-200 dark:border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.877164914398!2d90.393370614957!3d23.750726994577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7a55cd36f%3A0xf9c9c4c4a9c4f4c4!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ImportWave Location"
              ></iframe>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {[
                { q: "How do I start exporting?", a: "Register, go to Dashboard → Add Export, fill product details and submit." },
                { q: "Is there any fee to join?", a: "No! Registration and listing products is completely free." },
                { q: "How are payments secured?", a: "We use escrow protection – funds are released only after delivery confirmation." },
                { q: "Can I import to any country?", a: "Yes! We support shipping to 150+ countries with trusted logistics partners." },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700"
                >
                  <summary className="text-lg md:text-xl font-bold cursor-pointer flex justify-between items-center">
                    {faq.q}
                    <span className="text-2xl">+</span>
                  </summary>
                  <p className="mt-4 md:mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contact;
