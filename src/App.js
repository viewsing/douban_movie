import React from 'react';
import { view as TabBar } from './components/TabBar';
import { view as SearchBar } from './components/searchBar';

function App (props) {

    return (
        <div className="appContent">
            <SearchBar />
            <section>{props.children}</section>
            <TabBar/>
        </div>
    )
}
export default App;
