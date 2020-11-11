import bitLogo from "../../assets/bitLogo.png";
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link, NavLink } from "react-router-dom";
import { supportEmail } from './../../configs/mainConfigs';
const HomeNavBar = ({isAdmin}) => {
    
    const handleSideBar = () => {
        const sidenav = document.getElementById('sidebar');
        sidenav.classList.toggle('open');
        sidenav.querySelector("div").classList.toggle('open');
    }    
    
    
    const handleLogout = () => {
        firebase.auth().signOut().then((result)=>{
        }).catch((err)=>{
            alert("Error in Logging out!");
        });
    };


    if(isAdmin) {
        return ( 
            <React.Fragment>
                <nav>
                    <i onClick={handleSideBar} className="fa fa-bars mobile-menu"></i>
                    <Link to="/"><img src={bitLogo} className="logo" alt="Bannari Amman Institute of Technology"/></Link>
                    <ul>
                        <NavLink to='/admin/feeds'>Feeds</NavLink>
                        <NavLink to='/admin/manage/users' >Settings</NavLink>
                        <NavLink to='/admin/help' >Help</NavLink>
                    </ul>
                    <div>
                        <a href={`mailto:${supportEmail}`} className="nav-button">Support</a>
                        <span onClick={handleLogout} className="nav-button">Logout</span>    
                    </div>
                    <i className="fa fa-bars mobile-menu hidden"></i>
                </nav>  
                <div id="sidebar" className="sidebar">
                    <i onClick={handleSideBar} className="close-button fa fa-close"></i>
                    <div className="sidebar__container">
                        <ul onClick={handleSideBar}>
                            <NavLink to='/admin/feeds'>Feeds</NavLink>
                            <NavLink to='/admin/manage/users' >Settings</NavLink>
                            <NavLink to='/admin/help' >Help</NavLink>
                        </ul>
                        <a href={`mailto:${supportEmail}`} className="sidebar__button">Support</a>
                        <span onClick={handleLogout} className="sidebar__button">Logout</span>    
                    </div>
                </div>
            </React.Fragment>
        );
    }


    return ( 
        <React.Fragment>
            <nav>
                <i onClick={handleSideBar} className="fa fa-bars mobile-menu"></i>
                <Link to="/"><img src={bitLogo} className="logo" alt="Bannari Amman Institute of Technology"/></Link>
                <ul>
                    <NavLink to='/feeds' >Feeds</NavLink>
                    <NavLink to='/profile' >Profile</NavLink>
                    <NavLink to='/help' >Help</NavLink>
                </ul>
                <div>
                    <a href={`mailto:${supportEmail}`} className="nav-button">Support</a>
                    <span onClick={handleLogout} className="nav-button">Logout</span>    
                </div>
                <i className="fa fa-bars mobile-menu hidden"></i>
            </nav>  
            <div id="sidebar" className="sidebar">
                <i onClick={handleSideBar} className="close-button fa fa-close"></i>
                <div className="sidebar__container">
                    <ul onClick={handleSideBar}>
                        <NavLink to='/feeds' >Feeds</NavLink>
                        <NavLink to='/profile' >Profile</NavLink>
                        <NavLink to='/help' >Help</NavLink>
                    </ul>
                    <a href={`mailto:${supportEmail}`} className="sidebar__button">Support</a>
                    <span onClick={handleLogout} className="sidebar__button">Logout</span>    
                </div>
            </div>
        </React.Fragment>
    );
}
 
export default HomeNavBar;