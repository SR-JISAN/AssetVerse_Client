import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import bannerImg from "../../assets/banner.avif"

const HeroBanner = () => {
    return (
      <div className=''>
        <section className="relative w-full h-screen bg-gray-100">
          <div className="absolute inset-0">
            <img
              src={bannerImg}
              alt="Corporate Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>{" "}
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Transforming Your Business Digitally
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg md:text-2xl mb-6"
            >
              Innovative solutions that drive growth and efficiency
            </motion.p>
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="bg-linear-to-r from-blue-900 to-blue-600 btn px-6 py-6 border-0 text-white rounded-lg font-semibold text-lg shadow-lg"
            >
              Get Started
            </motion.button>
          </div>
        </section>
      </div>
    );
};

export default HeroBanner;