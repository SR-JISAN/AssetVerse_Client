import React, { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { Users, Shield, BarChart2, Cpu, Settings, Bell } from "lucide-react";

const features = [
  {
    icon: <Users className="w-10 h-10 text-blue-600 mb-4" />,
    title: "Team Collaboration",
    description: "Easily manage and share assets across your entire team.",
  },
  {
    icon: <Shield className="w-10 h-10 text-blue-600 mb-4" />,
    title: "Top Security",
    description:
      "Your data is protected with enterprise-grade security protocols.",
  },
  {
    icon: <BarChart2 className="w-10 h-10 text-blue-600 mb-4" />,
    title: "Advanced Analytics",
    description: "Gain insights from asset usage and performance data.",
  },
  {
    icon: <Cpu className="w-10 h-10 text-blue-600 mb-4" />,
    title: "Smart Automation",
    description: "Automate repetitive tasks to save time and reduce errors.",
  },
  {
    icon: <Settings className="w-10 h-10 text-blue-600 mb-4" />,
    title: "Customizable",
    description:
      "Tailor AssetVerse to match your team’s workflow and branding.",
  },
  {
    icon: <Bell className="w-10 h-10 text-blue-600 mb-4" />,
    title: "Real-time Notifications",
    description: "Stay updated with alerts for key asset activities.",
  },
];

const FeaturesShowcase = () => {
     const ref = useRef(null);
     const isInView = useInView(ref, { once: true, margin: "-100px" });
     const controls = useAnimation();

     if (isInView) {
       controls.start("visible");
     }

     const featureVariants = {
       hidden: { opacity: 0, y: 50 },
       visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
     };
  return (
    <div>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Key Features
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            AssetVerse offers powerful features to make asset management
            efficient, secure, and collaborative.
          </motion.p>

          {/* Features Grid */}
          <div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={featureVariants}
                initial="hidden"
                animate={controls}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesShowcase;
