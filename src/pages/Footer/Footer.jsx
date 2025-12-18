import React from 'react';
import { Mail, Phone, Linkedin, Twitter, Facebook } from "lucide-react";

const Footer = () => {
    return (
      <footer className="bg-linear-to-r mt-10 from-blue-950 to-blue-800 text-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-15 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">AssetVerse</h3>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} AssetVerse. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />{" "}
                <a href="mailto:contact@assetverse.com">
                  contact@assetverse.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />{" "}
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>

        
          <div>
            <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

        
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#packages"
                  className="hover:text-white transition-colors"
                >
                  Packages
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

      
        <div className="mt-12 text-center text-gray-500 text-sm">
         Thank's for Exploring  AssetVerse 
        </div>
      </footer>
    );
};

export default Footer;