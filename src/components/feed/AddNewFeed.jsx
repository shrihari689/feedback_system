import React, { useEffect, useState } from 'react';
import HomeNavBar from './../home/HomeNavBar';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import AddNewFeedWrapper from '../general/addNewFeedWrapper';
import { anonymousImage } from '../../configs/mainConfigs';
const AddNewFeedPage = ({history}) => {

    const [isLoading, setIsLoading] = useState(true);    
    const [currentUser, setCurrentUser] = useState();
    const [tagDepartment, setTagDepartments] = useState([]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                const dbRef = firebase.firestore().collection('Settings');
                dbRef.get().then((result) => {
                    const roles = [];
                    result.forEach((doc) => {
                        roles.push(doc.data().name);
                    })
                    setTagDepartments(roles);
                    setIsLoading(false);
                }).catch((err) => {
                    alert('Something Went Wrong!');
                });
                setCurrentUser(user);
            }
        });
    },[]);
   


    const handleBackButton = () => {
        history.replace('/feeds');
    }
   
    
    
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
                history.replace('/feeds');        
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
            <HomeNavBar isLoading={isLoading} />
            <AddNewFeedWrapper
                onBackButton={handleBackButton}
                isLoading={isLoading}
                tags={tagDepartment}
                onAddNewFeed={handleAddNewFeed}
            />
        </React.Fragment>
    );
}
 
export default AddNewFeedPage;