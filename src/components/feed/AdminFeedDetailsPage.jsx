import React, { useEffect, useState } from 'react';
import AdminFeedDetailsItem from '../general/adminFeedDetails';
import HomeNavBar from '../home/HomeNavBar';
import firebase  from 'firebase/app';
import 'firebase/firebase-firestore';

const AdminFeedDetailsPage = ({history, match, user}) => {
    const [isLoading, setIsLoading] = useState(true);  
    const [currentFeed, setCurrentFeed] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const feedId = match.params.id;
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                const dbRef = firebase.firestore().collection('Feeds').doc(feedId);
                dbRef.get().then((doc) => {
                    if(doc.exists){
                        setCurrentFeed({
                            feedId: doc.id,
                            ...doc.data()
                        });
                        setIsLoading(false);
                    }else{
                        window.location.href = '/feeds';
                    }
                }).catch((err) => {
                    alert("Error in Getting Data!");
                    setIsLoading(false);
                });
                setCurrentUser(user);
            }
        });
    },[feedId]);

    const handleBackButton = () => {
        history.goBack();
    }

   
    
    
    const handleChangeStatus = (feedId, status) => {
        setIsLoading(true);
        const dbRef = firebase.firestore().collection('Feeds').doc(feedId);
        dbRef.collection('History').add({
            status: status,
            adminName: currentUser.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
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
            setIsLoading(false);
        });
    };

    return (
        <React.Fragment>
            <HomeNavBar isAdmin={true} user={user} />
            <AdminFeedDetailsItem
                onBackButton={handleBackButton}
                feed={currentFeed}
                currentUser={currentUser}
                onStatusChange={handleChangeStatus}
                isLoading={isLoading}
            />
        </React.Fragment>
    );
}
 
export default AdminFeedDetailsPage;