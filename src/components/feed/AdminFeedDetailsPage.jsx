import React, { useEffect, useState } from 'react';
import AdminFeedDetailsItem from '../general/adminFeedDetails';
import HomeNavBar from '../home/HomeNavBar';
import firebase  from 'firebase/app';
const AdminFeedDetailsPage = ({history, location}) => {
    const [isLoading, setIsLoading] = useState(true);  
    const [currentFeed, setCurrentFeed] = useState(location.state);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                setIsLoading(false);
            }
        });
    },[]);
    
    if(!currentFeed) window.location.href = '/';

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
        setIsLoading(true);
        const dbRef = firebase.firestore().collection('Feeds').doc(feedId);
        dbRef.update({
            status: status
        }).then((result) => {
            
            if(status === 'solved' || status === 'rejected') {
                history.replace('/feeds');
            }else{
                setCurrentFeed((prev) => {
                    return {...prev, status: status};
                });
                setIsLoading(false);
            }
        }).catch((err) => {
            alert("Error in Updating the Status!");
        });
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