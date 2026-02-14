import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import '../styles/RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const favoritestatus = isFavorite(restaurant.id);

    const handleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(restaurant);
    };

    return (
        <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card card animate-fade-in">
            <div className="card-image-wrapper">
                <img src={restaurant.image} alt={restaurant.name} className="card-image" />
                <div className="card-overlay">
                    {restaurant.offer && <span className="badge badge-offer">{restaurant.offer}</span>}
                    <button
                        className={`favorite-btn ${favoritestatus ? 'active' : ''}`}
                        onClick={handleFavorite}
                    >
                        <Heart size={20} fill={favoritestatus ? "#ff4757" : "transparent"} color={favoritestatus ? "#ff4757" : "white"} />
                    </button>
                    <span className="badge badge-success">Free Delivery</span>
                </div>
            </div>
            <div className="card-content">
                <div className="card-header">
                    <h3>{restaurant.name}</h3>
                    <div className="rating">
                        <Star size={16} fill="var(--accent)" color="var(--accent)" />
                        <span>{restaurant.rating}</span>
                    </div>
                </div>
                <p className="cuisine">{restaurant.cuisine}</p>
                <div className="card-footer">
                    <div className="delivery-time">
                        <Clock size={16} />
                        <span>{restaurant.deliveryTime}</span>
                    </div>
                    <button className="view-menu-btn">View Menu</button>
                </div>
            </div>
        </Link>
    );
};

export default RestaurantCard;
