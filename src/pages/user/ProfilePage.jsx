import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorBoundary from "../../components/ErrorBoundary";

// Wrap the main component with ErrorBoundary
export default function ProfilePageWithErrorBoundary() {
    return (
        <ErrorBoundary>
            <ProfilePage />
        </ErrorBoundary>
    );
}

// Main ProfilePage component
const ProfilePage = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState(null);
    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : { name: '', email: '' };
    });

    const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
    const token = localStorage.getItem("token");
    
    // Handle component errors
    const [hasError, setHasError] = useState(false);

    // Reset error state when retrying
    const handleRetry = () => {
        setHasError(false);
        // You can add any retry logic here if needed
    };

    // Show error boundary if there's an error
    if (hasError) {
        throw new Error('Failed to load profile data');
    }

    // Fetch latest user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('Fetching user data...');
                const response = await axios.get(`${API}/auth/me`, {
                    headers: { 'auth-token': token }
                });
                
                console.log('User data response:', response.data);
                
                if (response.data.success && response.data.user) {
                    setUser(response.data.user);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                } else {
                    console.error('Failed to fetch user data:', response.data.message);
                    // Fallback to localStorage if available
                    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
                    if (localUser && localUser.id) {
                        console.log('Using cached user data from localStorage');
                        setUser(localUser);
                    } else {
                        console.error('No cached user data available');
                        // Optionally redirect to login
                        // navigate('/login');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                
                // More detailed error handling
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                    
                    if (error.response.status === 401) {
                        // Token is invalid or expired
                        console.error('Authentication failed - redirecting to login');
                        // Clear invalid token and redirect
                        localStorage.removeItem('token');
                        navigate('/login');
                        return;
                    }
                }
                
                // Fallback to localStorage if available
                const localUser = JSON.parse(localStorage.getItem("user") || "{}");
                if (localUser && localUser.id) {
                    console.log('Using cached user data after error');
                    setUser(localUser);
                }
            }
        };
        
        try {
            if (token) {
                fetchUserData().catch(error => {
                    console.error('Error in fetchUserData:', error);
                    setHasError(true);
                });
            } else {
                console.error('No authentication token found');
                // Redirect to login if no token
                navigate('/login');
            }
        } catch (error) {
            console.error('Unexpected error in useEffect:', error);
            setHasError(true);
        }
    }, [API, token, navigate, hasError]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setErr(null);
        setSaving(true);
        
        // Validate file type and size
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (!validTypes.includes(file.type)) {
            setErr({ 
                type: 'error', 
                message: 'Invalid file type. Please upload an image (JPEG, PNG, GIF, or WebP).' 
            });
            setSaving(false);
            return;
        }
        
        if (file.size > maxSize) {
            setErr({ 
                type: 'error', 
                message: 'File is too large. Maximum size is 5MB.' 
            });
            setSaving(false);
            return;
        }

        const fd = new FormData();
        fd.append("profileImage", file);

        try {
            console.log('Uploading profile image...');
            const res = await axios.post(`${API}/auth/updateProfileImage`, fd, {
                headers: {
                    "auth-token": token,
                    "Content-Type": "multipart/form-data",
                },
            });
            
            console.log('Upload Response:', res.data);
            
            if (res.data.success && res.data.user) {
                // Update user data with new profile image
                const updatedUser = { ...user, ...res.data.user };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
                
                // Show success message
                setErr({ type: 'success', message: 'Profile image updated successfully!' });
                
                // Clear success message after 3 seconds
                setTimeout(() => setErr(null), 3000);
            } else {
                throw new Error(res.data.message || 'Failed to update profile image');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            
            let errorMessage = 'Failed to upload image';
            if (error.response) {
                // Server responded with an error status code
                errorMessage = error.response.data?.message || error.response.statusText || errorMessage;
                console.error('Server response:', error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                errorMessage = 'No response from server. Please check your connection.';
                console.error('No response received:', error.request);
            } else {
                // Something else happened
                errorMessage = error.message || errorMessage;
            }
            
            setErr({ type: 'error', message: errorMessage });
        } finally {
            setSaving(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Profile</h2>
            <div className="text-center mb-6">
                <div className="relative inline-block">
                    <img
                        src={user.profile_image || "/default-avatar.png"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-blue-200 dark:border-gray-600"
                        onError={(e) => {
                            e.target.src = "/default-avatar.png";  // Fallback
                        }}
                    />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{user.name || 'User'}</h3>
                <p className="text-gray-600 dark:text-gray-300">{user.email || ''}</p>
            </div>
            <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Update Profile Image
                    </label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-blue-300 dark:hover:file:bg-gray-600"
                            disabled={saving}
                        />
                        <button
                            type="submit"
                            disabled={saving || !file}
                            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
                        >
                            {saving ? "Uploading..." : "Update"}
                        </button>
                    </div>
                    {err && (
                        <p className={`text-sm mt-2 ${err.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                            {err.message}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

// Export the unwrapped component for testing purposes
export { ProfilePage };