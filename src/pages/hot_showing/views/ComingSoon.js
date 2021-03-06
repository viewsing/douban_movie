import React, {Component} from 'react';
import { fetchComingMovies, leaveComing } from '../actions.js';
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
    componentWillUnmount() {
        this.props.leaveComing(this.dom.scrollTop);
    }
    scrollToBottom(event) {
        this.scrollTop = event.target.scrollTop;
        const targetHeight = (event.target.scrollHeight - event.target.clientHeight) * 4 / 5;
        if ( this.scrollTop >= targetHeight) {
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
        if (this.props.movieLists.length<=0) {
            this.props.getMovies();
        } else {
            this.dom.scrollTop = this.props.scrollTop;
        }
    }
    render() {
        const { status, movieLists, fetchDone } = this.props;
        //标记加载更多结束
        if (fetchDone) {
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
        fetchDone: state.hotShowing.fetchDone,
        scrollTop: state.hotShowing.comingSoon.scrollTop
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getMovies: (start, isFetchMore)=> dispatch(fetchComingMovies(start, isFetchMore)),
        leaveComing: (scrollTop)=> dispatch(leaveComing(scrollTop))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComingSoon);
