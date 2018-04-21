import React from 'react';
import searchIcon from '../../../static/search.svg';

function SearchBar (props) {
    return (
        <div className="searchBar">
            <div className="searchPanel">
                <span style={{
                    background: 'url(' + searchIcon + ') 0 / 100% no-repeat',
                    display: 'inline-block',
                    width: '.6rem',
                    height: '.6rem'
                }}></span>&nbsp;电影 / 电视剧 / 影人
            </div>
        </div>
    )
}
export default SearchBar;
