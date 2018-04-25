import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchMovie, leaveSearch } from '../actions.js';
import SearchResult from './SearchResult.js';
import debounce from '../../../utils/debounce.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';

class Search extends Component {
    constructor(props){
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleInput = debounce(this.handleInput, 500).bind(this);
        this.getDom = this.getDom.bind(this);
    }
    componentDidMount(){
        this.dom.focus();
    }
    handleInput(event) {
        let inputStr = event.target.value.trim();
        if (inputStr) {
            this.props.searchMovie(inputStr);
        }
    }
    handleCancel() {
        this.props.leaveSearch();
        window.history.back();
    }
    getDom(ref) {
        this.dom = ref;
    }
    render(){
        console.log(this.props);
        const { status, movies } = this.props;
        return(
            <section id="search">
                <div className="searchHeader">
                    <span className="searchInput">
                        <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                        <input ref={this.getDom} type="search" onChange={this.handleInput} placeholder="搜索电影 / 电视剧 / 影人" />
                    </span>
                    <span className="searchCancel" onClick={this.handleCancel}>取消</span>
                </div>
                <div className="searchBody">
                    <div className="searchHistory">
                        <div className="searchHistory-heading">
                            <span>搜索历史</span>
                            <span>清除</span>
                        </div>
                        <div className="searchHistory-results">
                            <div className="searchHistory-result">发</div>
                            <div className="searchHistory-result">哈哈哈</div>
                        </div>
                    </div>
                    {
                        status === 'init' ? null : <SearchResult movies={movies} status={status} />
                    }
                </div>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        status: state.search.status,
        movies: state.search.movies
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        searchMovie: (inputStr)=>dispatch(searchMovie(inputStr)),
        searchMoreMovie: (inputStr, start)=>dispatch(searchMovie(inputStr, start)),
        leaveSearch: () => dispatch(leaveSearch())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
