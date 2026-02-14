import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import '../styles/Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, calculateTotal } = useCart();
    const navigate = useNavigate();

    const { subtotal, tax, grandTotal } = calculateTotal();

    if (cart.length === 0) {
        return (
            <div className="container empty-cart-container animate-fade-in">
                <ShoppingBag size={80} className="empty-icon" />
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/restaurants" className="btn btn-primary">Browse Restaurants</Link>
            </div>
        );
    }

    return (
        <div className="cart-page container animate-fade-in">
            <h1 className="page-title">Your Food Basket</h1>

            <div className="cart-content">
                <div className="cart-items-section">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item card">
                            <div className="item-img">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p className="item-price-unit">${item.price} each</p>
                                <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                                    <Trash2 size={16} /> Remove
                                </button>
                            </div>
                            <div className="item-qty-price">
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, (cart.find(i => i.id === item.id)?.quantity || 1) - 1)} className="control-btn"><Minus size={14} /></button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, (cart.find(i => i.id === item.id)?.quantity || 1) + 1)} className="control-btn"><Plus size={14} /></button>
                                </div>
                                <p className="item-total-price">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary-section">
                    <div className="summary-card card">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax (GST 18%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery Fee</span>
                            <span className="free">FREE</span>
                        </div>
                        <hr />
                        <div className="summary-row total">
                            <span>Grand Total</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                        <button onClick={() => navigate('/payment')} className="btn btn-primary checkout-btn">
                            Proceed to Checkout <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
