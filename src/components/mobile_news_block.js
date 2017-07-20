import React,{Component,PropTypes} from 'react'
import {Card} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'

/*mobile端新闻列表组件*/

export default class MobileNewsBlock extends Component{
    static propTypes={
        type:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired
    };
    constructor(props){
        super(props) ;
        this.state={
            newsArr:[]
        }
    };
    componentDidMount(){
        const {type,count}=this.props ;
        const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response=>{
                let newsArr=response.data ;
                this.setState({newsArr})

            })
    }
    render(){
        let {newsArr}=this.state ;

        let newsList=newsArr.length
        ? newsArr.map((news,index)=> {
                let {uniquekey,thumbnail_pic_s,title,realtype,date}=news;
                return (
                    <Card key={index} className="m_article list-item special_section clearfix">
                        <Link to={`/detail/${uniquekey}`}>
                            <div className="m_article_img">
                                <img src={thumbnail_pic_s} alt={title}/>
                            </div>
                            <div className="m_article_info">
                                <div className="m_article_title">
                                    <span> {title}</span>
                                </div>
                                <div className="m_article_desc clearfix">
                                    <div className="m_article_desc_l">
                                        <span className="m_article_channel">{realtype}</span>
                                        <span className="m_article_time">{date}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Card>
                )
            })
        :'没有加载到任何新闻'  ;
        return(
            <div>
                {newsList}
            </div>
        )
    }
}


