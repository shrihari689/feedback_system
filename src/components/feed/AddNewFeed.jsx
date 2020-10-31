import React, { useEffect, useState } from 'react';
import HomeNavBar from './../home/HomeNavBar';
import firebase from 'firebase/app';
import AddNewFeedWrapper from '../general/addNewFeedWrapper';
const AddNewFeedPage = ({history}) => {

    const [isLoading, setIsLoading] = useState(true);    
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                setIsLoading(false);
            }
        });
    },[]);
   


    const handleBackButton = () => {
        window.location.href = '/';
    }
   
    const handleLogout = () => {
        setIsLoading(true);
        firebase.default.auth().signOut().then((result)=>{
            window.location = '/';
        }).catch((err)=>{
            setIsLoading(false);
            alert("Error in Logging out!");
        });
    };
    
    const handleAddNewFeed = (newFeed) => {
        alert(newFeed);
    }

    return (
        <React.Fragment>
            <HomeNavBar isLoading={isLoading} onLogout={handleLogout} />
            <AddNewFeedWrapper
                onBackButton={handleBackButton}
                isLoading={isLoading}
                onAddNewwFeed={handleAddNewFeed}
            />
        </React.Fragment>
    );
}
 
export default AddNewFeedPage;