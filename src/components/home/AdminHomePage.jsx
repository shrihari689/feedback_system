import React, { useEffect, useState } from 'react';
import HomeNavBar from './HomeNavBar';
import AdminHomePageContainer from './AdminHomePageContainer';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { isSuperAdmin} from '../../configs/mainConfigs';
const AdminFeedsPage = ({history, user}) => {
    const [isLoading, setIsLoading] = useState(true);    
    const [feeds, setFeeds] = useState([]);
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {    
                if(isSuperAdmin(user)){
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

                }else{
                    const db = firebase.firestore().collection('Settings');
                        db.where('users','array-contains', user.email).get().then((docs) => {
                            const roles = [];
                            docs.forEach((doc) => {
                                roles.push(doc.data().name?.toLowerCase());
                            });
                            if(roles.length === 0) {
                                setIsLoading(false);
                            }else{
                                const dbRef = firebase.firestore().collection('Feeds');
                                dbRef.where('tags','array-contains-any',roles).get().then((docs) => {
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
                }
            }
        });
    },[]);
   
    
    

    const handleFeedItemClick = (feedId) => {
        if(feedId){
            history.push(`admin/feed/${feedId}`);
        }
    };

   
    return (
        <React.Fragment>
            <HomeNavBar isAdmin={true} user={user} />
            <AdminHomePageContainer
                feeds={feeds}
                onFeedItemClick={handleFeedItemClick}
                isLoading={isLoading}
            />
        </React.Fragment>
    );
}
 
export default AdminFeedsPage;