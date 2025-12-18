import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Clipboard, Zap, BarChart2 } from "lucide-react";

const steps = [
  {
    icon: <Clipboard size={40} color="#155dfc" className="mb-6" />,
    title: "Step 1: Add Assets",
    description:
      "Easily upload and organize your digital assets into AssetVerse.",
  },
  {
    icon: <Zap size={40} color="#155dfc" className="mb-6" />,
    title: "Step 2: Automate Workflows",
    description:
      "Set up automation to manage, track, and process assets efficiently.",
  },
  {
    icon: <BarChart2 size={40} color="#155dfc" className="mb-6" />,
    title: "Step 3: Gain Insights",
    description:
      "Analyze performance and usage to make informed business decisions.",
  },
];

const HowItWorks = () => {
    return (
      <div className='mw'>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold mb-12"
            >
              How It Works
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center"
                >
                  {step.icon}
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
};

export default HowItWorks;