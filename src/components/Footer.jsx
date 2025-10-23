import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="border-t border-gray-700 max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

                {/* Brand & Tagline */}
                <div>
                    <h2 className="text-lg font-semibold text-blue-500">Flat Broker</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Simplifying flat transactions for buyers, sellers, and admins.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-blue-500 mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <Link to="/user-dash/about" className="hover:text-white transition">About</Link>
                        </li>
                        <li>
                            <Link to="/user-dash/contact" className="hover:text-white transition">Contact</Link>
                        </li>
                        <li>
                            <Link to="/user-dash/partners" className="hover:text-white transition">Our Partners</Link>
                        </li>
                        <li>
                            <Link to="/user-dash/team" className="hover:text-white transition">Our Team</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold text-blue-500 mb-2">Contact</h3>
                    <p className="text-sm text-gray-400">Email: support@flatbroker.com</p>
                    <p className="text-sm text-gray-400 mt-1">Phone: +91 12345 67890</p>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Flat Broker. All rights reserved.</p>
                <p className="mt-1">App developed by - <a href="https://www.linkedin.com/in/aaditya-bachchu-chatterjee-0485933b/"><span className="text-blue-400 hover:text-blue-700">Aaditya B Chatterjee</span></a></p>
            </div>
        </footer>
    );
};

export default Footer;
