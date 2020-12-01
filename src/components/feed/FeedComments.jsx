import React, { useEffect, useState } from 'react';
import firebase  from 'firebase/app';
import 'firebase/firebase-firestore';
import { anonymousImage, getFormatedDateString, sampleAdmins } from './../../configs/mainConfigs';
import Loader from './../general/loadingPage';
const FeedComments = ({feedId, currentUser, isAnonymous}) => {
    
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const isAdmin = !currentUser.email.replace("@bitsathy.ac.in", "").includes(".") || sampleAdmins.includes(currentUser.email);


    useEffect(() => {
        const dbRef = firebase.firestore().collection('Feeds').doc(feedId).collection('Comments');
        dbRef.get().then((docs) => {
            const result = [];
            docs.forEach((e) => {
               result.unshift({commentId: e.id, ...e.data()});
            });
            setComments(result);
            setIsLoading(false);
        }).catch((err) => {
            alert("Error in Loading Comments");
        });

        const unsubscribe = dbRef.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    const comment =  {commentId: change.doc.id, ...change.doc.data({serverTimestamps:'estimate'})};
                    setComments((prev) => [comment, ...prev]);
                }else if(change.type === 'removed'){
                    const comment =  {commentId: change.doc.id};
                    setComments((prev) => prev.filter((item) => item.commentId !== comment.commentId));
                }
            });
        });
        return () => {
            unsubscribe();
        };
    },[feedId]);
    



    const handleAddNewComment = () => {
        const newCommentValue = newComment.trim();
        if(newCommentValue !== '' && currentUser != null){       
            setNewComment('');
            const dbRef = firebase.firestore().collection('Feeds').doc(feedId).collection('Comments');
            dbRef.add({
                date: firebase.firestore.FieldValue.serverTimestamp(),
                userName: isAdmin ? currentUser.displayName : isAnonymous ? 'Anonymous' : currentUser.displayName,
                userImage: isAdmin? currentUser.photoURL : isAnonymous ? anonymousImage : currentUser.photoURL,
                userId: currentUser.uid,
                message: newCommentValue
            }).then((res) => {
                document.getElementById('feedDetails__comment__view').scrollIntoView({behavior: 'smooth'});
            }).catch((err) => {
                alert("Error in Posting the Comment!");
            });
        }else{
            alert("Don't Leave it Empty!");
        }
    };

    
    const handleDeleteComment = (commentId) => {
        
        if(!window.confirm("Are you sure want to delete the comment?")) return;
        
        const dbRef = firebase.firestore().collection('Feeds').doc(feedId).collection('Comments');
        dbRef.doc(commentId).delete().then((result) => {
        }).catch((err) => {
            alert("Error in Deleting the Comment!");
        });
    }

    
    if(isLoading) return <div className="feed__comments__loading"><Loader /></div>;
    
    return (
        <React.Fragment>
            <div id="feedDetails__comment__view" className="feedDetails__comment__input">
                <div className="feedDetails__comment__image">
                    <img src={currentUser.photoURL} alt="Profile"/>
                </div>
                <div className="feedDetails__comment__textarea">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => {
                            if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter')) {
                                handleAddNewComment();
                            }
                        }}></textarea>
                </div>
                <div className="feedDetails__comment__button">
                    <div onClick={handleAddNewComment} className="button">Post</div>
                    <span>(Ctrl + Enter)</span>
                </div>
            </div>
            {
                comments.sort((a, b) => b.date?.seconds - a.date?.seconds).map((e, i) => {
                    return (
                        <div key={i} className="feedDetails__comment__container">
                            <div className="feedDetails__comment__image">
                                <img src={e.userImage} alt="Profile"/>
                            </div>
                            <div className="feedDetails__comment__details">
                                <div className="feedDetails__comment__details__name">
                                    {e.userName}
                                    <span>{getFormatedDateString(new Date(e.date?.seconds * 1000))}</span>
                                </div>
                                <div className="feedDetails__comment__details__info">
                                    {e.message}
                                </div>
                            </div>
                            {
                                e.userId === currentUser.uid ? (
                                    <div onClick={() => handleDeleteComment(e.commentId)} className="feedDetails__comment__delete">
                                        <i className="fa fa-trash"></i>
                                    </div>
                                ): null
                            }
                        </div>
                    );
                })
            }
        </React.Fragment>
    );
}
 
export default FeedComments;