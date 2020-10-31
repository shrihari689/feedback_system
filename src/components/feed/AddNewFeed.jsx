import React, { useEffect, useState } from 'react';
import HomeNavBar from './../home/HomeNavBar';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import AddNewFeedWrapper from '../general/addNewFeedWrapper';
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
        window.location.href = '/';
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
        if (currentUser != null) {
            const dbRef = firebase.firestore().collection('Feeds');
            const uniqueId = Date.now().toString();
            dbRef.doc(uniqueId).set({
                ...newFeed,
                status: 'unsolved',
                date: firebase.firestore.FieldValue.serverTimestamp(),
                userName: currentUser.displayName,
                userImage: currentUser.photoURL,
                userId: currentUser.uid 
            }).then((result) => {
                window.location.href = '/';
            }).catch((err)=>{
                alert("Error in Posting the Feed!\nTry again after sometimes!");
            });
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