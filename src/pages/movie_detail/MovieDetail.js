import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovieDetail } from './actions.js';
import Stars from '../../components/Stars.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import arrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft';
import angleRight from '@fortawesome/fontawesome-free-solid/faAngleRight';
import shareAlt from '@fortawesome/fontawesome-free-solid/faShareAlt';
import ticketAlt from '@fortawesome/fontawesome-free-solid/faTicketAlt';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }
    componentDidMount() {
        this.props.fetchMovieDetail(this.props.params.id);
    }
    goBack() {
        window.history.back();
    }
    render() {
        const { status, subject} = this.props;
        console.log(subject);
        return (
            <section id="movieDetail">
                {
                    status === 'success' ? [<header key="1">
                        <span className="goBack" onClick={this.goBack}><FontAwesomeIcon icon={arrowLeft}/></span>
                        <span className="title">电影</span>
                        <span className="share"><FontAwesomeIcon icon={shareAlt}/></span>
                    </header>,
                    <div className="detail-body" key="2">
                        <div className="poster"><img src={subject.images.small} alt="电影海报"/></div>
                        <div className="info card-padding">
                            <div className="leftCol">
                                <h2>{subject.title}</h2>
                                <p>{subject.genres.push(subject.year) && subject.genres.join(' / ')}</p>
                                <p>{'原名: '+subject.original_title}</p>
                                <p>{'主演: '+subject.casts.map((cast)=>cast.name).join(' / ')}</p>
                            </div>
                            <div className="rightCol">
                                <div className="rating">
                                    <p className="rating-text">豆瓣评分</p>
                                    <p className="rating-score">{subject.rating.average}</p>
                                    <Stars stars={subject.rating.stars} />
                                    <p className="rating-count">{subject.ratings_count + '人'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="chooseSeat card-padding">
                            <FontAwesomeIcon icon={ticketAlt} /> &nbsp; 选座购票
                            <FontAwesomeIcon className="angleRight" icon={angleRight} />
                        </div>
                        <div className="desc card-padding">
                            <p>简介</p>
                            <p>
                                {subject.summary}
                            </p>
                        </div>
                    </div>] : <div className="loading"></div>
                }
            </section>
        )
    }
}

function mapStateToProps (state, ownProps) {
    return {
        subject: state.movieDetail.data,
        status: state.movieDetail.status
    }
}

function mapDispatchToProps (dispatch, ownProps) {
    return {
        fetchMovieDetail: (id) => dispatch(fetchMovieDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
