import React from 'react';
import { Link } from 'react-router';
export default function(props) {
    const { movies, status } = props;
    let content;
    if (status === 'success') {
        if (movies.length) {
             content = movies.map(function(movie){
                return (<Link to={'/movie_detail/'+movie.id} key={movie.id} className="searchResults-result">
                    <img src={movie.images.small + '?apikey=0b2bdeda43b5688921839c8ecb20399b'} alt="电影海报"/>
                    <div>
                        <h3>{movie.title}</h3>
                        <p>{movie.rating.average + '分 / '+movie.pubdates.join(' / ')}</p>
                    </div>
                </Link>)
            })
        } else {
            content = <p>没有更多数据了</p>;
        }
    } else {
        content = <div className="loading-container"><div className="loading"></div></div>;
    }
    return(
        <div className="searchResults">
            <div className="searchResults-heading">
                <span>影视</span>
            </div>
            <div className="searchResults-results">
                { content }
            </div>
        </div>
    )
}
