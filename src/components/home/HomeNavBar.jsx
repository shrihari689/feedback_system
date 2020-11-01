import bitLogo from "../../assets/bitLogo.png";
import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { supportEmail } from './../../configs/mainConfigs';
const HomeNavBar = ({onLogout}) => {
    
    const handleSideBar = () => {
        const sidenav = document.getElementById('sidebar');
        sidenav.classList.toggle('open');
        sidenav.querySelector("div").classList.toggle('open');
    }    
    
    return ( 
        <React.Fragment>
            <nav>
                <i onClick={handleSideBar} className="fa fa-bars mobile-menu"></i>
                <Link to="/"><img src={bitLogo} className="logo" alt="Bannari Amman Institute of Technology"/></Link>
                <ul>
                    <NavLink to='/feeds'>Feeds</NavLink>
                    <NavLink to='/profile'>Profile</NavLink>
                    <NavLink to='/help'>Help</NavLink>
                </ul>
                <div>
                    <Link to="/feed/new" className="nav-button">New Feed</Link>    
                    <a href={`mailto:${supportEmail}`} className="nav-button">Support</a>
                    <span onClick={onLogout} className="nav-button">Logout</span>    
                </div>
                <i className="fa fa-bars mobile-menu hidden"></i>
            </nav>  
            <div id="sidebar" className="sidebar">
                <i onClick={handleSideBar} className="close-button fa fa-close"></i>
                <div className="sidebar__container">
                    <ul onClick={handleSideBar}>
                        <NavLink to='/feeds'>Feeds</NavLink>
                        <NavLink to='/profile'>Profile</NavLink>
                        <NavLink to='/help'>Help</NavLink>
                    </ul>
                    <Link to="/feed/new" className="sidebar__button">New Feed</Link>    
                    <a href={`mailto:${supportEmail}`} className="sidebar__button">Support</a>
                    <span onClick={onLogout} className="sidebar__button">Logout</span>    
                </div>
            </div>
        </React.Fragment>
    );
}
 
export default HomeNavBar;