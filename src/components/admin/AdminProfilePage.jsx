import React, { useEffect, useState } from 'react';
import HomeNavBar from '../home/HomeNavBar';
import '../../profile.css';
import Loader from './../general/loadingPage';
import  firebase  from 'firebase/app';
import 'firebase/firebase-firestore';
import { useHistory } from 'react-router-dom';

const AdminProfilePage = ({match, user}) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const history = useHistory();
    const userId = match.params.id;
    

    useEffect(() => {
        const dbRef = firebase.firestore().collection('Users').doc(userId);
        dbRef.get().then((result) => {
            if(result.exists) {
                setUserData(result.data());
                setIsLoading(false);
            }else{
                history.replace('/');
            }
        }).catch((err) => {
            alert("Error in Getting the Details!");
            history.replace('/');
        });
    }, [userId, history]);
    
    if(isLoading){
        return (
            <React.Fragment>        
                <HomeNavBar isAdmin={true} user={user} />
                <Loader />
            </React.Fragment>
        );
    }

    return ( 
        <React.Fragment>
            <HomeNavBar />
            <div className="profilePage__container">
                <div className="profilePage__image">
                    <img src={userData.userImage} alt="Profile"/>
                </div>
                <div className="profilePage__main">
                    <div className="profilePage__name">
                        {userData.userName}
                    </div>
                    <div className="profilePage__rollNo">
                        {userData.userRollNo}
                    </div>
                    <div className="profilePage__dept">
                        <i className="fa fa-building"></i>
                        <span>{userData.userDept}</span>
                    </div>
                </div>
            </div>
            <div className="profilePage__container">
                <a href={`mailto:${userData.userEmail}`} className="profilePage__email">
                    <i className="fa fa-envelope"></i>
                    <div>Email Address</div>
                    <span>{userData.userEmail}</span>
                </a>
                <a href={`tel:${userData.userPhone}`} className="profilePage__email profilePage__phone">
                    <i className="fa fa-phone"></i>
                    <div>Phone Number</div>
                    <span>+91 {userData.userPhone?.replace('+91','')}</span>
                </a>
            </div>
        </React.Fragment>
    );
}
 
export default AdminProfilePage;