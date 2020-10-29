import React, { useEffect, useState } from 'react';
import HomeNavBar from './HomeNavBar';
import HomePageContainer from './HomePageContainer';
import firebase from 'firebase/app';
import 'firebase/auth';
const HomePage = ({history}) => {
    const [isLoading, setIsLoading] = useState(true);    
    
    const handleLogout = () => {
        setIsLoading(true);
        firebase.default.auth().signOut().then((result)=>{
            setIsLoading(false);
            history.replace('/');
        }).catch((err)=>{
            setIsLoading(false);
            alert("Error in Logging out!");
        });
    };
    useEffect(() => {
        setIsLoading(false);
    },[]);


    const handleFeedItemClick = (feedId) => {
        if(feedId){
            history.push(`/feed/${feedId}`);
        }
    };

   
    return (
        <React.Fragment>
            <HomeNavBar onLogout={handleLogout} />
            <HomePageContainer onFeedItemClick={handleFeedItemClick} isLoading={isLoading} />
        </React.Fragment>
    );
}
 
export default HomePage;