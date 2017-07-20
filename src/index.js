import React from 'react'
import {render} from 'react-dom'
import {Router, Route,IndexRoute, hashHistory} from 'react-router'

import MediaQuery from 'react-responsive'

import App from './components/app'
import NewsContainer from './components/news_container'
import NewsDetail from './components/news_detail'
import UserCenter from './components/user_center'


import MobileApp from './components/mobile_app'
import MobilNewsContainer from './components/mobile_news_container'
import MobileNewsDetail from './components/mobile_news_detail'
import MobileUserCenter from './components/mobile_user_center'



render((
    <div>
        <MediaQuery query='(min-device-width: 1224px)' >
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={NewsContainer}/>
                    <Route path="/detail/:uniqueKey" component={NewsDetail}> </Route>
                    <Route path="/usercenter" component={UserCenter}> </Route>
                </Route>
            </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)' >
            <Router history={hashHistory}>
                <Route path="/" component={MobileApp}>
                    <IndexRoute component={MobilNewsContainer}/>
                    <Route path="/detail/:uniqueKey" component={MobileNewsDetail}> </Route>
                    <Route path="/usercenter" component={MobileUserCenter}> </Route>
                </Route>
            </Router>
        </MediaQuery>
    </div>
), document.getElementById('root'));


