import React, { useEffect, useState } from 'react';
import HomeNavBar from '../home/HomeNavBar';
import AdminHelpPageContainer from './AdminHelpPageContainer';
const AdminHelpPage = ({user}) => {

    const [isLoading, setIsLoading] = useState(true);    
    
    useEffect(() => {
        setIsLoading(false);
    },[]);  

    return (
        <React.Fragment>
            <HomeNavBar isAdmin={true} user={user} />
            <AdminHelpPageContainer isLoading={isLoading} />
        </React.Fragment>
    );
}
 
export default AdminHelpPage;