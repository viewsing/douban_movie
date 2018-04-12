import React, {Component} from 'react';
import { fetchTheaterMovies } from '../actions.js';
import { connect } from 'react-redux';
import MovieListItem from './MovieListItem.js';
import Throttle from '../../../utils/throttle.js';
import PropTypes from 'prop-types';

/**
 * 功能是控制加载正在热映页面的数据加载
 */

class InTheater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadMore: false
        }
        this.scrollToBottom = Throttle(this.scrollToBottom).bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
    }
    componentDidMount() {
        this.props.getMovies();
    }
    scrollToBottom(event) {
        const scrollTop = event.target.scrollTop;
        const targetHeight = event.target.scrollHeight - event.target.clientHeight - 200;
        console.log(scrollTop, targetHeight);
        if (scrollTop >= targetHeight) {
            this.fetchMoreData();
        }
    }
    fetchMoreData() {
        if (!this.fetching) {
            this.fetching = true;
            this.setState({
                loadMore: true
            })
        }
    }
    render() {
        const { status, subjects } = this.props;
        return (
            <section id="InTheater" onScroll={this.scrollToBottom} >
                {
                    status === 'success' ?
                    subjects.map( function(subject) {
                        return <MovieListItem key={subject.id} directors={subject.directors} stars={subject.rating.stars} collect_count={subject.collect_count} casts={subject.casts} title={subject.title} picUrl={subject.images.small} />
                    }) :
                    <div className="loading"></div>
                }
                {
                    this.state.loadMore ? <div style={{ position: 'relative', width: '100%', height: '1.5rem' }}><div className="loading"></div></div> : ''
                }
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        status: state.hotShowing.inTheaters.status,
        subjects: state.hotShowing.inTheaters.subjects
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getMovies: ()=> dispatch(fetchTheaterMovies())
    }
}

InTheater.contextTypes = {
    store: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(InTheater);
