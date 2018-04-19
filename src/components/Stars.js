import React from 'react';
import halfStar from '../static/half_star.svg';
import allStar from '../static/all_star.svg';
import negtiveStar from '../static/negtive_star.svg';

/**
 * 功能是展示星星
 */
const star = {
    half: halfStar,
    all: allStar,
    negtive: negtiveStar
}

function getStars (starsStr) {
    //返回的星星组件
    const retStars = [];
    //点亮星星数
    const allStrNum = parseInt(starsStr[0], 10);
    //总共五颗星
    let totalNum = 5;
    if (starsStr.length > 1) {
        retStars.push(
            <Star score="half" key="5" />
        );
        totalNum --;
    }
    for (let i=1; i <= totalNum; i++) {
        if (i <= allStrNum) {
            retStars.unshift(
                <Star score="all" key={i} />
            );
        } else {
            retStars.push(
                <Star score="negtive" key={i} />
            );
        }
    }
    return retStars;
}

function Star ({score}) {
    return (
        <span className="star_score" style={{
            background: 'url(' + star[score] + ') 0 / 100% no-repeat' 
        }}></span>
    )
}

function Stars ({stars}) {
    return (
        <p className="movieScore">{getStars(stars)}</p>
    )
}

export default Stars;
