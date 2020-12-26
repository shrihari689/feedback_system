import React from 'react';
import '../../help.css';
import Loader from '../general/loadingPage';


const HelpPageContainer = ({ isLoading }) => {

    const questions = [
        {
            question : "What is a feed?",
            answer: "A feed is Query / Suggestion / Feedback with the maximum of two department tags to solve the issue / address the query and keep track of it.   "
        },
        {
            question : "Is there any stages for the feed?",
            answer: "There are five different stages namely,\n'Unsolved' - Once the Feed is Posted\n'Opened' - Once the respective department has seen the feed\n'Partial' - Once the issue / query is started being processed\n'Solved' - If the issue / query is solved\n'Rejected' - If a feed contains inappropriate information and not subjected to the guidelines"
        },
    ];

    if(isLoading) return <Loader />;

    return ( 
        <div className="help__container">
            <div className="help__container__wrapper">
                <div className="help__container__title">
                    <h2>Frequently Asked Questions (FAQs)</h2>
                </div>
                <section className="help__container__questions__list">
                    {questions.map((e,d) => {
                        return (
                            <div className="help__question" key={d}>
                                <div className="help__question__title">{e.question}</div>
                                <div className="help__question__answer">{e.answer.split('\n').map((i,k) => <p key={k}>{i}</p>)}</div>
                            </div>
                        );   
                    })}
                </section>
            </div>
        </div>
    );
}
 
export default HelpPageContainer;