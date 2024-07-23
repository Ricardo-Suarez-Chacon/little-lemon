import React from 'react';
import Logo from '../Img/Logo_Little_Lemon_Desktop.png';
import Nav from './Nav';

const Header = () => {
    return (
      <header className="header">
        <img className="logo" src={Logo} alt="Logo Little Lemon" />
        <Nav />
      </header>
    );
  };
  
  export default Header;