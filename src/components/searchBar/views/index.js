import React from 'react';
import { Link } from 'react-router';
import searchIcon from '../../../static/search.svg';

function SearchBar (props) {
    return (
        <Link to="/search" className="searchBar">
            <div className="searchPanel">
                <span style={{
                    background: 'url(' + searchIcon + ') 0 / 100% no-repeat',
                    display: 'inline-block',
                    width: '.6rem',
                    height: '.6rem'
                }}></span>&nbsp;电影 / 电视剧 / 影人
            </div>
        </Link>
    )
}
export default SearchBar;
