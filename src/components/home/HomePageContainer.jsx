import React, { useState } from 'react';
import '../../feeds.css';
import noDataIllus from '../../assets/noDataIllus.svg';
import Loader from '../general/loadingPage';
import AdminFeedItem from '../general/adminFeedItem';
import { Link } from 'react-router-dom';
const HomePageContainer = ({isLoading, onFeedItemClick, feeds}) => {

    const [currentFilter, setCurrentFilter] = useState('all');
    if(isLoading == null) return <div className="feed__container">Error!</div>;
    if(isLoading) return <Loader></Loader>;
   
    
    const filteredFeeds = {
        'all' : feeds,
        'solved' : feeds.filter((e) => e.status === 'solved'),
        'unsolved' : feeds.filter((e) => e.status === 'unsolved'),
        'partial' : feeds.filter((e) => e.status === 'partial'),
        'rejected' : feeds.filter((e) => e.status === 'rejected')
    };

    feeds = filteredFeeds[currentFilter];

    return (
        <div className="feed__container">
            <div className="feed__recentfeeds">
                <div className="feed__recentHeader">
                    <h3>My Feeds</h3>
                    <Link to="/feed/new" className="feed-button"> <i className="fa fa-plus"></i> New Feed</Link>
                </div>
                <div className="feed__recentList">
                    { feeds.map((e,i) => <AdminFeedItem onFeedItemClick={onFeedItemClick} key={i} feed={e} />) }
                    { feeds.length === 0 ? (
                        <div className="noData__container inside">
                            <div className="noData__wrapper">
                                <img src={noDataIllus} alt="No Data Found"/>
                                <h2>No Feeds Found</h2>
                                <span>Start a New Feed by tapping on 'New Feed' button!</span>
                            </div>
                        </div>  
                    ): null}
                </div>
            </div>
            <div className="feed__feedsfilter">
                <h3>Filter</h3>
                <div className="feed__feedsWrapper">
                    <ul>
                        <li>
                            <input type="radio"
                                defaultChecked="true"
                                onChange={() => setCurrentFilter('all')}
                                id="all-queries" name="filter" />
                            <label htmlFor="all-queries">All</label>
                            <span className="feed__filter__badge">{filteredFeeds.all.length}</span>
                        </li>
                        <li>
                            <input type="radio"
                                onChange={() => setCurrentFilter('solved')}
                                id="solved" name="filter" />
                            <label htmlFor="solved">Solved</label>
                            <span className="feed__filter__badge">{filteredFeeds.solved.length}</span>
                        </li>
                        <li>
                            <input type="radio"
                                onChange={() => setCurrentFilter('partial')}
                                id="partial" name="filter" />
                            <label htmlFor="partial">Partial</label>
                            <span className="feed__filter__badge">{filteredFeeds.partial.length}</span>
                        </li>
                        <li>
                            <input type="radio"
                                onChange={() => setCurrentFilter('unsolved')}
                                id="unsolved" name="filter" />
                            <label htmlFor="unsolved">Unsolved</label>
                            <span className="feed__filter__badge">{filteredFeeds.unsolved.length}</span>
                        </li>
                        <li>
                            <input type="radio"
                                onChange={() => setCurrentFilter('rejected')}
                                id="rejected" name="filter" />
                            <label htmlFor="rejected">Rejected</label>
                            <span className="feed__filter__badge">{filteredFeeds.rejected.length}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default HomePageContainer;