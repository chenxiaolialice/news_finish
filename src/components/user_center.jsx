import React, {Component} from 'react'
import {Row,Col,Tabs,Upload,Card,Icon,Modal} from 'antd'
import axios from 'axios'

let TabPane=Tabs.TabPane ;
/*
用户中心组件
 */
export default class UserCenter extends Component {
  constructor(props){
    super(props)
      this.state={
      collections:[],
      comments:[],
      previewVisible:false,
      previewImage:'',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }]
      }
  }

  componentDidMount(){
    const userId=localStorage.getItem('userId');
    //ajax获取收藏列表数据
      let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
    axios.get(url)
        .then(response=>{
          let result=response.data ;
          this.setState({collections:result})
        });
      //ajax获取评论列表数据
      url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
      axios.get(url)
          .then(response=>{
            let comments=response.data ;
              this.setState({comments})
          })
  }
    // 显示预览窗口
    handlePreview=(file)=>{
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        });
    }
    // 更新列表
    handleChange=({fileList})=>{
      this.setState({fileList})
    }
    handleCancle=()=>{
      this.setState({ previewVisible: false })
    }
  render () {
    const {collections,comments}=this.state
    const collectionList=collections.length===0
      ?'没有任何收藏'
      :collections.map((collection,index)=>{
      const {uniquekey,Title}=collection
            return(
                <Card key={index} title={uniquekey} extra={<a href={`#/detail/${uniquekey}`}>查看</a>}>
                  <p>{Title}</p>
                </Card>
            )
        })
      const commentList=comments.length===0
      ?'没有任何评论'
      :comments.map((comment,index)=>{
        const {datetime,uniquekey,Comments}=comment
              return(
                  <Card key={index} title={`于${datetime}评论新闻${uniquekey}`} extra={<a href={`#/detail/${uniquekey}`}>查看</a>}>
                    <p>{Comments}</p>
                  </Card>
              )
          })
      const {previewVisible, previewImage, fileList }=this.state
      const uploadButton=(
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
      )
    return (
      <div>
        <Row>
          <Col span={1}/>
          <Col span={22}>
            <Tabs>
              <TabPane key="1" tab="我的收藏列表">
                  {collectionList}
              </TabPane>
              <TabPane key="2" tab="我的评论列表">
                  {commentList}
              </TabPane>
              <TabPane key="3" tab="头像设置">
                <div className="clearfix">
                  <Upload action='http://jsonplaceholder.typicode.com/posts/'
                          listType='picture-card'
                          fileList={fileList}
                          onPreview={this.handlePreview}
                          onChange={this.handleChange}>
                      {uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancle}>
                    <img alt="example" style={{width:'100%'}} src={previewImage}/>
                  </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={1}/>
        </Row>
      </div>
    )
  }
}