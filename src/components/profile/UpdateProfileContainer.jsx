import React, { useEffect, useState } from 'react';
import { deptNames } from '../../configs/mainConfigs';
import '../../updateProfile.css';
import  firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import Loader from './../general/loadingPage';
import { Route, useHistory } from 'react-router-dom';
import PhoneAuthPage from './PhoneAuthPage';
const UpdateProfileContainer = ({user}) => {

    const history = useHistory();

    const [rollNo, setRollNo] = useState('');
    const [year, setYear] = useState('I');

    const [isLoading, setIsLoading] = useState(true);
    const [isFirstPartDone, setIsFirstPartDone] = useState(false);

    const userUid = user.uid;
    const fullName = user.displayName;
    const userNameInEmail = user.email.replace('bitsathy.ac.in',''); 
    const shortDept = userNameInEmail.substr(userNameInEmail.lastIndexOf('.') + 1,2);
    const fullDept = deptNames[shortDept] ? deptNames[shortDept] : '';
    const shortYear = userNameInEmail.substr(userNameInEmail.lastIndexOf('&') - 2,2);
    const fullRollNo = shortYear + 'X' + shortDept.toUpperCase() + 'XXX';
    const sampleYears = ['I', 'II', 'III', 'IV', 'PASSED OUT'];
    
    

        

    useEffect(() => {

        const dbRef = firebase.firestore().collection('Users').doc(userUid);
        dbRef.get().then((result) => {
            if(result.exists) {
                history.replace('/profile/verify');        
            }else{
                setIsFirstPartDone(false);
                setIsLoading(false);
            }
        });

    }, [userUid, history]);



    

    const handleFirstPartSubmit = () => {
        if(rollNo === ''){
            alert('Enter Your Roll No!');
            return;
        }else if(rollNo.length !== 8){
            alert('Enter a valid Roll No!');
            return;
        }else if(year === ''){
            alert('Choose a Year!');
            return;   
        }else if(!sampleYears.includes(year)){
            alert('Nice try Mr. Hacker!');
            window.location.href = '/';
            return;
        }
        setIsLoading(true);
        const dbRef = firebase.firestore().collection('Users').doc(userUid);
        dbRef.set({
            userId: userUid,
            userEmail: user.email,
            userName: user.displayName,
            userImage: user.photoURL,
            userDept: fullDept,
            userYear: year,
            userRollNo: rollNo,
        }).then((result) => {
            history.replace('/profile/verify');        
        }).catch((err) => {
            alert('Error in updating the Profile!');
            setIsLoading(false);
        });
    }


    
    if(isLoading) {
        return (
            <div className="updateProfile__container">
                <div className="updateProfile__wrapper">
                    <Loader />
                </div>
            </div>
        );
    }

    if(!isFirstPartDone){
       return (
        <div className="updateProfile__container">
            <div className="updateProfile__wrapper">
        
                <h2>Update Your Details</h2>
        
                <div className="updateProfile__progress">
                    <div className="updateProfile__progress_meter">
                        30%
                    </div>
                </div>

                <div className="updateProfile__general">
                    <div>
                        <h4>Full Name</h4>
                        <input type="text" defaultValue={fullName} disabled readOnly />
                    </div>
                    <div>
                        <h4>Roll Number</h4>
                        <input type="text" placeholder={"Eg: " + fullRollNo} onChange={(event) => setRollNo(event.target.value.trim())} />
                    </div>
                    <div>
                        <h4>Year</h4>
                        <select defaultValue="I" onChange={(event) => setYear(event.target.value.trim())}>
                            {
                                sampleYears.map((e,i) => {
                                    return (
                                        <option key={i} value={e}>{e}</option>
                                    );
                                })
                            }
                        </select>
                    </div>                    
                    <div>
                        <h4>Department</h4>
                        <input type="text" defaultValue={fullDept} disabled readOnly />
                    </div>
                </div>
                <div className="button updateProfile__button" onClick={handleFirstPartSubmit}>Update Profile</div>
            </div>
        </div>
     );
    }else{
        return <Route path="/profile/verify" component={PhoneAuthPage}></Route>;
    }
}
 
export default UpdateProfileContainer;