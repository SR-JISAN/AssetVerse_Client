import React from 'react';
import { Rocket, Shield, Users, BarChart2 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <Rocket size={40} color="#155dfc" className="mb-6" />,
    title: "Fast & Efficient",
    description:
      "Streamline your asset management and save valuable time with AssetVerse.",
  },
  {
    icon: <Shield size={40} color="#155dfc" className="mb-6" />,
    title: "Secure & Reliable",
    description:
      "Your data is protected with top-notch security standards and reliable storage.",
  },
  {
    icon: <Users size={40} color="#155dfc" className="mb-6" />,
    title: "Collaborative",
    description:
      "Easily manage and share assets across your team with full control.",
  },
  {
    icon: <BarChart2 size={40} color="#155dfc" className="mb-6" />,
    title: "Data-Driven Insights",
    description:
      "Gain actionable insights with analytics and reporting features.",
  },
];

const About = () => {
    return (
 <div className='mw'>
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
       
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Why Choose AssetVerse?
        </motion.h2>

        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          AssetVerse provides innovative solutions to manage your digital assets efficiently, securely, and collaboratively.
        </motion.p>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="flex flex-col items-center">
                {benefit.icon}
                <h3 className="text-xl font-semibold mb-2 text-center">{benefit.title}</h3>
                <p className="text-gray-600 text-center">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
        </div>
    );
};

export default About;