import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Package, Clock, MapPin, ShoppingBag } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const response = await axios.get(`${API_URL}/orders/${user.id || user._id}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    if (!user) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}><h2>Please login to view your orders</h2><Link to="/login" className="btn btn-primary" style={{ marginTop: '20px' }}>Login Now</Link></div>;

    return (
        <div className="orders-page container animate-fade-in" style={{ padding: '60px 20px' }}>
            <header className="page-header" style={{ marginBottom: '50px' }}>
                <h1>Your Order History</h1>
                <p>Track and manage your previous orders</p>
            </header>

            {loading ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Fetching your orders...</p>
                </div>
            ) : orders.length > 0 ? (
                <div className="orders-grid-dedicated">
                    {orders.map(order => (
                        <div key={order._id || order.id} className="order-card-large card animate-fade-in">
                            <div className="order-header-main">
                                <div className="order-id-group">
                                    <Package size={24} className="order-icon-large" />
                                    <div>
                                        <span className="order-id-label">Order ID</span>
                                        <p className="order-id-value">#{order._id.slice(-8).toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className="order-status-badge">
                                    {order.status}
                                </div>
                            </div>

                            <div className="order-body">
                                <div className="order-items-list">
                                    {order.items?.map((item, idx) => (
                                        <div key={idx} className="order-item-row">
                                            <img src={item.image} alt={item.name} className="order-item-img-small" />
                                            <div className="order-item-info-small">
                                                <p className="item-name-small">{item.name}</p>
                                                <p className="item-qty-small">{item.quantity} x ${item.price}</p>
                                            </div>
                                            <p className="item-total-small">${(item.quantity * item.price).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="order-footer-details">
                                <div className="footer-meta">
                                    <p className="footer-date"><Clock size={16} /> {new Date(order.createdAt).toLocaleString()}</p>
                                    <p className="footer-address"><MapPin size={16} /> {order.address}</p>
                                </div>
                                <div className="footer-summary">
                                    <span>Total Amount</span>
                                    <p className="footer-grand-total">${order.totalPrice?.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state-large card">
                    <ShoppingBag size={80} className="empty-icon-large" />
                    <h2>No orders yet!</h2>
                    <p>Hungry? Discover the best foods around you and place your first order.</p>
                    <Link to="/restaurants" className="btn btn-primary">Start Ordering</Link>
                </div>
            )}
        </div>
    );
};

export default Orders;
