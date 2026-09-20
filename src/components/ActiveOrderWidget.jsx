import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, MapPin, X, CheckCircle2, ChevronRight, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ActiveOrderWidget.css';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

const ActiveOrderWidget = () => {
    const { user } = useAuth();
    const [latestOrder, setLatestOrder] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            setLatestOrder(null);
            return;
        }

        const fetchOrders = async () => {
            try {
                const userId = user.id || user._id;
                const response = await axios.get(`${API_URL}/orders/${userId}`);
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    const newest = sorted[0];
                    // Check if order was placed within last 2 hours
                    const orderTime = new Date(newest.createdAt).getTime();
                    const now = new Date().getTime();
                    const hoursDiff = (now - orderTime) / (1000 * 3600);
                    if (hoursDiff < 2 || newest.status === 'Preparing' || newest.status === 'Confirmed') {
                        setLatestOrder(newest);
                    } else {
                        setLatestOrder(null);
                    }
                }
            } catch (err) {
                console.error("Error fetching active order:", err);
            }
        };

        fetchOrders();
        const interval = setInterval(fetchOrders, 10000); // Poll active order state every 10s
        return () => clearInterval(interval);
    }, [user]);

    if (!user || !latestOrder) return null;

    return (
        <>
            {/* Pulsing Floating Circle Widget */}
            <div className="active-order-circle-trigger" onClick={() => setIsOpen(true)} title="Click to view Active Order details">
                <div className="pulse-ring"></div>
                <div className="circle-inner">
                    <Truck size={22} className="truck-icon" />
                    <span className="active-order-badge">1</span>
                </div>
            </div>

            {/* Active Order Details Modal */}
            {isOpen && (
                <div className="active-order-modal-backdrop" onClick={() => setIsOpen(false)}>
                    <div className="active-order-modal-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="header-title-flex">
                                <Truck size={24} className="header-icon" />
                                <div>
                                    <h3>Active Order Details</h3>
                                    <p className="order-id-text">Order #{latestOrder._id?.slice(-8).toUpperCase()}</p>
                                </div>
                            </div>
                            <button className="close-btn" onClick={() => setIsOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal-body">
                            {/* Live Progress Bar */}
                            <div className="status-tracker-bar">
                                <div className="tracker-step completed">
                                    <CheckCircle2 size={16} />
                                    <span>Placed</span>
                                </div>
                                <div className="tracker-line completed"></div>
                                <div className="tracker-step active">
                                    <Clock size={16} />
                                    <span>Preparing</span>
                                </div>
                                <div className="tracker-line"></div>
                                <div className="tracker-step">
                                    <Truck size={16} />
                                    <span>Delivered</span>
                                </div>
                            </div>

                            <div className="info-detail-row">
                                <Clock size={18} className="detail-icon" />
                                <div>
                                    <span className="detail-label">Order Time & Date</span>
                                    <p className="detail-val">{new Date(latestOrder.createdAt).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="info-detail-row highlight-box">
                                <Truck size={18} className="detail-icon" />
                                <div>
                                    <span className="detail-label">Estimated Delivery Time</span>
                                    <p className="detail-val bold-val">
                                        {latestOrder.deliveryTime || '30 - 45 mins'}
                                        {latestOrder.estimatedArrival && ` (Arriving by ${latestOrder.estimatedArrival})`}
                                    </p>
                                </div>
                            </div>

                            {latestOrder.address && (
                                <div className="info-detail-row">
                                    <MapPin size={18} className="detail-icon" />
                                    <div>
                                        <span className="detail-label">Delivery Address</span>
                                        <p className="detail-val">{typeof latestOrder.address === 'string' ? latestOrder.address : `${latestOrder.address.address}, ${latestOrder.address.city}`}</p>
                                    </div>
                                </div>
                            )}

                            <div className="order-items-snippet-box">
                                <span className="detail-label">Ordered Items</span>
                                <div className="items-mini-list">
                                    {latestOrder.items?.map((item, idx) => (
                                        <div key={idx} className="mini-item-row">
                                            <span>{item.quantity}x {item.name}</span>
                                            <span>${(item.quantity * item.price).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mini-total-row">
                                    <span>Total Amount</span>
                                    <span>${latestOrder.totalPrice?.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <Link to="/orders" className="btn-full-history" onClick={() => setIsOpen(false)}>
                                Track All Orders <ChevronRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ActiveOrderWidget;
