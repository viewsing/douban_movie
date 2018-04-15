import React, {Component} from 'react';
import { fetchComingMovies } from '../actions.js';
import { connect } from 'react-redux';
import MovieList from './MovieList';
import withLoading from '../../../utils/withLoading.js';
import Throttle from '../../../utils/throttle.js';

const LoadingMovieList = withLoading(MovieList);

/**
 * 功能是控制即将上映页面的数据加载
 */
class ComingSoon extends Component {
    constructor(props) {
        super(props);
        this.getDom = this.getDom.bind(this);
        this.movieLists = [];
        this.scrollToBottom = Throttle(this.scrollToBottom, 100, 200).bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
    }
    componentDidMount() {
        this.props.Ref(this);
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
            const start = this.props.start + this.props.count;
            if (this.props.start < this.props.total) {
                this.props.getMovies(start, true);
            }
        }
    }
    getDom(ref) {
        this.dom = ref;
    }
    fetchData() {
        this.props.getMovies();
    }
    render() {
        const { status, movieLists, count, start, total, isFetchMore } = this.props;
        //标记加载更多结束
        if (isFetchMore) {
            this.fetching = false;
        }

        return (
            <section id="ComingSoon" ref={this.getDom} onScroll={this.scrollToBottom} >
                {
                    status !== 'init' ? movieLists.map( function(movieList, index) {
                        return <LoadingMovieList key={index} isComing={true} subjects={movieList.subjects} status={movieList.status}/>
                    }) : null
                }
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        status: state.hotShowing.comingSoon.status,
        movieLists: state.hotShowing.comingSoon.movieLists,
        count: state.hotShowing.comingSoon.count,
        start: state.hotShowing.comingSoon.start,
        total: state.hotShowing.comingSoon.total,
        isFetchMore: state.hotShowing.isFetchMore
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getMovies: (start, isFetchMore)=> dispatch(fetchComingMovies(start, isFetchMore))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComingSoon);
