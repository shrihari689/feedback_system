import React from 'react';
import '../../feeds.css';
const HomePageContainer = (props) => {
    return (
        <div className="feed__container">
            <div className="feed__recentfeeds">
                <h3>Recent Feeds</h3>
                <div className="feed__recentList">
                    <div className="feed__recentItem">
                        <div className="feed__recentItem__details">
                            
                        </div>
                        <div className="feed__recentItem__image">
                            <img src="https://picsum.photos/300/200" alt="Feed"/>
                        </div>
                    </div>
                    <div className="feed__recentItem"></div>
                    <div className="feed__recentItem"></div>
                    <div className="feed__recentItem"></div>
                    <div className="feed__recentItem"></div>
                    <div className="feed__recentItem"></div>
                </div>
            </div>
            <div className="feed__feedsfilter">
                <div className="feed__feedsWrapper">
                </div>
            </div>
        </div>
    );
}
 
export default HomePageContainer;