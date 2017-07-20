
import React,{Component,PropTypes} from "react"
import {Link} from "react-router"
import axios from "axios"
import {Card} from "antd" ;

export default class NewsBlock extends Component {
   static propTypes={
       type:PropTypes.string.isRequired,
       count:PropTypes.number.isRequired
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
        let {newsArr}=this.state ;
        let  newsList =newsArr.length
        ?(
           <ul>
               {
                newsArr.map((news,index)=>{
                    let {title,uniquekey}=news  ;
                    return (
                        <li key={index}>
                            <Link to={`/detail/${uniquekey}`}>{title}</Link>
                        </li>
                    )
                })
               }
           </ul>
          )
        :"没有任何新闻加载" ;
       return(
        <Card className="topNewsList">
            {newsList}
        </Card>
       )
   }


}
