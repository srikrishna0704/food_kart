import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User, Utensils } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const { cart } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <Utensils className="logo-icon" size={28} />
                    <span>Food<span>Kart</span></span>
                </Link>

                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/restaurants" className="nav-link">Restaurants</Link>
                    <Link to="/offers" className="nav-link">Offers</Link>
                    {user && <Link to="/favorites" className="nav-link">Favorites</Link>}
                    {user && <Link to="/orders" className="nav-link">Orders</Link>}
                    {user && <Link to="/profile" className="nav-link">Profile</Link>}
                </div>

                <div className="nav-actions">
                    <Link to="/cart" className="cart-btn">
                        <ShoppingCart size={24} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>

                    {user ? (
                        <div className="user-profile">
                            <div className="user-info">
                                <User size={20} />
                                <span>{user.name}</span>
                            </div>
                            <button onClick={handleLogout} className="logout-btn" title="Logout">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="auth-btns">
                            <Link to="/login" className="btn-login">Login</Link>
                            <Link to="/signup" className="btn btn-primary btn-signup">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
