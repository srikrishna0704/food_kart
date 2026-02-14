import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Home, Package } from 'lucide-react';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        setOrderId('FK-' + Math.random().toString(36).substr(2, 9).toUpperCase());
    }, []);

    return (
        <div className="success-page container">
            <div className="success-card card animate-fade-in">
                <div className="success-icon-wrapper">
                    <CheckCircle2 size={80} className="success-icon" />
                </div>

                <h1>Order Placed Successfully!</h1>
                <p className="order-number">Order ID: <span>{orderId}</span></p>

                <p className="success-message">
                    Your delicious food is being prepared and will be delivered to you shortly.
                    Expect a knock on your door within 30-45 minutes.
                </p>

                <div className="success-actions">
                    <Link to="/" className="btn btn-primary">
                        <Home size={18} /> Back to Home
                    </Link>
                    <button className="btn btn-secondary">
                        <Package size={18} /> Track Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
