import React, { useState } from 'react';
import Loader from './loadingPage';
import '../../addNewFeed.css';
const AddNewFeedWrapper = ({onBackButton, onAddNewFeed, isLoading}) => {

    const [addNewFeedData, setAddNewFeedData] = useState({
        title: '',
        desc: '',
        agree: false,
        anonymous: false
    });
    const [newFeedTags, setNewFeedTags] = useState([]);

    const tagDepartments = ['Academics', 'Administration', 'Examination', 'Food', 'Hostel', 'Infrastructure', 'Placement', 'Rewards', 'SDC-CAMPS', 'Skills', 'Special Lab', 'Transport'];
    
    const handleOnSubmit = () => {

        if(!addNewFeedData['title'].trim()){
            alert("Enter a valid title!");
            return;
        }else if(!addNewFeedData['desc'].trim()){
            alert("Enter a valid description!");
            return;
        }else if(newFeedTags.length > 2){
            alert("Choose only max of 2 departments!");
            return;
        }
        else if(!addNewFeedData['agree']){
            alert("Oops! You didn't agree to terms!")
            return;
        }
        const feedData = {
            ...addNewFeedData,
            tags: newFeedTags
        };
        onAddNewFeed(feedData);
    };

    if(isLoading) return <Loader />;

    return (
        <div className="addNewFeed__container">
            <div className="addNewFeed__info">
                <div className="addNewFeed__header">
                    <i onClick={onBackButton} className="fa fa-arrow-left" aria-hidden="true"></i>
                    <h3>New Feed</h3>
                </div>
                <div className="addNewFeed__Wrapper">
                    <form className="addNewFeed__wrapper__form">
                        <div className="addNewFeed__form__item">
                            <label htmlFor="addNewFeed_title">Title</label>
                            <span>Be precise to the issue</span>
                            <textarea value={addNewFeedData.title} onChange={(event) => {
                                setAddNewFeedData((prev) => {
                                    return {...prev, title: event.target.value};
                                });
                            }} id="addNewFeed_title"/>
                        </div>
                        <div className="addNewFeed__form__item addNewFeed__form__desc">
                            <label htmlFor="addNewFeed_desc">Description</label>
                            <span>Explain briefly about the issue</span>
                            <textarea value={addNewFeedData.desc} onChange={(event) => {
                                setAddNewFeedData((prev) => {
                                    return {...prev, desc: event.target.value};
                                });
                            }} id="addNewFeed_desc"/>
                        </div>
                        <div className="addNewFeed__form__item addNewFeed__form__tag">
                            <label>Tag Department</label>
                            <span>Tag max. of 2 departments</span>
                            <div className="addNewFeed__form__option">
                                {
                                tagDepartments.map((e) => {
                                    return (
                                        <div key={e} className="addNewFeed__form__option__item">
                                            <input onChange={
                                                (event) => {
                                                        setNewFeedTags((prev) => {
                                                            const newTags = prev;
                                                            if(event.target.checked){
                                                                newTags.push(e.toLowerCase());
                                                                return newTags;
                                                            }else{
                                                                return newTags.filter((a) => a !== e.toLowerCase());
                                                            }
                                                        });
                                                }
                                            }
                                            type="checkbox" id={e.toLowerCase()} name="addNewFeed_tag"/>
                                            <label htmlFor={e.toLowerCase()}>{e.toUpperCase()}</label>
                                        </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="addNewFeed__confirmPost">
                <h3>Confirm Details</h3>
                <div className="addNewFeed__PostWrapper">
                    <div className="addNewFeed__confirm__item">
                        <input type="checkbox"
                            name="addNewFeed_confirm"
                            onClick={(event) => {
                                setAddNewFeedData((prev) => {
                                    return {...prev, anonymous: event.target.checked};
                                });
                            }}
                            id="addNewFeed__privacy"/>
                        <label htmlFor="addNewFeed__privacy">Make this feed as Anonymous</label>
                    </div>
                    <div className="addNewFeed__confirm__item">
                        <input type="checkbox" name="addNewFeed_confirm"
                            onClick={(event) => {
                                setAddNewFeedData((prev) => {
                                    return {...prev, agree: event.target.checked};
                                });
                            }}
                            id="addNewFeed__terms"/>
                        <label htmlFor="addNewFeed__terms">I hereby declare that the above mentioned information is correct to the best of my knowledge and I bear the responsibility for the correctness of the above mentioned particulars.</label>
                    </div>
                    <div className="addNewFeed__confirm__button">
                        <span onClick={handleOnSubmit} className="button">Post</span>
                        <span onClick={onBackButton} className="button">Cancel</span>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
 
export default AddNewFeedWrapper;