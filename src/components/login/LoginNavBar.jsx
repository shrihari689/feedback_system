import bitLogo from "../../assets/bitLogo.png";
import React from 'react';
import { Link } from "react-router-dom";
import { supportEmail } from './../../configs/mainConfigs';
const LoginNavBar = (props) => {
    return ( 
        <nav>
            <Link to="/"><img src={bitLogo} className="logo" alt="Bannari Amman Institute of Technology"/></Link>
            <a href={`mailto:${supportEmail}`} className="nav-button">Support</a>
        </nav>  
    );
}
 
export default LoginNavBar;