import bitLogo from "../../assets/bitLogo.png";
import React from 'react';
import { Link } from "react-router-dom";
import { supportEmail } from './../../configs/mainConfigs';
const HomeNavBar = (props) => {
    return ( 
        <nav>
            <Link to="/"><img src={bitLogo} className="logo" alt="Bannari Amman Institute of Technology"/></Link>
            <div>
                <a href={`mailto:${supportEmail}`} className="nav-button">Support</a>
                <Link to='/login' className="nav-button">Logout</Link>    
            </div>
        </nav>  
    );
}
 
export default HomeNavBar;