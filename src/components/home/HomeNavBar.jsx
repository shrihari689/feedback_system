import bitLogo from "../../assets/bitLogo.png";
import React from 'react';
import { Link } from "react-router-dom";
import { supportEmail } from './../../configs/mainConfigs';
const HomeNavBar = ({onLogout}) => {
    return ( 
        <nav>
            <Link to="/"><img src={bitLogo} className="logo" alt="Bannari Amman Institute of Technology"/></Link>
            <div>
                <a href={`mailto:${supportEmail}`} className="nav-button">Support</a>
                <span onClick={onLogout} className="nav-button">Logout</span>    
            </div>
        </nav>  
    );
}
 
export default HomeNavBar;