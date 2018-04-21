import React from 'react';
import { view as TabBar } from './components/TabBar';

/**
 * 根组件，嵌套路由，展示搜索栏，主内容和底部tab
 */
function App (props) {
    return (
        <div id="appContent">
            <section id="appBody">{props.children}</section>
            <TabBar/>
        </div>
    )
}
export default App;
