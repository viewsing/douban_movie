import React, {Component} from 'react';
import { Link } from 'redux';
import { connect } from 'react-redux';
import { lookupMovies } from '../actions.js';
import { view as SearchBar } from '../../../components/searchBar';
import MovieItem from './MovieItem.js';

class LookUp extends Component {
    componentWillMount() {
        this.props.lookupMovies();
    }
    render() {
        const {status, topMovies, usMovies, weeklyMovies, newsMovies} = this.props;
        console.log(topMovies, usMovies, weeklyMovies, newsMovies);
        return (
            status === 'success' ? <section id="LookUp">
                <SearchBar/>
                <div className="LookUp-container">
                    <div className="topic top250">
                        <h2>豆瓣 Top250</h2>
                        <div className="topicBody">
                            {
                                topMovies.map(function(movie, index){
                                    if (index < 5) {
                                        return <MovieItem key={movie.id} index={index} subject={movie} />
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className="topic weekly">
                        <h2>本周口碑榜</h2>
                        <div className="topicBody">
                            {
                                usMovies.map(function(movie, index){
                                    if (index < 5) {
                                        return <MovieItem key={movie.subject.id} index={index} subject={movie.subject} />
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className="topic us_box">
                        <h2>北美票房榜</h2>
                        <div className="topicBody">
                            {
                                weeklyMovies.map(function(movie, index){
                                    if (index < 5) {
                                        return <MovieItem key={movie.subject.id} index={index} subject={movie.subject} />
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className="topic new_movies">
                        <h2>新片榜</h2>
                        <div className="topicBody">
                            {
                                newsMovies.map(function(movie, index){
                                    if (index < 5) {
                                        return <MovieItem key={movie.id} index={index} subject={movie} />
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </section> : <div className="loading"></div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        topMovies: state.lookup.topMovies,
        usMovies: state.lookup.usMovies,
        weeklyMovies: state.lookup.weeklyMovies,
        newsMovies: state.lookup.newsMovies,
        status: state.lookup.status
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        lookupMovies: ()=>dispatch(lookupMovies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookUp);
