import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Nav from './Nav'; // Asegúrate de que la ruta sea correcta
import Logo from '../Img/little-lemon-logo.png';
import Logo_FaceBook from '../Img/Facebook.png';
import Logo_Instagram from '../Img/Instagram.png';
import Logo_X from '../Img/X.png';
import Logo_LinkedIn from '../Img/LinkedIn.png';
import Logo_WhatsApp from '../Img/WhatsApp.png';

const Footer = () => {
    const location = useLocation();
  return (
    <footer className="footer">
        <div className="logo-footer-container">
            <img className="logo-footer" src={Logo} alt="Logo Little Lemon" />
        </div>
        <nav className="footer-nav">
            <ul>
                <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
                <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link></li>
                <li><Link to="/menu" className={location.pathname === "/menu" ? "active" : ""}>Menu</Link></li>
                <li><Link to="/reservations" className={location.pathname === "/reservations" ? "active" : ""}>Reservations</Link></li>
                <li><Link to="/order-online" className={location.pathname === "/order-online" ? "active" : ""}>Order Online</Link></li>
                <li><Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link></li>
            </ul>
        </nav>
        <div className="footer-contact">
            <p>Contact:</p>
            <p>Phone: 555-123-4567</p>
            <p>Email: Contact@Littlelemon.com</p>
            <p>Copyright © Little Lemon 2024</p>
        </div>

        <div className="footer-socials">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img className="logoSocial" src={Logo_FaceBook} alt="Logo FaceBook" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img className="logoSocial" src={Logo_Instagram} alt="Logo Instagram" />
            </a>
            <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
                <img className="logoSocial" src={Logo_X} alt="Logo X" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <img className="logoSocial" src={Logo_LinkedIn} alt="Logo LinkedIn" />
            </a>
            <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                <img className="logoSocial" src={Logo_WhatsApp} alt="Logo WhatsApp" />
            </a>
        </div>
    </footer>
  );
};

export default Footer;