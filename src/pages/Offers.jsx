import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { restaurants as localRestaurants } from '../data/restaurants';
import { Ticket, Search } from 'lucide-react';
import '../styles/Home.css';

const Offers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setRestaurants(localRestaurants);
        setLoading(false);
    }, []);

    const offers = restaurants.filter(r => r.offer);

    const filteredOffers = offers.filter(res => {
        const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.offer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = activeTab === 'All' ||
            (activeTab === 'Percentage' && res.offer.includes('%')) ||
            (activeTab === 'Flat' && res.offer.toLowerCase().includes('flat')) ||
            (activeTab === 'Freebies' && (res.offer.toLowerCase().includes('free') || res.offer.toLowerCase().includes('bogo')));

        return matchesSearch && matchesTab;
    });

    if (loading) return <div className="loading">Loading Exclusive Offers...</div>;

    return (
        <div className="offers-page container animate-fade-in">
            <header className="page-header">
                <h1>Delicious Offers For You</h1>
                <p>Save big on your favorite meals with FoodKart exclusive deals</p>
            </header>

            <div className="offers-nav">
                <div className="offer-tabs">
                    {['All', 'Percentage', 'Flat', 'Freebies'].map(tab => (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="offer-search card">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search deals..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="offers-grid-page">
                {filteredOffers.map(res => (
                    <Link to={`/restaurant/${res.id}`} key={`offer-pg-${res.id}`} className="offer-card animate-fade-in">
                        <div className="offer-content">
                            <span className="offer-tag">OFFER</span>
                            <h3>{res.offer}</h3>
                            <p>at {res.name}</p>
                            <div className="offer-meta">
                                <Ticket size={16} />
                                <span>Use Code: FOODKART{res.id}</span>
                            </div>
                        </div>
                        <div className="offer-image">
                            <img src={res.image} alt={res.name} />
                        </div>
                    </Link>
                ))}
            </div>

            {filteredOffers.length === 0 && (
                <div className="no-results">
                    <p>No active offers found for this category</p>
                </div>
            )}
        </div>
    );
};

export default Offers;
