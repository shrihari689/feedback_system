import React from 'react';
import HomeNavBar from './HomeNavBar';
import HomePageContainer from './HomePageContainer';
const HomePage = (props) => {
    return (
        <React.Fragment>
            <HomeNavBar />
            <HomePageContainer />
        </React.Fragment>
    );
}
 
export default HomePage;