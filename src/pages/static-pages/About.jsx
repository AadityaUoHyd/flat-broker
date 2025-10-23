import React from "react";
import { motion } from "framer-motion";
import { Building2, Home, Users } from "lucide-react";

const About = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 px-6 py-12">
            <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl font-bold mb-6 text-amber-500">About Flat Broker</h1>
                <p className="text-lg text-gray-500 mb-10">
                    Flat Broker is your trusted real-estate management platform built to simplify buying, selling, and managing flats.
                    Whether you're an individual seller or a large housing community, we make transactions seamless, transparent, and fast.
                </p>

                <div className="grid sm:grid-cols-3 gap-8 mt-12">
                    {[
                        { icon: Home, title: "Simplified Selling", desc: "List your flats easily and reach verified buyers." },
                        { icon: Building2, title: "Smart Dashboard", desc: "Track approvals, enquiries, and sales in one place." },
                        { icon: Users, title: "Admin Control", desc: "Admins manage approvals, users, and analytics effortlessly." },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
                            whileHover={{ scale: 1.05 }}
                        >
                            <item.icon className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                            <h3 className="font-semibold text-lg text-gray-700 mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default About;
