import React, { useState } from 'react';
import Loader from './loadingPage';
import '../../feedDetails.css';
const AdminFeedDetailsItem = ({feed, isLoading, onBackButton, onStatusChange}) => {
    const currentFeed = feed[0];
    const [newStatus, setNewStatus] = useState('partial') ;
   
    if(isLoading) return <Loader/>;
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
                    <div className="feedDetails__details__more">
                        <div className="feedDetails__details__tags">
                            {currentFeed.tags && currentFeed.tags.map((e,i) => <div key={i} className="feedDetails__details__tag">{e.toUpperCase()}</div>)}
                        </div>
                        <div className="feedDetails__details__date">
                            <span>25 Oct 2020 7:00 PM</span>
                        </div>
                    </div>
                    { currentFeed.hasImage ?
                        (
                            <div className="feedDetails__details__image">
                                <img src={currentFeed.hasImage} alt={`${currentFeed.title} Reference`}/>
                            </div>
                        ):
                        null
                    }
                    <div className="feedDetails__details__desc">
                        {currentFeed.description}
                    </div>
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
                        <select defaultValue='partial' onChange={({target}) => setNewStatus(target.value)}>
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