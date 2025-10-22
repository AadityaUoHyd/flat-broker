import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

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
                headers:{
                    "Content-Type":"application/json"
                }
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
        <>
            <div className="register bg-gray-50 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
                    <form onSubmit={handleRegister} className="space-y-6">
                        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900">Register Page</h1>

                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-2 font-semibold text-gray-700">Name</label>
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
                            <label htmlFor="email" className="mb-2 font-semibold text-gray-700">Email</label>
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
                            <label htmlFor="password" className="mb-2 font-semibold text-gray-700">Password</label>
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
                            <label htmlFor="phoneNo" className="mb-2 font-semibold text-gray-700">Phone Number</label>
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

                        <div className="flex flex-col">
                            <label htmlFor="address" className="mb-2 font-semibold text-gray-700">Address</label>
                            <textarea
                                placeholder="Enter your address"
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="pincode" className="mb-2 font-semibold text-gray-700">Pincode</label>
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

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-2xl hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                    </form>

                    <div className="mt-4 text-center text-sm text-gray-600">
                        <p>
                            Already Registered?{" "}
                            <Link to="/login" className="text-blue-600 hover:underline">
                                Go to Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
