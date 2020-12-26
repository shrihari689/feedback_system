import React from 'react';
import HomeNavBar from './../home/HomeNavBar';
import AdminManageUsersContainer from './adminManageUsersContainer';

const AdminManageUsers = ({user}) => {
    return (
        <React.Fragment>
            <HomeNavBar isAdmin={true} user={user}></HomeNavBar>
            <AdminManageUsersContainer  />
        </React.Fragment>
    );
}
 
export default AdminManageUsers;
