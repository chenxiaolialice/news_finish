import React, {Component} from 'react'
import {Link} from 'react-router'
import {Row,Col,Carousel,Tabs} from "antd"
import NewsBlock from "./news_block"
import NewsProducts from './news_products'
import NewsImageBlock from './news_image_block'

import carousel_1 from"../images/carousel_1.jpg"
import carousel_2 from"../images/carousel_2.jpg"
import carousel_3 from"../images/carousel_3.jpg"
import carousel_4 from"../images/carousel_4.jpg"

let Tabpane=Tabs.TabPane ;

/*
 包含各种新闻列表容器组件
 */

export default class NewsContainer extends Component{
  render(){
    return(
        <div>
          <Row className='container'>
            <Col span={1}> </Col>
            <Col span={22}>
              <div className="leftContainer" style={{width: "35%"}}>
                <Carousel autoplay >
                  <div>
                    <img src={carousel_1}/>
                  </div><div>
                    <img src={carousel_2}/>
                  </div><div>
                    <img src={carousel_3}/>
                  </div><div>
                    <img src={carousel_4}/>
                  </div>
                </Carousel>
                <NewsImageBlock  type="guoji" count={6} cardTitle="国际新闻"
                                 imageWidth="112px" cardWidth="400px"/>
              </div>

              <Tabs className='tabs_news' style={{width:"35%"}}>
                <Tabpane tab='头条新闻' key='1'>
                  <NewsBlock type="top" count={20}/>
                </Tabpane>
                <Tabpane tab='国际新闻' key='2'>
                  <NewsBlock type="guoji" count={20}/>
                </Tabpane>
              </Tabs>
              <Tabs className='tabs_product' style={{width:"30%"}}>
                <Tabpane tab='React News 产品' key='1'>
                  <NewsProducts/>
                </Tabpane>
              </Tabs>
              <div>
                <NewsImageBlock  type="guonei" count={8} cardTitle="国内新闻"
                                 cardWidth="100%" imageWidth="150px"/>
                <NewsImageBlock  type="yule" count={16} cardTitle="娱乐新闻"
                                 cardWidth="100%" imageWidth="150px" />
              </div>
            </Col>
            <Col span={1}> </Col>
          </Row>
        </div>
    )
  }
}









/*
export default class NewsContainer extends Component {
  render () {
    return (
      <div>
        <ul>
          <li>
            <Link to="/detail/1">新闻111111</Link>
          </li>
          <li>
            <Link to="/detail/2">新闻22222</Link>
          </li>

          <br/>
          <li>
            <Link to="/usercenter">个人中心</Link>
          </li>
        </ul>
      </div>
    )
  }
}*/
