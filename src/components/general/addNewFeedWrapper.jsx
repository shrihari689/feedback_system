import React from 'react';
import Loader from './loadingPage';
import '../../addNewFeed.css';
const AddNewFeedWrapper = ({onBackButton, onAddNewwFeed, isLoading}) => {

    const tagDepartments = ['Academics', 'Administration', 'Examination', 'Food', 'Hostel', 'Infrastructure', 'Placement', 'Rewards', 'SDC-CAMPS', 'Skills', 'Special Lab', 'Transport'];

    const handleOnSubmit = () => {

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
                            <textarea id="addNewFeed_title"/>
                        </div>
                        <div className="addNewFeed__form__item addNewFeed__form__desc">
                            <label htmlFor="addNewFeed_desc">Description</label>
                            <span>Explain briefly about the issue</span>
                            <textarea id="addNewFeed_desc"/>
                        </div>
                        <div className="addNewFeed__form__item addNewFeed__form__tag">
                            <label>Tag Department</label>
                            <span>Tag max. of 2 departments</span>
                            <div className="addNewFeed__form__option">
                                {
                                tagDepartments.map((e) => {
                                    return (<div  key={e} className="addNewFeed__form__option__item">
                                                <input type="checkbox" id={e.toLowerCase()} name="addNewFeed_tag"/>
                                                <label htmlFor={e.toLowerCase()}>{e.toUpperCase()}</label>
                                            </div>);
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
                        <input type="checkbox" name="addNewFeed_confirm" id="addNewFeed__privacy"/>
                        <label htmlFor="addNewFeed__privacy">Make this feed as Anonymous</label>
                    </div>
                    <div className="addNewFeed__confirm__item">
                        <input type="checkbox" name="addNewFeed_confirm" id="addNewFeed__terms"/>
                        <label htmlFor="addNewFeed__terms">I hereby declare that the above mentioned information is correct to the best of my knowledge and I bear the responsibility for the correctness of the above mentioned particulars.</label>
                    </div>
                    <div className="addNewFeed__confirm__button">
                        <span className="button">Post</span>
                        <span className="button">Cancel</span>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
 
export default AddNewFeedWrapper;