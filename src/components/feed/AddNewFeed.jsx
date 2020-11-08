import React, { useEffect, useState } from 'react';
import HomeNavBar from './../home/HomeNavBar';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import AddNewFeedWrapper from '../general/addNewFeedWrapper';
import { anonymousImage } from '../../configs/mainConfigs';
const AddNewFeedPage = ({history}) => {

    const [isLoading, setIsLoading] = useState(true);    
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                setCurrentUser(user);
                setIsLoading(false);
            }
        });
    },[]);
   


    const handleBackButton = () => {
        history.replace('/feeds');
    }
   
    const handleLogout = () => {
        setIsLoading(true);
        firebase.default.auth().signOut().then((result)=>{
            window.location = '/feeds';
        }).catch((err)=>{
            setIsLoading(false);
            alert("Error in Logging out!");
        });
    };
    
    const handleAddNewFeed = (newFeed) => {
        setIsLoading(true);
        if (currentUser != null) {
            const dbRef = firebase.firestore().collection('Feeds');
            const uniqueId = Date.now().toString();
            dbRef.doc(uniqueId).set({
                title: newFeed.title,
                desc: newFeed.desc,
                tags: newFeed.tags,
                hasImage: newFeed.hasImage,
                status: 'unsolved',
                date: firebase.firestore.FieldValue.serverTimestamp(),
                userName: newFeed.anonymous ? 'Anonymous' : currentUser.displayName,
                userImage: newFeed.anonymous ? anonymousImage : currentUser.photoURL,
                userId: currentUser.uid 
            }).then((result) => {
                window.location.href = '/feeds';
            }).catch((err)=>{
                alert("Error in Posting the Feed!\nTry again after sometimes!");
                setIsLoading(false);
            });
        }else{
            setIsLoading(false);
        }
    }

    return (
        <React.Fragment>
            <HomeNavBar isLoading={isLoading} onLogout={handleLogout} />
            <AddNewFeedWrapper
                onBackButton={handleBackButton}
                isLoading={isLoading}
                onAddNewFeed={handleAddNewFeed}
            />
        </React.Fragment>
    );
}
 
export default AddNewFeedPage;