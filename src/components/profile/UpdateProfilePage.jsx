import React from 'react';
import HomeNavBar from '../home/HomeNavBar';
import UpdateProfileContainer from './UpdateProfileContainer';

const UpdateProfilePage = ({currentUser}) => {

    return (
        <React.Fragment>
            <HomeNavBar />
            <UpdateProfileContainer user={currentUser} />
        </React.Fragment>
    );
}
 
export default UpdateProfilePage;