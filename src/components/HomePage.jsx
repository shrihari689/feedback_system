import React from 'react';
import HomePageBanner from './HomePageIntro';
import NavBar from './NavBar';
const HomePage = (props) => {
    return (
        <React.Fragment>
            <NavBar />
            <HomePageBanner />
        </React.Fragment>
    );
}
 
export default HomePage;