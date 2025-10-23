import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User2, LogOut, Settings, Menu } from "lucide-react";

const Header = ({ role, user }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState("light");
    const dropdownRef = useRef(null); // 👈 ref for dropdown area

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        setIsOpen(false);
        navigate("/login");
    };

    // 👇 Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <header className="bg-gray-900 text-gray-300 px-10 py-4 flex items-center justify-between">
            <Link to={`/${role === "Admin" ? "admin" : "user"}-dash`} className="text-4xl font-bold text-blue-600">
                Flat Broker
            </Link>
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                    title="Toggle Theme"
                >
                    {theme === "dark" ? "☀️" : "🌙"}
                </button>

                {/* 👇 dropdown wrapper has the ref */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {user?.profile_image ? (
                            <img
                                src={user.profile_image}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = "none"; // Hide on error
                                }}
                            />
                        ) : (
                            <User2 className="w-6 h-6 text-gray-600" />
                        )}

                        <span className="hidden md:block">{user?.name || "User"}</span>
                        <Menu className="w-5 h-5 md:hidden" />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50">
                            <div className="p-4 border-b dark:border-gray-700">
                                <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                            </div>
                            <div className="py-2">
                                <Link
                                    to="/user-dash/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Settings className="inline w-4 h-4 mr-2" />
                                    Profile
                                </Link>
                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    <LogOut className="inline w-4 h-4 mr-2" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
