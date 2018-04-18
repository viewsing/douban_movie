import React, {Component} from 'react';
import { fetchTheaterMovies, leaveTheater } from '../actions.js';
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
        this.getDom = this.getDom.bind(this);
    }
    componentDidMount() {
        if (this.props.movieLists.length<=0) {
            this.props.getMovies();
        } else {
            //如果已有数据，就是从详情返回列表，所以要复原原先的滚动位置
            this.dom.scrollTop = this.props.scrollTop
        }
    }
    componentWillUnmount() {
        this.props.leaveTheater(this.dom.scrollTop);
    }
    getDom(ref) {
        this.dom = ref;
    }
    scrollToBottom(event) {
        this.scrollTop = event.target.scrollTop;
        const targetHeight = (event.target.scrollHeight - event.target.clientHeight) * 4 / 5;
        if (this.scrollTop >= targetHeight) {
            this.fetchMoreData();
        }
    }
    fetchMoreData() {
        if (!this.fetching) {
            this.fetching = true;
            const start = this.props.start + this.props.count;
            if (this.props.start < this.props.total) {
                this.props.getMovies(start, true);
            }
        }
    }
    render() {
        const { status, movieLists, fetchDone } = this.props;
        //标记加载更多结束
        if (fetchDone) {
            this.fetching = false;
        }
        
        return (
            <section id="InTheater" ref={this.getDom} onScroll={this.scrollToBottom} >
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
        fetchDone: state.hotShowing.fetchDone,
        scrollTop: state.hotShowing.inTheaters.scrollTop
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getMovies: (start, isFetchMore)=> dispatch(fetchTheaterMovies(start, isFetchMore)),
        leaveTheater: (scrollTop) => dispatch(leaveTheater(scrollTop))
    }
}

InTheater.contextTypes = {
    store: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(InTheater);
