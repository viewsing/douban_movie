import React from 'react';
import TabItem from './TabItem.js';

function TabBar ({tabStatus}) {
    return (
        <footer id="footer">
            <TabItem icon="hotIcon" text="热映" url="hot_showing" />
            <TabItem icon="searchIcon" text="找片" url="search_movie" />
        </footer>
    )
}

export default TabBar;
