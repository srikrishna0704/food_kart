import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, MapPin, Package, Heart, LogOut, Clock, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import '../styles/Profile.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://foodkart-backend-tmky.onrender.com/api';

const Profile = () => {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Account Info');
    const [newAddress, setNewAddress] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                const userId = user.id || user._id;
                const [ordersRes, addressesRes] = await Promise.all([
                    axios.get(`${API_URL}/orders/${userId}`),
                    axios.get(`${API_URL}/address/${userId}`)
                ]);
                setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
                setAddresses(Array.isArray(addressesRes.data) ? addressesRes.data : []);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const handleAddAddress = async (e) => {
        e.preventDefault();
        if (!newAddress.trim()) return;
        setSaving(true);
        try {
            const userId = user.id || user._id;
            const response = await axios.post(`${API_URL}/address/add`, {
                userId,
                fullName: user.name || user.displayName,
                address: newAddress.trim(),
                city: 'Default City', // Maintaining model requirements
                pincode: '000000',
                state: 'Default State',
                phone: user.phone || '0000000000'
            });
            setAddresses([...addresses, response.data.address]);
            setNewAddress('');
        } catch (error) {
            console.error("Error adding address:", error);
        } finally {
            setSaving(false);
        }
    };

    if (!user) return <div className="container">Please login to view profile</div>;

    const renderContent = () => {
        switch (activeTab) {
            case 'Account Info':
                return (
                    <div className="info-card card animate-fade-in">
                        <h3>Personal Information</h3>
                        <div className="info-group">
                            <label>Full Name</label>
                            <p>{user.name || user.displayName}</p>
                        </div>
                        <div className="info-group">
                            <label>Email Address</label>
                            <p>{user.email}</p>
                        </div>
                        <div className="info-group">
                            <label>Phone Number</label>
                            <p>{user.phone || '+1 (555) 000-0000'}</p>
                        </div>
                        <button className="btn-edit-profile">Edit Profile</button>
                    </div>
                );
            case 'My Orders':
                return (
                    <div className="info-card card recent-orders animate-fade-in">
                        <h3>Recent Orders</h3>
                        {loading ? (
                            <p>Loading your orders...</p>
                        ) : orders.length > 0 ? (
                            <div className="orders-list">
                                {orders.map(order => (
                                    <div key={order._id} className="order-item">
                                        <div className="order-main">
                                            <Package size={20} className="order-icon" />
                                            <div className="order-info">
                                                <p className="order-status">{order.status}</p>
                                                <p className="order-date"><Clock size={14} /> {new Date(order.createdAt).toLocaleString()}</p>
                                            </div>
                                            <p className="order-total">${order.totalPrice?.toFixed(2)}</p>
                                        </div>
                                        <div className="order-items-snippet">
                                            {order.items?.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                                        </div>
                                        {order.address && (
                                            <div className="order-address-snippet">
                                                <MapPin size={12} /> Delivering to: {order.address}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <Package size={40} />
                                <p>No recent orders found</p>
                                <a href="/restaurants" className="btn-primary-text">Place your first order!</a>
                            </div>
                        )}
                    </div>
                );
            case 'Saved Addresses':
                return (
                    <div className="info-card card animate-fade-in">
                        <h3>Delivery Addresses</h3>
                        <div className="address-list">
                            {addresses && addresses.length > 0 ? (
                                addresses.map((addr, idx) => (
                                    <div key={addr._id} className="address-item">
                                        <MapPin size={18} className="addr-icon" />
                                        <p>{addr.address}, {addr.city}</p>
                                        <button className="btn-delete-addr"><Trash2 size={16} /></button>
                                    </div>
                                ))
                            ) : (
                                <p className="no-address">No addresses saved. Please add one to order food.</p>
                            )}
                        </div>
                        <form onSubmit={handleAddAddress} className="add-address-form">
                            <input
                                type="text"
                                placeholder="Enter house no, street, city..."
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn-add-addr" disabled={saving}>
                                {saving ? '...' : <Plus size={20} />}
                            </button>
                        </form>
                    </div>
                );
            default:
                return <div className="info-card card">Feature coming soon!</div>;
        }
    };

    return (
        <div className="profile-page container animate-fade-in">
            <div className="profile-header card">
                <div className="user-avatar">
                    <User size={60} />
                </div>
                <div className="user-primary-info">
                    <h1>{user.name || user.displayName}</h1>
                    <p><Mail size={16} /> {user.email}</p>
                </div>
                <button onClick={logout} className="btn-logout-alt">
                    <LogOut size={18} /> Logout
                </button>
            </div>

            <div className="profile-grid">
                <div className="profile-sidebar">
                    <div className="sidebar-card card">
                        {[
                            { name: 'Account Info', icon: <User size={20} /> },
                            { name: 'My Orders', icon: <Package size={20} /> },
                            { name: 'Favorites', icon: <Heart size={20} /> },
                            { name: 'Saved Addresses', icon: <MapPin size={20} /> }
                        ].map(item => (
                            <div
                                key={item.name}
                                className={`sidebar-item ${activeTab === item.name ? 'active' : ''}`}
                                onClick={() => setActiveTab(item.name)}
                            >
                                {item.icon} <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="profile-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Profile;
