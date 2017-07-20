import React, {Component} from 'react'
import MobileNewsHeader from "./mobile_news_header"
import NewsFooter from "./news_footer"

import  "../css/mobile.css";
/*
 mobile 端 根路由应用组件
 */
export default class MobileApp extends Component{
    render(){
        return(
            <div>
                <MobileNewsHeader/>
                {this.props.children}
                <NewsFooter/>
            </div>
        )
    }
}
