import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurants as localRestaurants } from '../data/restaurants';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Star, Clock, Plus, Minus, ArrowLeft, ShoppingBag, Heart } from 'lucide-react';
import '../styles/RestaurantMenu.css';

const RestaurantMenu = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const { cart, addToCart, updateQuantity } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        // Find restaurant by ID (converting id from string to number if needed)
        const found = localRestaurants.find(r => r.id.toString() === id.toString());
        if (found) {
            setRestaurant(found);
        }
        setLoading(false);
    }, [id]);

    const getItemQuantity = (itemId) => {
        const item = cart.find(i => i.id === itemId);
        return item ? item.quantity : 0;
    };

    if (loading) return (
        <div className="loading-container">
            <div className="loader"></div>
            <p>Fetching Delicious Menu...</p>
        </div>
    );

    if (!restaurant) return (
        <div className="container error-container">
            <h2>Restaurant not found</h2>
            <Link to="/" className="btn-primary-text">Back to Home</Link>
        </div>
    );

    return (
        <div className="menu-page animate-fade-in">
            {/* Premium Header */}
            <div className="menu-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${restaurant.image})` }}>
                <div className="container hero-content">
                    <Link to="/restaurants" className="back-link">
                        <ArrowLeft size={18} /> Back to Restaurants
                    </Link>
                    <div className="header-info">
                        <div className="title-fav">
                            <h1>{restaurant.name}</h1>
                            <button
                                className={`fav-circle-btn ${isFavorite(restaurant.id) ? 'active' : ''}`}
                                onClick={() => toggleFavorite(restaurant)}
                            >
                                <Heart size={24} fill={isFavorite(restaurant.id) ? "#ff4757" : "transparent"} color={isFavorite(restaurant.id) ? "#ff4757" : "white"} />
                            </button>
                        </div>
                        <p className="cuisine">{restaurant.cuisine}</p>
                        <div className="meta-info">
                            <span className="rating"><Star size={18} fill="currentColor" /> {restaurant.rating}</span>
                            <span className="dot">•</span>
                            <span className="delivery-time"><Clock size={18} /> {restaurant.deliveryTime}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container menu-section">
                {restaurant.offer && (
                    <div className="promo-banner">
                        <ShoppingBag size={20} />
                        <span>{restaurant.offer} applied to your order!</span>
                    </div>
                )}

                <div className="menu-categories">
                    <h2 className="section-title">Recommended Items</h2>
                    <div className="menu-grid">
                        {restaurant.menu?.map(item => (
                            <div key={item.id} className="menu-item-card">
                                <div className="item-details">
                                    <div className="item-header-row">
                                        <h3>{item.name}</h3>
                                        <button
                                            className={`item-fav-btn ${isFavorite(item.id) ? 'active' : ''}`}
                                            onClick={() => toggleFavorite(item)}
                                        >
                                            <Heart size={18} fill={isFavorite(item.id) ? "#ff4757" : "transparent"} color={isFavorite(item.id) ? "#ff4757" : "#ccc"} />
                                        </button>
                                    </div>
                                    <p className="item-price">${item.price}</p>
                                    <p className="item-desc">{item.description}</p>
                                </div>
                                <div className="item-visual">
                                    <img src={item.image} alt={item.name} className="item-image" />
                                    <div className="add-container">
                                        {getItemQuantity(item.id) > 0 ? (
                                            <div className="qty-selector">
                                                <button onClick={() => updateQuantity(item.id, getItemQuantity(item.id) - 1)} className="qty-btn"><Minus size={14} /></button>
                                                <span className="qty-val">{getItemQuantity(item.id)}</span>
                                                <button onClick={() => updateQuantity(item.id, getItemQuantity(item.id) + 1)} className="qty-btn"><Plus size={14} /></button>
                                            </div>
                                        ) : (
                                            <button onClick={() => addToCart(item)} className="btn-add-item">ADD</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantMenu;
