import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, ShieldCheck, AlertCircle, MapPin, ChevronRight, Info } from 'lucide-react';
import '../styles/Payment.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Payment = () => {
    const { calculateTotal, cart, clearCart } = useCart();
    const { user } = useAuth();
    const { grandTotal } = calculateTotal();
    const [amount, setAmount] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [loadingAddresses, setLoadingAddresses] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAddresses = async () => {
            if (!user) return;
            try {
                const userId = user.id || user._id;
                const response = await axios.get(`${API_URL}/address/${userId}`);
                const addrData = Array.isArray(response.data) ? response.data : [];
                setAddresses(addrData);
                if (addrData.length > 0) {
                    setSelectedAddress(`${addrData[0].address}, ${addrData[0].city}`);
                }
            } catch (err) {
                console.error("Error fetching addresses:", err);
            } finally {
                setLoadingAddresses(false);
            }
        };
        fetchAddresses();
    }, [user]);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!selectedAddress) {
            setError("Add address then only you can proceed to pay.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setProcessing(true);
        setError('');

        try {
            if (parseFloat(amount) === parseFloat(grandTotal.toFixed(2))) {
                await axios.post(`${API_URL}/orders/place`, {
                    userId: user.id || user._id,
                    items: cart,
                    totalPrice: grandTotal,
                    address: selectedAddress,
                    status: 'Confirmed'
                });

                clearCart();
                navigate('/order-success');
            } else {
                setError(`Incorrect amount. Please enter exactly $${grandTotal.toFixed(2)}`);
                setProcessing(false);
            }
        } catch (err) {
            console.error("Order error:", err);
            setError("Failed to process order. Please try again.");
            setProcessing(false);
        }
    };

    return (
        <div className="payment-page container">
            <div className="payment-card card animate-fade-in">
                <div className="payment-header">
                    <CreditCard size={40} className="payment-icon" />
                    <h2>Payment & Delivery</h2>
                    <p>Select your address and confirm payment to place your order.</p>
                </div>

                {/* Error Box at Top for better visibility */}
                {error && (
                    <div className="payment-error animate-shake">
                        <AlertCircle size={20} /> {error}
                    </div>
                )}

                <div className="delivery-section">
                    <h3><MapPin size={18} /> Delivery Address</h3>
                    {loadingAddresses ? (
                        <p>Loading addresses...</p>
                    ) : addresses.length > 0 ? (
                        <div className="address-selector">
                            {addresses.map((addr, idx) => {
                                const fullAddr = `${addr.address}, ${addr.city}`;
                                return (
                                    <label key={idx} className={`address-option ${selectedAddress === fullAddr ? 'active' : ''}`}>
                                        <input
                                            type="radio"
                                            name="address"
                                            value={fullAddr}
                                            checked={selectedAddress === fullAddr}
                                            onChange={() => {
                                                setSelectedAddress(fullAddr);
                                                setError('');
                                            }}
                                        />
                                        <span>{fullAddr}</span>
                                    </label>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="address-warning-box">
                            <div className="warning-content">
                                <Info size={24} />
                                <div>
                                    <h4>No Address Found</h4>
                                    <p>You haven't added any delivery addresses to your profile yet.</p>
                                </div>
                            </div>
                            <Link to="/profile" className="btn-add-address-link">
                                Go to Profile to Add Address <ChevronRight size={18} />
                            </Link>
                        </div>
                    )}
                </div>

                <div className="amount-display">
                    <span>Amount Payable</span>
                    <h3>${grandTotal.toFixed(2)}</h3>
                </div>

                <form onSubmit={handlePayment}>
                    <div className="input-group">
                        <label className="input-label">Enter Amount to Confirm</label>
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={processing}
                    >
                        {processing ? 'Processing...' : `Pay $${grandTotal.toFixed(2)} & Order`}
                    </button>

                    {!selectedAddress && (
                        <p className="pay-instruction-note">
                            * Please select an address above before paying.
                        </p>
                    )}
                </form>

                <div className="payment-footer">
                    <ShieldCheck size={16} />
                    <span>Secure SSL Encrypted Payment</span>
                </div>
            </div>
        </div>
    );
};

export default Payment;
