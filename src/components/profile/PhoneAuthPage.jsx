import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import Loader from '../general/loadingPage';
import HomeNavBar from './../home/HomeNavBar';
const PhoneAuthPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [OTPCode, setOTPCode] = useState('');
    const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
    const [isOTPSent, setIsOTPSent] = useState(false);

    useEffect(() => {
        document.getElementById('recaptcha-container').innerHTML = '';
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': function(response) {
                setIsRecaptchaVerified(true);
                document.getElementById('recaptcha-container').style.display = 'none';            
            },
            'expired-callback': function() {
                document.getElementById('recaptcha-container').style.display = 'block';
                setIsRecaptchaVerified(false);
            }
          });
        window.recaptchaVerifier.render();
    }, []);


    const handleSendOTP = () => {
        if(phone.length !== 10){
            alert('Enter 10-digit phone number!');
            return;
        }
        const appVerifier = window.recaptchaVerifier;
        const provider = new firebase.auth.PhoneAuthProvider();
        const phoneNumber = '+91' + phone;
        provider.verifyPhoneNumber(phoneNumber, appVerifier).then((verificationID) => {
            window.verificationID = verificationID;
            setIsOTPSent(true);
        }).catch((err) => {
            if(err.code === 'auth/too-many-requests'){
                alert("We have blocked all requests from this device due to unusual activity. Try again later.");
            }else{
                alert("Error in Sending OTP!");
                console.log(err);
            }
        });        
    };


    const handleVerifyOTP = () => {
        if(OTPCode.length !== 6){
            alert("Enter a valid 6-digit OTP!");
            return;
        }
        setIsLoading(true);
        const verificationID = window.verificationID;
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationID, OTPCode);
        firebase.auth().currentUser.linkWithCredential(credential).then((result) => {
            const dbRef = firebase.firestore().collection('Users').doc(result.user.uid);
            dbRef.update({
                userPhone: result.user.phoneNumber
            }).then((result) => {
                alert('Verified Successfully!');
                window.location.href = '/';                
            }).catch((err) => {
                alert('Something went wrong!');
                window.location.href = '/';                
            });
        }).catch((err) => {
            if(err.code === 'auth/invalid-verification-code'){
                alert("OTP Code is Wrong! Enter the correct code!");
                setIsLoading(false);
            }else if(err.code === 'auth/captcha-check-failed'){
                alert("User Verification failed! Reload the page!");
                window.location.reload();
            }else if(err.code === "auth/code-expired") {
                alert("The SMS code has expired. Please re-send the verification code to try again.!");
                window.location.reload();
            }else if(err.code === "auth/credential-already-in-use") {
                alert("This phone is already associated with a different user account. Try again with other number!");
                window.location.reload();
            }else{
                alert('Error in Verifying the Phone Number! Try again after sometimes!');
                window.location.reload();
            }            
        });        
    };


    if(isLoading) {
        return (
            <div className="updateProfile__container">
                <div className="updateProfile__wrapper">
                    <Loader />
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <HomeNavBar />
            <div className="updateProfile__container">
                <div className="updateProfile__wrapper">
                    <h2>Verify Your Details</h2>
                    <div className="updateProfile__progress">
                        <div className="updateProfile__progress_meter" style={{width: '75%'}}>
                            75%
                        </div>
                    </div>

                    <h4>Phone Number</h4>                
                    <div id="recaptcha-container"></div>

                    {
                        isOTPSent ? (
                            <div className="info__message">OTP Message Sent to {`+91${phone}`} successfully! Want to try other number? Refresh the page!</div>
                        ):null
                    }

                    {
                        isRecaptchaVerified && !isOTPSent ? (
                            <div className="updateProfile__phone">
                                <select defaultValue='91'>
                                    <option value="91">India (+91)</option>
                                </select>
                                <input type="tel" placeholder="Eg. 9876543210" onChange={(event) => setPhone(event.target.value.replace(' ',''))} />
                                <button className="button" onClick={handleSendOTP}>Send OTP</button>
                            </div>
                        ):null 
                    }
                    {
                        isOTPSent ? (
                            <div className="updateProfile__phone">
                                <input type="number" maxLength='6' placeholder="Eg. XXXXXX" onChange={(event) => setOTPCode(event.target.value.replace(' ',''))} />
                                <button className="button" onClick={handleVerifyOTP}>Verify OTP</button>
                            </div>
                        ): null
                    }
                </div>
            </div>
        </React.Fragment> 
    );


}
 
export default PhoneAuthPage;