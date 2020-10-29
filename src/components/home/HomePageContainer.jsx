import React from 'react';
import '../../feeds.css';
import Loader from './../general/loadingPage';
import AdminFeedItem from './../general/adminFeedItem';
import { data } from './../../configs/mainConfigs';
const HomePageContainer = ({isLoading, onFeedItemClick}) => {

    
   
    if(isLoading) return <Loader></Loader>;

    return (
        <div className="feed__container">
            <div className="feed__recentfeeds">
                <h3>Recent Feeds</h3>
                <div className="feed__recentList">
                    { data.map((e,i)=><AdminFeedItem onFeedItemClick={onFeedItemClick} key={i} {...e} />) }
                </div>
            </div>
            <div className="feed__feedsfilter">
                <h3>Filter</h3>
                <div className="feed__feedsWrapper">
                    <ul>
                        <li>
                            <input type="checkbox" id="all-queries" name="all-queries" />
                            <label htmlFor="all-queries">All</label>
                        </li>
                        <li>
                            <input type="checkbox" id="solved" name="solved" />
                            <label htmlFor="solved">Solved</label>
                        </li>
                        <li>
                            <input type="checkbox" id="partial" name="partial" />
                            <label htmlFor="partial">Partial</label>
                        </li>
                        <li>
                            <input type="checkbox" id="unsolved" name="unsolved" />
                            <label htmlFor="unsolved">Unsolved</label>
                        </li>
                        <li>
                            <input type="checkbox" id="rejected" name="rejected" />
                            <label htmlFor="rejected">Rejected</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default HomePageContainer;