import React, { useEffect, useState } from 'react';
import HomeNavBar from './HomeNavBar';
import HomePageContainer from './HomePageContainer';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const HomePage = ({history}) => {
    const [isLoading, setIsLoading] = useState(true);    
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                const dbRef = firebase.database().ref();
                dbRef.child('Users').child(user.uid).update({
                    name: user.displayName,
                    image: user.photoURL,
                    id: user.uid,
                }).then((task) => {
                }).catch((err) => {
                });    
                setIsLoading(false);
            }
        });
    },[]);
   
   
    const handleLogout = () => {
        setIsLoading(true);
        firebase.default.auth().signOut().then((result)=>{
            window.location = '/';
        }).catch((err)=>{
            setIsLoading(false);
            alert("Error in Logging out!");
        });
    };
    

    const handleFeedItemClick = (feedId) => {
        if(feedId){
            history.push(`/feed/${feedId}`);
        }
    };

   
    return (
        <React.Fragment>
            <HomeNavBar onLogout={handleLogout} />
            <HomePageContainer
                onFeedItemClick={handleFeedItemClick}
                isLoading={isLoading}
            />
        </React.Fragment>
    );
}
 
export default HomePage;