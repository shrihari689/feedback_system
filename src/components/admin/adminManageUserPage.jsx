import React from 'react';
import HomeNavBar from './../home/HomeNavBar';
import AdminManageUsersContainer from './adminManageUsersContainer';

const AdminManageUsers = () => {
    return (
        <React.Fragment>
            <HomeNavBar isAdmin={true}></HomeNavBar>
            <AdminManageUsersContainer  />
        </React.Fragment>
    );
}
 
export default AdminManageUsers;
