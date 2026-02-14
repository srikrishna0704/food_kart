import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import RestaurantCard from '../components/RestaurantCard';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <div className="favorites-page container animate-fade-in" style={{ padding: '60px 20px' }}>
            <header className="page-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
                <Heart size={48} className="auth-icon" style={{ margin: '0 auto 15px', color: '#ff4757' }} />
                <h1>My Favorites</h1>
                <p>The restaurants and dishes you love the most</p>
            </header>

            {favorites.length > 0 ? (
                <div className="restaurant-grid">
                    {favorites.map(item => (
                        <RestaurantCard key={item.id} restaurant={item} />
                    ))}
                </div>
            ) : (
                <div className="empty-state-large card" style={{ textAlign: 'center', padding: '100px 40px' }}>
                    <Heart size={80} style={{ opacity: 0.1, margin: '0 auto 20px' }} />
                    <h2>Your favorites list is empty</h2>
                    <p>Tap the heart icon on any restaurant to save it here for later.</p>
                    <Link to="/restaurants" className="btn btn-primary" style={{ marginTop: '20px' }}>
                        Explore Restaurants
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Favorites;
