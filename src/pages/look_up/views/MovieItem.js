import React from 'react';
import { Link } from 'react-router';
import Stars from '../../../components/Stars.js';

export default function(props) {
    const { index, subject} = props;
    return (
        <Link className="movieItem" to={'/movie_detail/' + subject.id}>
            <span className="movieIndex">{index + 1}</span>
            <div className="movieDetail" >
                <div className="moviePic">
                    <img src={subject.images.small} alt="" />
                </div>      
                <div className="movieDesc">
                    
                    <h3 className="movieTitle">{subject.title}</h3>

                    <div className="movieScore">
                        <Stars stars={subject.rating.stars} />&nbsp;
                        <span>{ subject.rating.average }</span>&nbsp;
                        <span>{subject.collect_count + '人评价'}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
