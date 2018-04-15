import React from 'react';
import MovieListItem from './MovieListItem.js';

export default function({subjects, isComing}) {
    return (
        subjects.length > 0 ? subjects.map( function(subject){
            return <MovieListItem key={subject.id} id={subject.id} directors={subject.directors} rating={isComing ? null : subject.rating} collect_count={subject.collect_count} casts={subject.casts} title={subject.title} images={subject.images} />
        }) : <div className="noMoreData">没有更多数据了</div>
    )
}
