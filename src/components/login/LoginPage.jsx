import React, { useState } from 'react';
import LoginPageBanner from './LoginPageIntro';
import LoginNavBar from './LoginNavBar';
import '../../login.css';
import firebase from 'firebase/app';
import 'firebase/auth';


const LoginPage = ({history}) => {

    const [isLoading, setIsLoading] = useState(true);      
    const auth = firebase.default.auth();
    
    auth.onAuthStateChanged((user) => {
        if(user){
            history.replace('/feeds');
        }else{
            setIsLoading(false);
        }
    });
    
    const handleLoginUser = () => {
        setIsLoading(true);
        const provider = new firebase.default.auth.GoogleAuthProvider();
        provider.setCustomParameters({
            'hd': 'bitsathy.ac.in'
        });
        firebase.default.auth().signInWithPopup(provider).then((result)=>{
        }).catch((err)=>{
            console.log(err);
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