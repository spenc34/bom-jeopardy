import React from 'react';
import '../css/Score.css';

const Score = (props) => {

    let className = '';
    let dollarSign = '$';
    let modifier = 1;

    if (props.score < 0) {
        className = 'negative-score';
        dollarSign = '-$'
        modifier = -1;
    }

    return (
        <div className="Score">
            <span id={className}>Score: {dollarSign}{props.score * modifier}</span>
        </div>
    )
};

export default Score;