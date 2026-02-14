import React from 'react';
import { Utensils, Mail, Phone, Instagram, Twitter, Facebook } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <div className="logo">
                        <Utensils className="logo-icon" size={24} />
                        <span>Food<span>Kart</span></span>
                    </div>
                    <p>Delivering happiness to your doorstep, one meal at a time. The best restaurants in town, just a click away.</p>
                    <div className="social-links">
                        <Instagram size={20} />
                        <Twitter size={20} />
                        <Facebook size={20} />
                    </div>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/cart">Cart</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">Sign Up</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Refund Policy</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <div className="contact-item">
                        <Mail size={18} />
                        <span>support@foodkart.com</span>
                    </div>
                    <div className="contact-item">
                        <Phone size={18} />
                        <span>+1 (555) 123-4567</span>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} FoodKart Inc. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
