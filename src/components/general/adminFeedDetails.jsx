import React, { useState } from 'react';
import Loader from './loadingPage';
import '../../feedDetails.css';
import anonymousImage from '../../assets/anonymousImage.png';
import { getFormatedDateString } from './../../configs/mainConfigs';
import FeedComments from '../feed/FeedComments';
import { Link } from 'react-router-dom';

const AdminFeedDetailsItem = ({feed, currentUser, isLoading, onBackButton, onStatusChange}) => {
    const [newStatus, setNewStatus] = useState('partial') ;
    const currentFeed = feed;
    
    if(isLoading || !currentFeed) return <Loader/>;
    const feedDate = getFormatedDateString(new Date(currentFeed.date.seconds * 1000));
    
    return (   
        <div className="feedDetails__container">
            <div className="feedDetails__info">
                <div className="feedDetails__header">
                    <i onClick={onBackButton} className="fa fa-arrow-left" aria-hidden="true"></i>
                    <h3>Feed Details</h3>
                </div>
                <div className="feedDetails__detailsWrapper__header">
                    <div className="feedDetails__detailsWrapper__header__item">
                        #{currentFeed.feedId}
                    </div>
                </div>
                <div className="feedDetails__detailsWrapper">
                    <div className="feedDetails__details__title">
                        {currentFeed.title}
                    </div>
                    <div className="feedDetails__details__profile__item">
                        <img
                        src={ currentFeed.userName === 'Anonymous' ? anonymousImage : currentFeed.userImage}
                        alt={`${currentFeed.userName} Profile`}/>
                        {
                            currentFeed.userName === 'Anonymous' ? 
                            <span>{currentFeed.userName}</span> : <Link to={`/admin/profile/${currentFeed.userId}`}>{currentFeed.userName}</Link>
                        }
                    </div>
                    <div className="feedDetails__details__more">
                        <div className="feedDetails__details__tags">
                            {currentFeed.tags && currentFeed.tags.map((e,i) => <div key={i} className="feedDetails__details__tag">{e.toUpperCase()}</div>)}
                        </div>
                        <div className="feedDetails__details__date">
                            <span>{feedDate}</span>
                        </div>
                    </div>
                    <div className="feedDetails__details__desc">
                        {currentFeed.desc.split('\n').map((line,i) => <p key={i}>{line}</p>)}
                    </div>
                    { currentFeed.hasImage && (currentFeed.hasImage.length > 0) ?
                        (
                            <div className="feedDetails__details__image">
                                {
                                    currentFeed.hasImage.map((image, i) => {
                                        return (
                                            <img key={i} src={`/uploads/${image}`} 
                                                alt={`${currentFeed.title} Reference`}/>
                                        );
                                    })
                                }
                            </div>
                        ):
                        null
                    }
                    
                </div>
                <div className="feedDetails__commentsWrapper">
                    <div className="feedDetails__comments__title">Discussion</div>
                    <FeedComments isAnonymous={currentFeed.userName === 'Anonymous'} currentUser={currentUser} feedId={currentFeed.feedId} />
                </div>
            </div>
            <div className="feedDetails__confirmStatus">
                <h3>Status</h3>
                <div className="feedDetails__Wrapper">
                    <div className="feedDetails__progress">
                        <div style={{'animationName': currentFeed.status}}>
                            {currentFeed.status?.toUpperCase()}
                        </div>
                    </div>
                    <div className="feedDetails__changeStatus">
                        <select defaultValue={currentFeed.status} onChange={({target}) => setNewStatus(target.value)}>
                            <option value="partial">Partial</option>
                            <option value="solved">Solved</option>
                            <option value="rejected">Rejected</option>
                            <option value="unsolved">Unsolved</option>
                            <option value="opened">Opened</option>
                        </select>
                        <div>
                            <span onClick={() => onStatusChange(currentFeed.feedId, newStatus)} className="button">Confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}
 
export default AdminFeedDetailsItem;