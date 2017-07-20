/*
* 新闻头部组件
*/
import React,{Component} from "react" ;
import {Link} from "react-router" ;

import {
    Row,
    Col,
    Menu,
    Icon,
    Button,
    Modal,//对话框
    Tabs,
    Form,//表单
    Input,//单行输入
    message,//专门用于提示信息的对象
} from "antd" ;
import axios from  "axios" ;
import logo from "../images/logo.png" ;


let MenuItem= Menu.Item ;
let TabPane=Tabs.TabPane;
let FormItem= Form.Item ;

 class  NewsHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            username:null,
            selectkey:"top",
            modalShow:false
        }
    }
    componentDidMount(){
       //读取浏览器本地保存的用户信息,如果有值，更新状态
       let username=localStorage.getItem('username') ;
       if(username){
           this.setState({username})
       }
    }


    //处理点击MenuItem 的回调
    handleClickItem=event=>{
        //更新selectkey
        this.setState({selectkey:event.key});
        //如果Key是regist,显示对话框
        if(event.key==='regist'){
            this.setState({ modalShow:true})
        }
    };
     // 关闭对话框
    handleClose=()=>{
        //更新modalShow 对话框
        this.setState({ modalShow:false})
    };
    logout=()=>{
        //清除 localStorage 中的值
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        //更新状态
        this.setState({username:null})
    }




    /*处理登录或者注册的点击回调：发送 ajax 请求*/
     handleSubmit=(isRegist)=>{
        /*准备带参数的url*/
        //http://newsapi.gugujiankong.com/Handler.ashx?
         // action=register&r_userName=abc&r_password=123123&r_confirmPassword=123123

         //登录的url-->  http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=zxfjd3g&password=123123
         let url='http://newsapi.gugujiankong.com/Handler.ashx?'
         let action=isRegist?'register':'login' ;
         url +=`action=${action}` ;
        //得到表单中数据的集合对象
         let formData=this.props.form.getFieldsValue();
         console.log(formData);
         if(isRegist){//注册
             let {r_username, r_password,r_confirm_password}=formData ;
             url +=`&r_userName=${r_username}&r_password=${r_password}&r_confirmPassword=${r_confirm_password}`
         }else{
             let {username,password}=formData ;
             url +=`&username=${username}&password=${password}`
             console.log(url)
         }
         console.log(url) ;
        /*发送ajax请求*/
         axios.get(url)
            .then(response=>{
                let result=response.data ;
                console.log(result);
                /*请求成功，作响应提示*/
                if(isRegist){//注册提示
                    if(result=== true){//注册成功
                        message.success('注册成功')

                    }else{
                        message.error('注册失败，请重新注册')
                    }
                }else{//登录提示
                    if(result){
                        message.success('登录成功')
                        //更新状态：username
                        let username=result.NickUserName
                        let userId=result.UserId
                        this.setState({username});
                        //保存用户信息
                        localStorage.setItem('username',username)
                        localStorage.setItem('userId',userId)
                    }else{
                        message.error('登录失败，请重新登录')
                    }
                }
            })
         // 关闭界面
         this.setState({
             modalShow:false
         })
         //清空输入框
         this.props.form.resetFields();
 }



    render(){
        let {selectkey,username,modalShow}=this.state ;
        let userInfo= username
            ?(
                <MenuItem key="logout" className="register">
                    <Button type="primary">{username}</Button>&nbsp;&nbsp;
                    <Link to="/username">
                        <Button type="dashed">个人中心 </Button>
                    </Link>&nbsp;&nbsp;
                    <Button onClick={this.logout}> 退出</Button>&nbsp;&nbsp;
                </MenuItem>
            )
            :(
                <MenuItem key="regist" className="register">
                    <Icon type="global"/>登录/注册
                </MenuItem>
            );
        let { getFieldDecorator}=this.props.form ;
        return(
            <header>
                <Row>
                    <Col span={1}> </Col>
                    <Col span={3}>
                        <a href="/" className="logo">
                            <img src={logo} alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={19}>
                        <div>
                            <Menu mode="horizontal" selectedKeys={[selectkey]} onClick={this.handleClickItem}>
                                <MenuItem key="top">
                                    <Icon type="global"/>头条
                                </MenuItem>
                                <MenuItem key="shehui">
                                    <Icon type="global"/>社会
                                </MenuItem>
                                <MenuItem key="guonei">
                                    <Icon type="global"/>国内
                                </MenuItem>
                                <MenuItem key="guoji">
                                    <Icon type="global"/>国际
                                </MenuItem>
                                <MenuItem key="yule">
                                    <Icon type="global"/>娱乐
                                </MenuItem>
                                <MenuItem key="tiyu">
                                    <Icon type="global"/>体育
                                </MenuItem>
                                <MenuItem key="keji">
                                    <Icon type="global"/>科技
                                </MenuItem>
                                <MenuItem key="shishang">
                                    <Icon type="global"/>时尚
                                </MenuItem>
                                {userInfo}

                            </Menu>
                            <Modal title="用户中心"
                                    visible={modalShow}
                                    onOk={this.handleClose}
                                    onCancel={this.handleClose}
                                    okText="关闭">
                                <Tabs type="card">
                                    <TabPane tab="登录" key="1">
                                        <Form onSubmit={this.handleSubmit.bind(this, false)}>
                                            <FormItem label='用户名'>
                                                {
                                                    getFieldDecorator('username')(
                                                        <Input prefix={<Icon type="user" style={{ fontSize: 13, backgroundColor:'skyblue' }} />} placeholder="Username" />
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem label='密码'>
                                                {
                                                    getFieldDecorator('password')(
                                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13, backgroundColor:'skyblue' }} />} type="password" placeholder="Password" />
                                                    )
                                                }
                                            </FormItem>
                                            <Button type="primary" htmlType="submit"> 登录</Button>
                                        </Form>
                                    </TabPane>
                                    <TabPane tab="注册" key="2" >
                                        <Form onSubmit={this.handleSubmit.bind(this, true)}>
                                            <FormItem label='用户名'>
                                                {
                                                    getFieldDecorator('r_username')(
                                                        <Input prefix={<Icon type="user" style={{ fontSize: 13, backgroundColor:'skyblue' }} />} placeholder="Username" />
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem label='密码'>
                                                {
                                                    getFieldDecorator('r_password')(
                                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13, backgroundColor:'skyblue' }} />} type="password" placeholder="Password" />
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem label='确认密码'>
                                                {
                                                    getFieldDecorator('r_confirm_password')(
                                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13, backgroundColor:'skyblue' }} />} type="password" placeholder="Password" />
                                                    )
                                                }
                                            </FormItem>
                                            <Button type="primary" htmlType="submit">注册</Button>
                                        </Form>
                                    </TabPane>
                                </Tabs>
                            </Modal>
                        </div>
                    </Col>
                    <Col span={1}> </Col>
                </Row>
            </header>
        )
    }
}
//所有包含<Form>的组件类都需要使用 Form.create()来包装一下
/*
  结果是：
*  this.props.form
*  getFieldDecorator()包装<Input>
*  getFieldsValue(): 返回包含所有输入框数据的集合对象
* */
let NewsHeaderForm =Form.create()(NewsHeader);
export default NewsHeaderForm ;//向外暴露的必须是包装后的组件