import React, { useEffect, useState } from 'react';
import AdminFeedDetailsItem from '../general/adminFeedDetails';
import HomeNavBar from '../home/HomeNavBar';
import { data } from './../../configs/mainConfigs';
const AdminFeedDetailsPage = ({history, match}) => {
    
    const [isLoading, setIsLoading] = useState(true);  
    const feedId = match.params.id;  
    useEffect(() => {
        setIsLoading(false);
    },[]);
    
    const handleBackButton = () => {
        history.goBack();
    }


    return (
        <React.Fragment>
            <HomeNavBar/>
            <AdminFeedDetailsItem
                onBackButton={handleBackButton}
                feed={data.filter(e => e.feedId === feedId)}
                isLoading={isLoading}
            />
        </React.Fragment>
    );
}
 
export default AdminFeedDetailsPage;