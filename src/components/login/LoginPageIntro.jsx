import React from 'react';
import Loader from '../general/loadingPage';
import feedbackIllus from '../../assets/feedbackIllus.svg';
import elonMusk from '../../assets/ElonMusk.jpg';
import googleSignIn from '../../assets/GoogleSignInButton.svg';
import googleSignInHover from '../../assets/GoogleSignInButtonHover.svg';
const LoginPageBanner = ({onLogin, isLoading}) => {

    if(isLoading) return <Loader/>;
    return (
        <div className="row banner">
            <div className="col">
                <img className="hero-banner" src={feedbackIllus} alt="Feedback Illustration"/>
            </div>
            <div className="col signin-banner">
                <h1>HAVING ANY QUERIES ?</h1>
                <div onClick={onLogin} className="google-sign-button">
                    <img src={googleSignInHover} className="static" alt="Google Sign In"/>
                    <img src={googleSignIn} className="onHover" alt="Google Sign In White"/>
                </div>
                <div className="quote-col">
                    <p className="row quote">
                        <i className="fa fa-quote-left" aria-hidden="true"></i> I think it’s very important to have a feedback loop, where you’re constantly thinking about what you’ve done and how you could be doing it better. <i className="fa fa-quote-right" aria-hidden="true"></i>
                    </p> 
                    <div className="row quote-author">
                        <img src={elonMusk} alt="Quote Author"/>
                        <h3>Elon Musk</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default LoginPageBanner;