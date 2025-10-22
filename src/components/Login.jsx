import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

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
        <>
            <div className="login bg-gray-50 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900">Login Page</h1>

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

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-2xl hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                    </form>

                    <div className="mt-4 text-center text-sm text-gray-600">
                        <p>
                            Not Registered?{" "}
                            <Link to="/" className="text-blue-600 hover:underline">
                                Go to Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
