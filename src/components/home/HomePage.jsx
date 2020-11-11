import React, { useEffect, useState } from 'react';
import HomeNavBar from './HomeNavBar';
import HomePageContainer from './HomePageContainer';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const FeedsPage = ({history}) => {
    const [isLoading, setIsLoading] = useState(true);    
    const [feeds, setFeeds] = useState([]);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {    
                const dbRef = firebase.firestore().collection('Feeds');
                dbRef.where('userId','==',user.uid)
                    .get().then((docs) => {
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
                    setIsLoading(null);
                });
            }
        });
    },[]);
   
    

    const handleFeedItemClick = (feedId) => {
        if(feedId){
            history.push(`/feed/${feedId}`);
        }
    };

   
    return (
        <React.Fragment>
            <HomeNavBar />
            <HomePageContainer
                feeds={feeds}
                onFeedItemClick={handleFeedItemClick}
                isLoading={isLoading}
            />
        </React.Fragment>
    );
}
 
export default FeedsPage;