import React, { useEffect, useState } from 'react';
import HomeNavBar from '../home/HomeNavBar';
import HelpPageContainer from './HelpPageContainer';
const HelpPage = () => {

    const [isLoading, setIsLoading] = useState(true);    
    
    useEffect(() => {
        setIsLoading(false);
    },[]);  

    return (
        <React.Fragment>
            <HomeNavBar/>
            <HelpPageContainer isLoading={isLoading} />
        </React.Fragment>
    );
}
 
export default HelpPage;