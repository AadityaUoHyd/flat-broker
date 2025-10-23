import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 px-6 py-12 flex items-center justify-center">
            <motion.div
                className="bg-gray-800 shadow-lg rounded-3xl p-8 w-full max-w-3xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-3xl font-bold text-center text-amber-500 mb-6">Contact Us</h1>
                <p className="text-center text-gray-300 mb-10">
                    Have a question or need help? Get in touch with us anytime.
                </p>

                <div className="space-y-6 text-center">
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Mail className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                        <p className="text-gray-300">support@flatbroker.com</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Phone className="w-8 h-8 mx-auto text-green-600 mb-2" />
                        <p className="text-gray-300">+91 12345 67890</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }}>
                        <MapPin className="w-8 h-8 mx-auto text-red-600 mb-2" />
                        <p className="text-gray-300">Hyderabad, Telangana, India</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
