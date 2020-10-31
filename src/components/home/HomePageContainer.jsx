import React, { useState } from 'react';
import '../../feeds.css';
import noDataIllus from '../../assets/noDataIllus.svg';
import Loader from './../general/loadingPage';
import AdminFeedItem from './../general/adminFeedItem';
const HomePageContainer = ({isLoading, onFeedItemClick, feeds}) => {

    const [currentFilter, setCurrentFilter] = useState('all');

    if(isLoading == null) return <div className="feed__container">Error!</div>;
    if(isLoading) return <Loader></Loader>;
    if(feeds.length === 0){
     return (
            <div className="noData__container">
                <img src={noDataIllus} alt="No Data Found"/>
                <h2>No Feeds Found</h2>
            </div>
        );
    }

    return (
        <div className="feed__container">
            <div className="feed__recentfeeds">
                <h3>Recent Feeds</h3>
                <div className="feed__recentList">
                    { feeds.map((e,i)=><AdminFeedItem onFeedItemClick={onFeedItemClick} key={i} feed={e} />) }
                </div>
            </div>
            <div className="feed__feedsfilter">
                <h3>Filter</h3>
                <div className="feed__feedsWrapper">
                    <ul>
                        <li>
                            <input type="checkbox"
                                onChange={() => setCurrentFilter('all')}
                                defaultChecked={currentFilter === 'all'} id="all-queries" name="filter" />
                            <label htmlFor="all-queries">All</label>
                        </li>
                        <li>
                            <input type="checkbox"
                                onChange={() => setCurrentFilter('solved')}
                                id="solved" name="filter" />
                            <label htmlFor="solved">Solved</label>
                        </li>
                        <li>
                            <input type="checkbox"
                                onChange={() => setCurrentFilter('partial')}
                                id="partial" name="filter" />
                            <label htmlFor="partial">Partial</label>
                        </li>
                        <li>
                            <input type="checkbox"
                                onChange={() => setCurrentFilter('unsolved')}
                                id="unsolved" name="filter" />
                            <label htmlFor="unsolved">Unsolved</label>
                        </li>
                        <li>
                            <input type="checkbox"
                                onChange={() => setCurrentFilter('rejected')}
                                id="rejected" name="filter" />
                            <label htmlFor="rejected">Rejected</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default HomePageContainer;