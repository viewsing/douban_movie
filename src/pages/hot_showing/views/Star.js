import React from 'react';
import halfStar from '../../../static/half_star.svg';
import allStar from '../../../static/all_star.svg';
import negtiveStar from '../../../static/negtive_star.svg';

const star = {
    half: halfStar,
    all: allStar,
    negtive: negtiveStar
}

function Star ({score}) {
    return (
        <span className="star_score" style={{
            background: 'url(' + star[score] + ') 0 / 100% no-repeat' 
        }}></span>
    )
}

export default Star;
