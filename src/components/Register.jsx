import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserPlus, Mail, Lock, Phone, MapPin, Home } from 'lucide-react'

const Register = () => {
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phoneNo,setPhoneNo] = useState("");
    const [address,setAddress] = useState("");
    const [pincode,setPincode] = useState("");
    const [response,setResponse] = useState(null);

    const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

    const handleRegister = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/auth/register`, {
                name,email,password,pincode,address,phoneNo
            },{
                headers:{ "Content-Type":"application/json" }
            })

            const data = res.data;

            if(data.message === "User Registered Successfully"){
                setResponse(data.message)
                console.log(data.message)
                navigate('/login');
            }else if(data.message === "User already exists"){
                setResponse(data.message)
            }
        } catch (error) {
            console.error("Registration Failed",error)
        }
    }

    return (
        <div className="register bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
                <div className="flex flex-col items-center mb-6">
                    <img src="/logo.png" alt="Flat Broker Logo" className="w-16 h-16 mb-2" />
                    <h1 className="text-3xl font-extrabold text-gray-900 text-center">
                        Register
                    </h1>
                    <p className="text-gray-500 text-sm text-center">
                        Create your account to explore dream homes
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    {/* Grid container for paired layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                                <UserPlus size={18} /> Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                                <Mail size={18} /> Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                                <Lock size={18} /> Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="phoneNo" className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                                <Phone size={18} /> Phone Number
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your phone number"
                                id="phoneNo"
                                name="phoneNo"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label htmlFor="address" className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                                <Home size={18} /> Address
                            </label>
                            <textarea
                                placeholder="Enter your address"
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label htmlFor="pincode" className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                                <MapPin size={18} /> Pincode
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your pincode"
                                id="pincode"
                                name="pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-2xl hover:bg-blue-700 transition"
                    >
                        Register
                    </motion.button>
                </form>

                <div className="mt-5 text-center text-sm text-gray-600">
                    <p>
                        Already Registered?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline font-medium">
                            Go to Login
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default Register
