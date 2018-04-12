import React, {Component} from 'react';
import { fetchComingMovies } from '../actions.js';
import { connect } from 'react-redux';
import MovieListItem from './MovieListItem.js';

/**
 * 功能是控制即将上映页面的数据加载
 */
class ComingSoon extends Component {
    constructor(props) {
        super(props);
        this.getDom = this.getDom.bind(this);
    }
    componentDidMount() {
        this.props.Ref(this);
    }
    componentDidUpdate() {
        this.dom.scrollTop = 0;
    }
    getDom(ref) {
        this.dom = ref;
    }
    fetchData() {
        this.props.getMovies();
    }
    render() {
        const { status, subjects } = this.props;
        return (
            <section id="ComingSoon" ref={this.getDom}>
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
