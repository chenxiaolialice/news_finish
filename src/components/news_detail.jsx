import React, {Component} from 'react'
import {Row,Col,BackTop} from 'antd'
import axios from 'axios'

import NewsImageBlock from './news_image_block'
import NewsComments from './news_comments'


/*
新闻详情组件
 */

export default class NewsDetail extends Component{
  constructor(props){
    super(props)
      this.state={
      news:{}
      }
  }
  componentDidMount(){
    let {uniqueKey}=this.props.params ;
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniqueKey}`
    axios.get(url)
        .then(response=>{
         /* let news=response.data ;
            //更新状态
            this.setState({news})*/
         let result=response.data;
         this.setState({news:result})
        })

  }
  render(){
    let {pagecontent}=this.state.news ;
    let {uniqueKey}=this.props.params ;
    return(
        <div>
          <Row>
            <Col span={1} />
            <Col span={16} className='container'>
              <div dangerouslySetInnerHTML={{__html:pagecontent}}></div>
              <hr />
              <NewsComments uniquekey={uniqueKey} />
            </Col>
            <Col span={6}>
              <NewsImageBlock type="top" cardTitle="相关新闻" cardWidth="100%" imageWidth="132px" count={20}/>
            </Col>
            <Col span={1} />
          </Row>
          <BackTop/>
        </div>
    )
  }
}

