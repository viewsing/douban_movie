import React from 'react';

function MovieDetail(props) {
    return (
        <section className="movieDetail">
            <header>电影</header>
            <div className="detail-body">
                <div className="poster">海报</div>
                <div className="info">电影信息</div>
                <div className="chooseSeat">选座购票</div>
                <div className="desc">简介</div>
                <div className="casts">影人</div>
                <div className="photos">剧照</div>
            </div>
        </section>
    )
}

export default MovieDetail;
