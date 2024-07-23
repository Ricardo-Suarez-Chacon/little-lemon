import React, {useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 480) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Limpiar el detector de eventos cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="nav-header">
      <button onClick={handleClick} className="hamburger">
      ☰
      </button>
      <menu className={isOpen ? 'open' : 'closed'}>
        <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
        <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link></li>
        <li><Link to="/menu" className={location.pathname === "/menu" ? "active" : ""}>Menu</Link></li>
        <li><Link to="/reservations" className={location.pathname === "/reservations" ? "active" : ""}>Reservations</Link></li>
        <li><Link to="/order-online" className={location.pathname === "/order-online" ? "active" : ""}>Order Online</Link></li>
        <li><Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link></li>
      </menu>
    </nav>
  );
};

export default Nav;