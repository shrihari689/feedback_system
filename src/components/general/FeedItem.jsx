import React from 'react';
import { Link } from 'react-router-dom';
import anonymousImage from '../../assets/anonymousImage.png';
import { backendFeedItemImage, getFormatedDateString } from './../../configs/mainConfigs';
const FeedItem = (props) => {
    const { hasImage, title, tags, status, feedId, date, userName, userImage } = props.feed;
    
    let feedItemStyle = "feed__recentItem ";
    feedItemStyle += (hasImage && (hasImage.length > 0) ? 'has_image ' : '');
    feedItemStyle += (status != null ? `${status} ` : '');

    const feedDate = getFormatedDateString(new Date(date.seconds * 1000));

    const progress = {
        'solved': '100%',
        'opened': '50%',
        'unsolved': '30%',
        'partial': '75%',
        'rejected': '100%',
    };

    return (
        <Link to={{
            pathname: `/feed/${feedId}`,
            state: props.feed
        }} className={feedItemStyle}>
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
                <div className="feed__recentItem__details__profile">
                    <img src={ userName === 'Anonymous' ? anonymousImage : userImage} alt="Profile"/>
                    <span>{userName}</span>
                </div>
                <div className="feed__recentItem__details__more">
                    <div className="feed__recentItem__details__tags">
                        {tags && tags.sort().map((e,i) => <div key={i} className="feed__recentItem__details__more__tag">{e.toUpperCase()}</div>)}
                    </div>
                    <div className="feed__recentItem__details__time">
                        <span>{feedDate}</span>
                    </div>
                </div>
            </div>
            {hasImage && hasImage.length > 0 ? <div className="feed__recentItem__image">
                <img src={`${backendFeedItemImage}/${hasImage[0]}`} alt="Feed"/>
            </div>:''}
        </Link>
    );
}
 
export default FeedItem;