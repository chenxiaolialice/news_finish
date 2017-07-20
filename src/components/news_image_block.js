import React,{Component,PropTypes} from 'react' ;
import axios from 'axios' ;
import {Card }from 'antd'
import {Link} from "react-router"

export default class NewsImageBlock extends Component{
    static propTypes={
        type:PropTypes.string.isRequired,
        cardTitle:PropTypes.string.isRequired,
        cardWidth:PropTypes.string.isRequired,
        imageWidth:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired,
    }

    constructor(props){
        super(props)
        this.state={
            newsArr:[]
        }
    }
    componentDidMount(){
        let {type,count}=this.props ;
        let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response=>{
                let result=response.data ;
                this.setState({
                    newsArr:result
                })
            })

    }
    render(){
        let {cardWidth,cardTitle,imageWidth}=this.props ;
        let {newsArr}=this.state ;
        //定义图片样式
        let imgStyles={
            width:imageWidth,
            height:'90px',
            display:'block'
        }
        //定义标题样式
        let titleStyles={
            width:imageWidth,
            whiteSpace:'nowrap',
            overflow:'hidden',
            textOverflow:'ellipsis' //显示省略号
        }
        let newsList=newsArr.length===0
        ?'没有任何新闻'
        : newsArr.map((news,index)=>{
            let {uniquekey,thumbnail_pic_s,title,author_name}=news ;
           return(
               <div className="imageblock" key={index}>
                   <Link to={`/detail/${uniquekey}`}>
                       <div >
                            <img src={thumbnail_pic_s} style={imgStyles}/>
                       </div>
                       <div className="custom-card" >
                           <h3 style={titleStyles}>{title}</h3>
                           <p>{author_name}</p>
                       </div>
                   </Link>
               </div>
           )
         })
        return (
            <Card title={cardTitle} style={{width:cardWidth}} className="topNewsList">
                {newsList}
            </Card>
        )
    }
}
