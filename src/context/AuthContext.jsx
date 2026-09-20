import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse user from local storage", error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const signup = async (userData) => {
        try {
            const { name, email, password } = userData;
            const res = await axios.post(`${API_URL}/auth/register`, { name, email, password });
            if (res.data?.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                setUser(res.data.user);
            }
            return { success: true };
        } catch (error) {
            const serverMsg = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response.data : null);
            if (!error.response) {
                throw new Error('Unable to connect to backend server. Please check if backend is running on port 5000.');
            }
            throw new Error(serverMsg || 'Registration failed');
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);

            return response.data;
        } catch (error) {
            const serverMsg = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response.data : null);
            if (!error.response) {
                throw new Error('Unable to connect to backend server. Please check if backend is running on port 5000.');
            }
            throw new Error(serverMsg || 'Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const updateUserProfile = async (updatedData) => {
        try {
            const userId = user?.id || user?._id;
            const res = await axios.put(`${API_URL}/auth/profile`, { userId, ...updatedData });
            const updatedUser = { ...user, ...res.data.user };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            return updatedUser;
        } catch (error) {
            // Fallback for local update if backend fails
            const updatedUser = { ...user, ...updatedData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            return updatedUser;
        }
    };

    const resetPassword = async (email) => {
        console.log('Reset password for:', email);
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout, resetPassword, updateUserProfile, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
