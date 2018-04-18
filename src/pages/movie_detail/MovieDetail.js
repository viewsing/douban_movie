import React from 'react';

function MovieDetail(props) {
    return (
        <section className="movieDetail">
            <h2>{props.params.id}</h2>
        </section>
    )
}

export default MovieDetail;
