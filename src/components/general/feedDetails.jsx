import React, { useEffect, useState } from 'react';
import Loader from './loadingPage';
import '../../feedDetails.css';
import noDataIllus from '../../assets/noDataIllus.svg';
import anonymousImage from '../../assets/anonymousImage.png';
import { getFormatedDateString } from './../../configs/mainConfigs';
import FeedComments from '../feed/FeedComments';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';

const FeedDetailsItem = ({feed, currentUser, isLoading, onBackButton, onStatusChange}) => {
    
    const currentFeed = feed;
    const [feedHistory, setFeedHistory] = useState([]);
    const [isHistoryLoading, setIsHistoryLoading] = useState(true);

    useEffect(() => {
        if(currentFeed.feedId){
            const dbRef = firebase.firestore().collection('Feeds').doc(currentFeed.feedId).collection('History');
            dbRef.orderBy('timestamp','desc').get().then((docs) => {
                const histories = [];
                docs.forEach((doc) => {
                    histories.push(doc.data());
                });
                setFeedHistory(histories);
                setIsHistoryLoading(false);
            }).catch((err) => {
                setIsHistoryLoading(false);
            });
        }
    },[currentFeed]);



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
                        <span>{currentFeed.userName}</span>
                    </div>
                    <div className="feedDetails__details__more">
                        <div className="feedDetails__details__tags">
                            {currentFeed.tags && currentFeed.tags.map((e,i) => <div key={i} className="feedDetails__details__tag">{e.toUpperCase()}</div>)}
                        </div>
                        <div className="feedDetails__details__date">
                            <span>{feedDate}</span>
                        </div>
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
                    <div className="feedDetails__details__desc">
                        {currentFeed.desc.split('\n').map((line,i) => <p key={i}>{line}</p>)}
                    </div>
                </div>
                <div className="feedDetails__commentsWrapper">
                    <div className="feedDetails__comments__title">Discussion</div>
                    <FeedComments isAnonymous={currentFeed.userName === 'Anonymous'} currentUser={currentUser} feedId={currentFeed.feedId} />
                </div>
            </div>
            <div className="feedDetails__confirmStatus">
                <h3>History</h3>
                <div className="feedDetails__Wrapper">
                    
                    {
                        isHistoryLoading ? <Loader /> :
                        feedHistory.length > 0 ? (
                            feedHistory.map((historyItem, i) => {
                                const histDate = getFormatedDateString(new Date(historyItem.timestamp.seconds * 1000));

                                return (
                                    <div key={i} className="feedDetails__histroy__item">
                                        <div className="feedDetails__histroy__time">{histDate}</div>
                                        <span className="feedDetails__histroy__adminName">{historyItem.adminName}</span>
                                        <span> marked the feed as </span>
                                        <span className={"feedDetails__histroy__status" + (i === 0 ? ' first' : '')}>{historyItem.status.toUpperCase()}</span>
                                    </div>        
                                );
                            })
                        ):(
                            <div className="feedDetails__history__noData">
                                <img src={noDataIllus} alt="No data"/>
                                <h4>No History Found!</h4>
                            </div>
                        )
                    }
                </div>
            </div>
        </div> 
    );
}
 
export default FeedDetailsItem;