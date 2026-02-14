import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { restaurants as localRestaurants } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import { Search } from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setRestaurants(localRestaurants);
        setLoading(false);
    }, []);

    // Handle scroll to section if hash exists in URL
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location, loading]);

    // Enhanced search: filters restaurants by name, cuisine, OR if any menu item matches the search
    const filteredRestaurants = restaurants.filter(res => {
        const query = searchTerm.toLowerCase();
        const matchesRestaurant = res.name.toLowerCase().includes(query) ||
            res.cuisine.toLowerCase().includes(query);

        const matchesMenu = res.menu && res.menu.some(item =>
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );

        return matchesRestaurant || matchesMenu;
    });

    if (loading) return <div className="loading">Loading Amazing Food...</div>;

    return (
        <div className="home-page">
            <header className="hero">
                <div className="container hero-content animate-fade-in">
                    <h1>Order Food From Your Favorite Restaurants</h1>
                    <p>Freshly prepared meals delivered straight to your doorstep.</p>

                    <div className="search-bar">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search for biryani, dosa, juices or Andhra meals..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <section id="offers" className="offers-section container">
                <h2 className="section-title">Exclusive Offers</h2>
                <div className="offers-container">
                    {restaurants.filter(r => r.offer).map(res => (
                        <Link to={`/restaurant/${res.id}`} key={`offer-${res.id}`} className="offer-card animate-fade-in">
                            <div className="offer-content">
                                <span className="offer-tag">OFFER</span>
                                <h3>{res.offer}</h3>
                                <p>at {res.name}</p>
                                <button className="btn-offer">Claim Now</button>
                            </div>
                            <div className="offer-image">
                                <img src={res.image} alt={res.name} />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section id="restaurants" className="restaurant-section container">
                <h2 className="section-title">Top Restaurants</h2>
                <div className="restaurant-grid">
                    {filteredRestaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>

                {filteredRestaurants.length === 0 && (
                    <div className="no-results">
                        <p>No results found for "{searchTerm}"</p>
                        <button onClick={() => setSearchTerm('')} className="btn-primary-text">Clear Search</button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
