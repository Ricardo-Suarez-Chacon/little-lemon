import { Routes, Route } from 'react-router-dom';
import Home from './Home'; // Asumiendo que tienes un componente Home
import About from '../Components/About'; // Asumiendo que tienes un componente About
import Menu from './Menu'; // Asumiendo que tienes un componente Menu
import BookingPage from '../Pages/BookingPage'; // Asumiendo que tienes un componente BookingPage
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ConfirmedBooking from '../Components/ConfirmedBooking';



const Navigation = () => {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/Reservations" element={<BookingPage />} />
          <Route path="/confirmed-booking" element={<ConfirmedBooking />} />
        </Routes>
        <Footer />
      </>
    );
  };

export default Navigation;