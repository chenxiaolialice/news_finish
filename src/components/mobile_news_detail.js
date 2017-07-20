import React,{Component} from 'react';
import {BackTop} from 'antd' ;
import axios from 'axios' ;
import NewsComment from './news_comments'


/*
* 移动端 新闻详情组件
* */

export default class MobileNewsDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            news:''
        }
    }
    componentDidMount(){
        let {uniqueKey}=this.props.params ;
        let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniqueKey}`
        axios.get(url)
            .then(response=>{
                let news=response.data ;
                this.setState({news}) ;
                document.title = news.title + " - React News | React驱动的新闻平台";
            })
    }
    render(){
        return(
            <div style={{padding:'10px'}}>
                <div className="mobileDetailsContainer" dangerouslySetInnerHTML={{__html:
                this.state.news.pagecontent}}></div>
                <hr/>
                <NewsComment uniquekey={this.props.params.uniqueKey}/>
                <BackTop/>
            </div>
        )
    }
}