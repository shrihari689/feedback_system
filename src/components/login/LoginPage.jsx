import React, { useState } from 'react';
import LoginPageBanner from './LoginPageIntro';
import LoginNavBar from './LoginNavBar';
import '../../login.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const LoginPage = ({history}) => {

    const [isLoading, setIsLoading] = useState(false);      
  
    const handleLoginUser = () => {
        setIsLoading(true);
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
            'hd': 'bitsathy.ac.in',
        });
        firebase.auth().signInWithRedirect(provider).then((result)=>{
            setIsLoading(false);
        }).catch((err)=>{
            alert("Error in Login! Try after sometime!");
            setIsLoading(false);
        });
    };

    return (
        <React.Fragment>
            <LoginNavBar />
            <LoginPageBanner isLoading={isLoading} onLogin={handleLoginUser} />
        </React.Fragment>
    );
}
 
export default LoginPage;