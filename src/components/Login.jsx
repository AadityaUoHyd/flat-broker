import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn } from 'lucide-react'

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [response,setResponse] = useState(null);
    const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

    const handleLogin = async(e)=>{
        e.preventDefault();

        try {
            const res = await axios.post(`${API}/auth/login`, {
                email,password
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = res.data;

            if(data.token){
                localStorage.setItem("token",data.token);
                localStorage.setItem("role",data.user.role);

                if(data.message === "Admin LoggedIn Successfully" && data.user.role === 'Admin'){
                    setResponse(data.message)
                    console.log(data.message)
                    navigate('/admin-dash');
                }else{
                    setResponse(data.message)
                    navigate('/user-dash');
                }
            }

        } catch (error) {
            console.error("Logged In Failed",error)
        }
    }

    return (
        <div className="login bg-gradient-to-br from-blue-300 to-blue-900 min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
                <div className="flex flex-col items-center mb-6">
                    <img src="/logo.png" alt="Flat Broker Logo" className="w-16 h-16 mb-2" />
                    <h1 className="text-3xl font-extrabold text-gray-900 text-center">
                        Login to Flat Broker
                    </h1>
                    <p className="text-gray-500 text-sm text-center">
                        Welcome back! Log in to find your perfect home
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
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

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-2xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                        <LogIn size={18} /> Login
                    </motion.button>
                </form>

                <div className="mt-5 text-center text-sm text-gray-600">
                    <p>
                        Not Registered?{" "}
                        <Link to="/" className="text-blue-600 hover:underline font-medium">
                            Go to Register
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default Login
