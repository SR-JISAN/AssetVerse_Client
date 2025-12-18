import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";


const ContactCTA = () => {
    return (
      <div>
        <section className="py-20 bg-linear-to-r from-blue-900 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Ready to Transform Your Asset Management?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 text-lg md:text-xl"
            >
              Get started with AssetVerse today and streamline your operations.
            </motion.p>
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </motion.button>
          </div>
        </section>
      </div>
    );
};

export default ContactCTA;