import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github } from "lucide-react";

const Team = () => {
    const team = [
        {
            name: "Aaditya B Chatterjee",
            role: "Founder & Full Stack Developer",
            img: "https://avatars.githubusercontent.com/u/57300089?s=400&u=f3713021dc5fec60d3182cc9f83b7683b0bd997b&v=4", // Replace with your own image
            linkedin: "https://www.linkedin.com/in/aaditya-bachchu-chatterjee-0485933b/",
            github: "https://github.com/AadityaUoHyd",
        },
        {
            name: "Arvind Singh",
            role: "UI/UX Designer",
            img: "https://randomuser.me/api/portraits/men/45.jpg",
            linkedin: "#",
            github: "#",
        },
        {
            name: "Santosh Kumar",
            role: "Backend Engineer",
            img: "https://randomuser.me/api/portraits/men/48.jpg",
            linkedin: "#",
            github: "#",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 px-6 py-12">
            <motion.div
                className="max-w-6xl mx-auto text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl font-bold mb-6 text-amber-500">Meet Our Team</h1>
                <p className="text-gray-300 mb-12">
                    The passionate minds behind Flat Broker.
                </p>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {team.map((member, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
                            whileHover={{ scale: 1.05 }}
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="font-semibold text-lg text-teal-500">{member.name}</h3>
                            <p className="text-sm text-purple-400 mb-3">{member.role}</p>

                            <div className="flex justify-center space-x-4">
                                <a href={member.linkedin} target="_blank" rel="noreferrer">
                                    <Linkedin className="w-5 h-5 text-blue-500 hover:text-blue-700 transition" />
                                </a>
                                <a href={member.github} target="_blank" rel="noreferrer">
                                    <Github className="w-5 h-5 text-gray-500 hover:text-gray-700 transition" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Team;
