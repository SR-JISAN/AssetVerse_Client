import React from 'react';
import { motion } from "framer-motion";

const Payment = () => {
    const packages = [
      {
        name: "Basic",
        employeeLimit: 5,
        price: 5,
        features: [
            "Employee Management",
            "Asset Tracking", 
            "Basic Support"
        ],
      },
      {
        name: "Standard",
        employeeLimit: 10,
        price: 8,
        features: [
          "Advanced Analytics",
          "All Basic features",
          "Priority Support",
        ],
      },
      {
        name: "Premium",
        employeeLimit: 20,
        price: 15,
        features: ["All Standard features", "Custom Branding", "24/7 Support"],
      },
    ];
    return (
      <div className="bg-gray-50 rounded-2xl">
        <section className="py-20 mw">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Choose Your Package
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              Flexible packages to suit businesses of any size. Pick the one
              that fits your team best.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col"
                >
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 mb-4">
                    Employees: {pkg.employeeLimit}
                  </p>
                  <p className="text-blue-600 text-3xl font-bold mb-6">
                    ${pkg.price}/Month
                  </p>

                  <ul className="text-gray-600 mb-6 space-y-2 flex-1">
                    {pkg.features.map((feature, i) => (
                      <li
                        key={i}
                        className="before:content-['✔'] before:text-blue-600 before:mr-2"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
};

export default Payment;