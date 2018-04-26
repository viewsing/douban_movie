import React from 'react';
import MovieListItem from '../../hot_showing/views/MovieListItem.js';

export default function(props) {
    const { index, subject} = props;
    return (
        <div className="movieItem">
            <span>{index}</span>
            <MovieListItem id={subject.id} directors={subject.directors} rating={subject.rating} collect_count={subject.collect_count} casts={subject.casts} title={subject.title} images={subject.images} />
        </div>
    )
}
