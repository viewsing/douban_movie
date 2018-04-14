import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import hotIconActive from '../../../static/hot_showing_active.svg';
import hotIcon from '../../../static/hot_showing.svg';
import searchIconActive from '../../../static/search_movie_active.svg';
import searchIcon from '../../../static/search_movie.svg';

const Icon = {
    hotIconActive: hotIconActive,
    hotIcon: hotIcon,
    searchIconActive: searchIconActive,
    searchIcon: searchIcon
}

function TabItem ({ icon, text, url, active, changeTabStatus }) {
    //两种状态下的Icon
    const iconUrl = active ? Icon[icon + 'Active'] : Icon[icon];
    return (
        <Link to={ '/' + url} className="tabItem" >

            <span className="tabItem-icon" style={{
                background: 'url('+ iconUrl +') center/100% no-repeat'
            }}></span>

            <span className="tabItem-text" style={{
                color: active ? '#0f0d0d' : '#8a8a8a'
            }}>{text}</span>
        </Link>
    )
}

function mapStateToProps (state, ownProps) {
    return {
        active: state.tabStatus === ownProps.url,
        icon: ownProps.icon,
        text: ownProps.text,
        url: ownProps.url,
    }
}

export default connect( mapStateToProps, null)(TabItem);
