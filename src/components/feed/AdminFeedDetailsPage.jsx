import React, { useEffect, useState } from 'react';
import AdminFeedDetailsItem from '../general/adminFeedDetails';
import HomeNavBar from '../home/HomeNavBar';
import { data } from './../../configs/mainConfigs';
import firebase  from 'firebase/app';
const AdminFeedDetailsPage = ({history, match}) => {
    const [isLoading, setIsLoading] = useState(true);  
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                setIsLoading(false);
            }
        });
    },[]);
    
    const feedId = match.params.id;
    const currentFeed = data.filter(e => e.feedId === feedId);

    const handleBackButton = () => {
        history.goBack();
    }

    const handleLogout = () => {
        setIsLoading(true);
        firebase.auth().signOut().then((result)=>{
            window.location = '/';
        }).catch((err)=>{
            setIsLoading(false);
            alert("Error in Logging out!");
        });
    };

    
    const handleChangeStatus = (feedId, status) => {
        alert(feedId + ' : ' + status);
        
    };


    return (
        <React.Fragment>
            <HomeNavBar onLogout={handleLogout}/>
            <AdminFeedDetailsItem
                onBackButton={handleBackButton}
                feed={currentFeed}
                onStatusChange={handleChangeStatus}
                isLoading={isLoading}
            />
        </React.Fragment>
    );
}
 
export default AdminFeedDetailsPage;