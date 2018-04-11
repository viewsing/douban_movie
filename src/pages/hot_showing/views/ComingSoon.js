import React, {Component} from 'react';
import { fetchComingMovies } from '../actions.js';
import { connect } from 'react-redux';
import MovieListItem from './MovieListItem.js';

class ComingSoon extends Component {
    componentWillReceiveProps(props) {
        console.log(2);
        // props.isActive && props.firstToComing && this.props.getMovies();
    }
    render() {
        const { status, subjects } = this.props;
        return (
            <section id="ComingSoon">
                {
                    status === 'success' ?
                    subjects.map( function(subject) {
                        return <MovieListItem directors={subject.directors} casts={subject.casts} key={subject.id} picUrl={subject.images.small} collect_count={subject.collect_count} title={subject.title}  />
                    }) :
                    <div className="loading"></div>
                }
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        status: state.hotShowing.comingSoon.status,
        subjects: state.hotShowing.comingSoon.subjects
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getMovies: ()=> dispatch(fetchComingMovies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComingSoon);
