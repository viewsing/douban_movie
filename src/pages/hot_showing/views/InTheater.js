import React, {Component} from 'react';
import { fetchTheaterMovies } from '../actions.js';
import { connect } from 'react-redux';
import MovieList from './MovieList';
import withLoading from '../../../utils/withLoading.js';
import Throttle from '../../../utils/throttle.js';
import PropTypes from 'prop-types';

const LoadingMovieList = withLoading(MovieList);

/**
 * 功能是控制加载正在热映页面的数据加载
 */

class InTheater extends Component {
    constructor(props) {
        super(props);
        this.movieLists = [];
        this.scrollToBottom = Throttle(this.scrollToBottom, 100, 200).bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
    }
    componentDidMount() {
        this.props.getMovies();
    }
    scrollToBottom(event) {
        const scrollTop = event.target.scrollTop;
        const targetHeight = (event.target.scrollHeight - event.target.clientHeight) * 4 / 5;
        if (scrollTop >= targetHeight) {
            this.fetchMoreData();
        }
    }
    fetchMoreData() {
        if (!this.fetching) {
            this.fetching = true;
            const start = this.start + this.count;
            if (this.start < this.total) {
                this.props.getMovies(start, true);
            }
        }
    }
    render() {
        const { status, movieLists, count, start, total, isFetchMore } = this.props;
        //保存分页信息
        this.count = count, this.start = start; this.total = total;
        if (isFetchMore) {
            this.fetching = false;
        }

        return (
            <section id="InTheater" onScroll={this.scrollToBottom} >
                {
                    status !== 'init' ? movieLists.map( function(movieList, index) {
                        return <LoadingMovieList key={index} subjects={movieList.subjects} status={movieList.status}/>
                    }) : null
                }
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        status: state.hotShowing.inTheaters.status,
        movieLists: state.hotShowing.inTheaters.movieLists,
        count: state.hotShowing.inTheaters.count,
        start: state.hotShowing.inTheaters.start,
        total: state.hotShowing.inTheaters.total,
        isFetchMore: state.hotShowing.isFetchMore
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getMovies: (start, isFetchMore)=> dispatch(fetchTheaterMovies(start, isFetchMore))
    }
}

InTheater.contextTypes = {
    store: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(InTheater);
