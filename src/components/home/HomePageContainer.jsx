import React, { useEffect, useState } from 'react';
import '../../feeds.css';
import Loader from './../general/loadingPage';
const HomePageContainer = (props) => {

    const [isLoading, setIsLoading] = useState(true);    
    useEffect(() => {
        setIsLoading(false);
    },[]);
    if(isLoading) return <Loader></Loader>;

    return (
        <div className="feed__container">
            <div className="feed__recentfeeds">
                <h3>Recent Feeds</h3>
                <div className="feed__recentList">
                    <div className="feed__recentItem has_image">
                        <div className="feed__recentItem__details">
                            <div className="feed__recentItem__details__title">
                                My CAMPS is not working! I logged in but not working!
                                My CAMPS is not working! I logged in but not working!
                            </div>
                            <div className="feed__recentItem__details__more">
                                <div className="feed__recentItem__details__tags">
                                    <div className="feed__recentItem__details__more__tag">SDC</div>
                                </div>
                                <div className="feed__recentItem__details__time">
                                    <span>25 Oct 2020 7:00 PM</span>
                                </div>
                            </div>
                        </div>
                        <div className="feed__recentItem__image">
                            <img src="https://via.placeholder.com/320x200" alt="Feed"/>
                        </div>
                    </div>
                    
                    


                    <div className="feed__recentItem">
                        <div className="feed__recentItem__details">
                            <div className="feed__recentItem__details__title">
                                I paid the fees, but transaction failed.
                            </div>
                            <div className="feed__recentItem__details__more">
                                <div className="feed__recentItem__details__tags">
                                    <div className="feed__recentItem__details__more__tag">ADMINISTRATATION</div>
                                    <div className="feed__recentItem__details__more__tag">SDC</div>
                                </div>
                                <div className="feed__recentItem__details__time">
                                    <span>25 Oct 2020 6:24 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="feed__recentItem has_image solved">
                        <div className="feed__recentItem__details">
                            <div className="feed__recentItem__details__title">
                                Please change online class schedule.
                            </div>
                            <div className="feed__recentItem__details__more">
                                <div className="feed__recentItem__details__tags">
                                    <div className="feed__recentItem__details__more__tag">MANAGEMENT</div>
                                </div>
                                <div className="feed__recentItem__details__time">
                                    <span>25 Oct 2020 7:00 PM</span>
                                </div>
                            </div>
                        </div>
                        <div className="feed__recentItem__image">
                            <img src="https://via.placeholder.com/320x200" alt="Feed"/>
                        </div>
                    </div>
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