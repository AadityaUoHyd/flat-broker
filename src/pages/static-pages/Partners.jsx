import React from "react";
import { motion } from "framer-motion";
import { Handshake, Building2, Briefcase } from "lucide-react";

const Partners = () => {
    const partners = [
        { name: "UrbanNest Realty", icon: Building2 },
        { name: "DreamSpace Properties", icon: Briefcase },
        { name: "Skyline Estates", icon: Handshake },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 px-6 py-12">
            <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl font-bold mb-6 text-amber-500">Our Partners</h1>
                <p className="text-gray-300 mb-12">
                    We’re proud to collaborate with leading real-estate firms and technology partners that help us bring trust and efficiency to the property market.
                </p>

                <div className="grid sm:grid-cols-3 gap-8">
                    {partners.map((partner, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
                            whileHover={{ scale: 1.05 }}
                        >
                            <partner.icon className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                            <h3 className="font-semibold text-lg">{partner.name}</h3>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Partners;
