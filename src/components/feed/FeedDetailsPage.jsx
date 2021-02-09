import React, { useEffect, useState } from 'react';
import HomeNavBar from '../home/HomeNavBar';
import firebase  from 'firebase/app';
import 'firebase/firebase-firestore';
import FeedDetailsItem from './../general/feedDetails';

const FeedDetailsPage = ({history, match, isAdmin}) => {
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
                    
                    if(err.code === 'permission-denied'){
                        alert("You are not authorized to see this feed!");
                    }else{
                        alert("Connection Error! Try after sometimes!");
                    }
                    window.location.href = '/feeds';
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
            <HomeNavBar isAdmin={isAdmin} />
            <FeedDetailsItem
                onBackButton={handleBackButton}
                feed={currentFeed}
                currentUser={currentUser}
                onStatusChange={handleChangeStatus}
                isLoading={isLoading}
            />
        </React.Fragment>
    );
}
 
export default FeedDetailsPage;