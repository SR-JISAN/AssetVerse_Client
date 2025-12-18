import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useNavigate } from 'react-router';


const NFPage = () => {
  const navigate =useNavigate()
    
    return (
      <div>
        <section className="flex items-center justify-center h-screen bg-gray-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
        
            <AlertCircle className="w-16 h-16 mx-auto text-blue-600 mb-6" />
            <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">
              404
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Oops! The page you are looking for does not exist.
            </p>

          
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition-colors"
            >
              Go Back Home
            </motion.button>
          </motion.div>
        </section>
      </div>
    );
};

export default NFPage;