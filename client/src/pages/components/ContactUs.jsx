import { motion } from "framer-motion";
import { WhatsApp } from "@mui/icons-material";
import { Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const ContactUs = () => {
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    const dummyData = {
      contact_details: {
        email: "support@faithandfast.com",
        phone: "+91 9999999999",
        whatsapp: "9999999999",
        address: "India",
      },
      social_links: {
        whatsapp_link: "9999999999",
        phone_link: "tel:+919999999999",
        email_link: "mailto:support@faithandfast.com",
      },
      seo_meta: {
        title: "Contact Faith AND Fast | Get in Touch with Us",
        description:
          "Reach out to Faith AND Fast for any inquiries, support, or collaborations. Contact us via phone, email, or WhatsApp.",
      },
    };

    setTimeout(() => {
      setContactData(dummyData);
    }, 500);
  }, []);

  if (!contactData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-all duration-300">
      <motion.div
        className="max-w-6xl mx-auto py-16 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold text-center mb-4">
          Contact{" "}
          <span className="text-yellow-500 dark:text-red-500">
            Faith AND Fast
          </span>
        </h1>

        <motion.p
          className="text-lg text-center max-w-2xl mx-auto mb-10 text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Have questions or need assistance? We&apos;re here to help! Reach out
          through any of the channels below.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Our Contact Details
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p className="flex items-center text-lg">
                <Mail className="w-6 h-6 text-yellow-500 dark:text-red-500 mr-3" />
                <span>{contactData.contact_details.email}</span>
              </p>
              <a
                className="flex items-center text-lg hover:text-yellow-500 dark:hover:text-red-500 transition"
                href="tel:+919999999999"
              >
                <Phone className="w-6 h-6 text-yellow-500 dark:text-red-500 mr-3" />
                <span>{contactData.contact_details.phone}</span>
              </a>
              <a
                className="flex items-center text-lg hover:text-yellow-500 dark:hover:text-red-500 transition"
                href={`https://wa.me/91${contactData.contact_details.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp className="w-6 h-6 text-yellow-500 dark:text-red-500 mr-3" />
                <span>{contactData.contact_details.whatsapp}</span>
              </a>
              <p className="flex items-center text-lg">
                <MapPin className="w-6 h-6 text-yellow-500 dark:text-red-500 mr-3" />
                <span>{contactData.contact_details.address}</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 dark:focus:ring-red-500 transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 dark:focus:ring-red-500 transition"
              />
              <input
                type="phone"
                placeholder="Your Phone Number"
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 dark:focus:ring-red-500 transition"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 dark:focus:ring-red-500 transition"
              ></textarea>
              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-yellow-500 dark:bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
