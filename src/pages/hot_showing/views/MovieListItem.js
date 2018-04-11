import React from 'react';
import Star from './Star.js';

function getStars (starsStr) {
    //返回的星星组件
    const retStars = [];
    //点亮星星数
    const allStrNum = parseInt(starsStr[0]);
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

function MovieListItem ({title, picUrl, directors, casts, collect_count, stars}) {
    const movieBuyColor = stars ? '#ff6e7e' : '#ffaf36';
    return (
        <div className="movieListItem">
            <div className="moviePic">
                <img src={picUrl} alt="" />
            </div>      
            <div className="movieDesc">
                <h3 className="movieTitle">{title}</h3>

                { stars ? <p className="movieScore">{getStars(stars)}</p> : ''}

                <p className="movieDirector">导演:&nbsp;{
                    directors.map(function(director){
                        return director.name;
                    }).join('/')
                }</p>
                <p className="movieCast">主演:&nbsp;{
                    casts.map(function(director){
                        return director.name;
                    }).join('/')
                }</p>
            </div>
            <div className="movieBuy" style={{ color: movieBuyColor}}>
                <p className="movieSeeing">
                    {collect_count > 9999 ? (collect_count / 10000).toFixed(1) + '万' : collect_count }人
                    { stars ? '看过' : '想看'}
                </p>
                <a href="#" className="goBuy" style={{ color: movieBuyColor, border: '1px solid '+ movieBuyColor }}>
                    { stars ? '购票' : '想看'}
                </a>
            </div>
        </div>
    )
}

export default MovieListItem;
