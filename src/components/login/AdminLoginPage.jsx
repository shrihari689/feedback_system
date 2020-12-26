import React, { useState } from 'react';
import AdminLoginForm from './AdminLoginForm';
import LoginNavBar from './LoginNavBar';
import firebase from 'firebase/app';
import 'firebase/auth';

const AdminLoginPage = () => {

    const [isLoading, setIsLoading] = useState(false);      


    const handleLoginUser = (email, password) => {
        setIsLoading(true);
        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
        }).catch(error => {
            alert("Error in Login!")
            setIsLoading(true);
        });
    }

    return (
        <React.Fragment>
            <LoginNavBar />
            <AdminLoginForm  isLoading={isLoading} onLogin={handleLoginUser} />
        </React.Fragment>
    );
}
 
export default AdminLoginPage;