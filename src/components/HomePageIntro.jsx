import React from 'react';
import feedbackIllus from '../assets/feedbackIllus.svg';
import elonMusk from '../assets/ElonMusk.jpg';
const HomePageBanner = (props) => {
    return (
        <div className="row banner">
            <div className="col">
                <img className="hero-banner" src={feedbackIllus} alt="Feedback Illustration"/>
            </div>
            <div className="col signin-banner">
                <h1>HAVING ANY QUERIES ?</h1>
                <div className="google-sign-button"></div>
                <p className="row quote">
                    <i class="fa fa-quote-left" aria-hidden="true"></i> I think it’s very important to have a feedback loop, where you’re constantly thinking about what you’ve done and how you could be doing it better. <i class="fa fa-quote-right" aria-hidden="true"></i>
                </p>
                <div className="row quote-author">
                    <img src={elonMusk} alt="Quote Author"/>
                    <h3>Elon Musk</h3>
                </div>
            </div>
        </div>
    );
}
 
export default HomePageBanner;