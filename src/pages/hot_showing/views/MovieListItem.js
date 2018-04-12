import React from 'react';
import Stars from './Stars.js';

/**
 * 功能是展示电影列表项
 */

function MovieListItem ({title, picUrl, directors, casts, collect_count, stars}) {
    const movieBuyColor = stars ? '#ff6e7e' : '#ffaf36';
    return (
        <div className="movieListItem">
            <div className="moviePic">
                <img src={picUrl} alt="" />
            </div>      
            <div className="movieDesc">
                
                <h3 className="movieTitle">{title}</h3>

                { stars ? <Stars stars={stars} /> : ''}

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
