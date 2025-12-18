import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { DotLoader } from 'react-spinners';


const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      {/* Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-48"
      ></motion.div>

      {/* Text */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-lg flex justify-center items-center gap-2 font-semibold text-gray-700"
      >
        Preparing AssetVerse
        <DotLoader color="#2457cc" />
      </motion.h2>

      {/* Sub text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-2 text-sm text-gray-500"
      >
        Managing assets the smart way
      </motion.p>
    </div>
  );
};

export default Loading;