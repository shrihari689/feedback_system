import React, { useState } from 'react';
import firebase from 'firebase/app';
import HomeNavBar from '../home/HomeNavBar';
import HelpPageContainer from './HelpPageContainer';
const AdminHelpPage = () => {
    const [isLoading, setIsLoading] = useState(true);    
    
    
    
    const handleLogout = () => {
        setIsLoading(true);
        firebase.auth().signOut().then((result)=>{
            window.location.href = '/login';
        }).catch((err)=>{
            setIsLoading(false);
            alert("Error in Logging out!");
        });
    };


    return (
        <React.Fragment>
            <HomeNavBar onLogout={handleLogout} />
            <HelpPageContainer isLoading={isLoading} />
        </React.Fragment>
    );
}
 
export default AdminHelpPage;