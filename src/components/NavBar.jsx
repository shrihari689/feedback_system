import bitLogo from "../assets/bitLogo.png";
import React from 'react';
const NavBar = (props) => {
    return ( 
        <nav>
            <img src={bitLogo} className="logo" alt="Bannari Amman Institute of Technology"/>
            <button className="nav-button">Support</button>
        </nav>  
    );
}
 
export default NavBar;