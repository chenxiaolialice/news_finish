
import React,{Component} from 'react'
import {Tabs,Card} from 'antd' ;
import {Link} from 'react-router'
import axios from 'axios'

let TabPane=Tabs.TabPane ;
/*
* 移动端 用户中心组件
*/

export default class MobileUserCenter extends Component{
    constructor(props){
        super(props)
        this.state={
            userCollections:'',//收藏列表
            userComments:'' //评论列表
        }
    }
    componentDidMount(){
        let userId= localStorage.getItem('userId');
        let url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + userId
        axios.get(url)
            .then(response=>{
                let result1=response.data ;
                this.setState({userCollections:result1})
            })

        url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + userId
        axios.get(url)
            .then(response=>{
                let result=response.data ;
                this.setState({userComments:result})
            })
    }

    render(){
        let {userCollections, userComments}=this.state ;
        const userCollectionsList=userCollections.length
        ? userCollections.map((userCollection,index)=>{
            let {uniquekey,Title}=userCollection ;
            return(
                <Card key={index} title={uniquekey}
                      extra={<Link to={`/news_detail/${uniquekey}`} >查看</Link>}>
                    <p>{Title}</p>
                </Card>
            )
            })
        :"您还没有收藏任何的新闻，快去收藏一些新闻吧。" ;

        const  userCommentsList=userComments.length
        ? userComments.map((userComment,index)=>{
            let {datetime,uniquekey,Comments}=userComment ;
            return(
                <Card key={index} title={`于 ${datetime} 评论了文章 ${uniquekey}`}
                      extra={<Link to={`/news_detail/${uniquekey}`}>查看</Link>}>
                    <p>{Comments}</p>
                </Card>
            )
            })
            :"您还没有发表过任何评论。" ;
        return(
            <div>
                <Tabs>
                    <TabPane tab="我的收藏列表" key="1" style={{padding: '10px'}}>
                        {userCollectionsList}
                    </TabPane>
                    <TabPane tab="我的评论列表" key="2" style={{padding: '10px'}}>
                        {userCommentsList}
                    </TabPane>
                    <TabPane tab="头像设置" key="3"> </TabPane>
                </Tabs>
            </div>
        )
    }
}