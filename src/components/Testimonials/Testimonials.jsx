import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Star, StarHalf } from "lucide-react";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "CEO, TechCorp",
    quote:
      "AssetVerse has revolutionized how we manage our digital assets. Our team productivity has skyrocketed!",
  },
  {
    name: "Michael Smith",
    role: "Operations Manager, FinSolutions",
    quote:
      "The platform is intuitive and secure. It’s the best investment for our company.",
  },
  {
    name: "Sophia Lee",
    role: "CTO, CreativeHub",
    quote:
      "Amazing analytics and reporting features! We can now make data-driven decisions efficiently.",
  },
];

const stats = [
  { label: "Companies Trust Us", value: "100+" },
  { label: "Assets Managed", value: "10k+" },
  { label: "Support Tickets Resolved", value: "5k+" },
];

const Testimonials = () => {
    return (
      <div className="bg-blue-50 ">
        <section className="py-20 mw">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl text-blue-950 md:text-4xl font-bold mb-8"
            >
              What Our Clients Say
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col justify-between"
                >
                  <div className="mb-4">
                    <p className="text-gray-700 italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="mt-auto">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-linear-to-r from-blue-950 to-blue-600 text-white p-8 rounded-xl shadow flex flex-col items-center"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <Star size={30} color="#f2f2f2" />
                    <Star size={30} color="#f2f2f2" />
                    <StarHalf size={30} color="#f2f2f2" />
                  </div>

                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
};

export default Testimonials;