import React, {Component} from 'react';
import { fetchTheaterMovies } from '../actions.js';
import { connect } from 'react-redux';
import MovieListItem from './MovieListItem.js';
import PropTypes from 'prop-types';

class InTheater extends Component {
    constructor(props) {
        super(props);
        this.getDom = this.getDom.bind(this);
    }
    componentDidMount() {
        this.props.getMovies();
        this.dom.addEventListener('scroll', this.throttle(this.scrollToBottom));
    }
    throttle(callback) {
        let timer;
        let throttleFunc = function(event, self) {
            timer = setTimeout(function(){
                callback.call(self, event);
            }, 200);
        }
        return function(event) {
            clearTimeout(timer);
            throttleFunc(event, this);
        }
    }
    getDom(ref) {
        this.dom = ref;
    }
    scrollToBottom(event) {
        console.log(window.scrollY);
    }
    render() {
        const { status, subjects } = this.props;
        return (
            <section id="InTheater" ref={this.getDom}>
                {
                    status === 'success' ?
                    subjects.map( function(subject) {
                        return <MovieListItem key={subject.id} directors={subject.directors} stars={subject.rating.stars} collect_count={subject.collect_count} casts={subject.casts} title={subject.title} picUrl={subject.images.small} />
                    }) :
                    <div className="loading"></div>
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
