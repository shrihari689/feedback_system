import React, { useEffect, useState } from 'react';
import HomeNavBar from './HomeNavBar';
import AdminHomePageContainer from './AdminHomePageContainer';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const AdminFeedsPage = ({history}) => {
    const [isLoading, setIsLoading] = useState(true);    
    const [feeds, setFeeds] = useState([]);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {    
                const dbRef = firebase.firestore().collection('Feeds');
                dbRef.get().then((docs) => {
                    const result = [];
                    docs.forEach((e) => {
                        result.unshift({
                            feedId: e.id,
                            ...e.data()
                        });
                    });
                    setFeeds(result);
                    setIsLoading(false);
                }).catch((err) => {
                    alert(err);
                    setIsLoading(null);
                });
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
            <AdminHomePageContainer
                feeds={feeds}
                onFeedItemClick={handleFeedItemClick}
                isLoading={isLoading}
            />
        </React.Fragment>
    );
}
 
export default AdminFeedsPage;