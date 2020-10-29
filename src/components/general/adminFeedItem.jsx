import React from 'react';
const AdminFeedItem = ({ hasImage, title, tags, status, feedId, onFeedItemClick }) => {
    
    let feedItemStyle = "feed__recentItem ";
    feedItemStyle += (hasImage ? 'has_image ' : '');
    feedItemStyle += (status != null ? `${status} ` : '');

    const progress = {
        'solved': '100%',
        'opened': '50%',
        'unsolved': '30%',
        'partial': '75%',
        'rejected': '100%',
    };

    const handleClick = () => {
        onFeedItemClick(feedId);
    };

    return (
        <div onClick={handleClick} className={feedItemStyle}>
            <div className="feed__recentItem__details">
                <div className="feed__recentItem__details__title">
                    {title}
                </div>
                <div className="feed__recentItem__details__level">
                    <div className="feed__recentItem__details__id">
                        {`#${feedId}`}
                    </div>
                    <div className="feed__recentItem__details__status">
                        <div style={{'width': progress[status]}} className="feed__recentItem__details__status__progress">
                            <span>{status?.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
                <div className="feed__recentItem__details__more">
                    <div className="feed__recentItem__details__tags">
                        {tags && tags.map((e,i) => <div key={i} className="feed__recentItem__details__more__tag">{e.toUpperCase()}</div>)}
                    </div>
                    <div className="feed__recentItem__details__time">
                        <span>25 Oct 2020 7:00 PM</span>
                    </div>
                </div>
            </div>
            {hasImage ? <div className="feed__recentItem__image">
                <img src={hasImage} alt="Feed"/>
            </div>:''}
        </div>
    );
}
 
export default AdminFeedItem;