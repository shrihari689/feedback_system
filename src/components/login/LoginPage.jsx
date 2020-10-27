import React from 'react';
import LoginPageBanner from './LoginPageIntro';
import LoginNavBar from './LoginNavBar';
import '../../login.css';
const LoginPage = (props) => {
    return (
        <React.Fragment>
            <LoginNavBar />
            <LoginPageBanner />
        </React.Fragment>
    );
}
 
export default LoginPage;