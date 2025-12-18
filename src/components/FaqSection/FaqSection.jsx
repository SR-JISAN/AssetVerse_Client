import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { BadgeQuestionMark, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is AssetVerse?",
    answer:
      "AssetVerse is a digital asset management platform that helps teams track, organize, and analyze assets efficiently.",
  },
  {
    question: "Can I upgrade my package later?",
    answer:
      "Yes! You can upgrade or downgrade your plan anytime from your account settings.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. AssetVerse uses enterprise-grade security protocols to protect your data.",
  },
];

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => setOpenIndex(openIndex === index ? null : index);
  return (
    <div className="mw">
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl flex justify-center items-center gap-2 font-bold mb-12 text-center"
          >
            Frequently Asked Questions{" "}
            <BadgeQuestionMark size={40} color="#155dfc" />
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-2 hover:shadow-xl border-blue-700 rounded-lg p-4 cursor-pointer"
                onClick={() => toggle(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openIndex === index && "rotate-80"
                    }`}
                  />
                </div>
                {openIndex === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqSection;
