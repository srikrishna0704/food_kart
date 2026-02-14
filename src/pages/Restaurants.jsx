import React, { useState, useEffect } from 'react';
import { restaurants as localRestaurants } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import { Search, Filter } from 'lucide-react';
import '../styles/Home.css';

const Restaurants = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState(['All']);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setRestaurants(localRestaurants);
        const uniqueCategories = ['All', ...new Set(localRestaurants.map(r => r.category))];
        setCategories(uniqueCategories);
        setLoading(false);
    }, []);

    const filteredRestaurants = restaurants.filter(res => {
        const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) return <div className="loading">Loading Restaurants...</div>;

    return (
        <div className="restaurants-page container animate-fade-in">
            <header className="page-header">
                <h1>Explore All Restaurants</h1>
                <p>Discover the best food & drinks in your city</p>
            </header>

            <div className="filter-bar card">
                <div className="search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search restaurants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="category-filters">
                    <Filter size={20} className="filter-icon" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-tag ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="restaurant-grid">
                {filteredRestaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>

            {filteredRestaurants.length === 0 && (
                <div className="no-results">
                    <p>No restaurants found matching your criteria</p>
                    <button onClick={() => { setSearchTerm(''); setSelectedCategory('All') }} className="btn-primary-text">Reset Filters</button>
                </div>
            )}
        </div>
    );
};

export default Restaurants;
