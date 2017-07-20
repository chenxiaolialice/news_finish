import React,{Component} from "react" ;
import {Link} from "react-router" ;

import {
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

/*let MenuItem= Menu.Item ;*/
let TabPane=Tabs.TabPane;
let FormItem= Form.Item ;


//移动端头部组件
class MobileNewsHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            username:null,
            modalVisible:false
        }
    }
    componentWillMount=()=>{
        //读取保存的数据
        const username=localStorage.getItem('username') ;
        if(username){
            //更新状态
            this.setState({username})
        }
    };
    //更新状态 ModalVisible
    setModalVisible=(modalVisible)=>{
        this.setState({modalVisible})
    };
    //处理提交(注册/登陆)
    handleSubmit = (isRegist, event) => {
        //阻止表单的提交默认行为
        event.preventDefault() ;

        //收集输入数据, 准备url

        let action=isRegist?'register':'login' ;
        let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=${action}`

        if(isRegist){//注册
            let {r_username, r_password, r_confirm_password}=this.props.form.getFieldsValue() ;
            url +=`&r_userName=${r_username}&r_password=${r_password}&r_confirmPassword=${r_confirm_password}`
        }else{
            let {username,password}=this.props.form.getFieldsValue() ;
            url +=`&username=${username}&password=${password}`

        }

        //发送ajax请求
        axios.get(url)
            .then(response =>{
                let result=response.data ;
                console.log(result);
                if(isRegist){
                    message.success('注册成功')
                }else{
                    if(!result){
                        message.error('登陆失败')
                    }else {
                        message.success('登陆成功')

                        let username=result.NickUserName
                        let userId=result.UserId
                        //更新状态
                        this.setState({username})
                        //保存到localStorage
                        localStorage.setItem('username',username)
                        localStorage.setItem('userId',userId)
                    }
                }
            })
        //更新modalVisible
        this.setState({modalVisible:false})

    }
        render(){
        let {username,modalVisible}=this.state
        const {getFieldDecorator} = this.props.form
        const userItem =username
            ? <Link to="/usercenter">
               <Icon type="inbox"/>
            </Link>
            :<Icon type="setting" onClick={this.setModalVisible.bind(this, true)}/>
        return(
            <div id="mobileheader">
                <header>
                    <div>
                        <Link to="/">
                            <img src={logo} alt="logo"/>
                            <span>ReactNews2</span>
                        </Link>
                        {userItem}
                    </div>
                </header>
                <Modal title='用户中心'
                        visible={modalVisible}
                        onOk={this.setModalVisible.bind(this, false)}
                        onCancel={this.setModalVisible.bind(this, false)}
                        okText='关闭'>
                    <Tabs type="card" onChange={()=>this.props.form.resetFields()}>
                        <TabPane tab="登录" key="1">
                            <Form onSubmit={this.handleSubmit.bind(this, false)}>
                                <FormItem label='账户'>
                                    {
                                        getFieldDecorator('username')(
                                            <Input type='text' placeholder="请输入账户"/>
                                        )
                                    }

                                </FormItem>
                                <FormItem label='密码'>
                                    {
                                        getFieldDecorator('password')(
                                            <Input type='password' placeholder="请输入密码"/>
                                        )
                                    }

                                </FormItem>
                                <Button type='primary' htmlType='submit'>登录</Button>
                            </Form>
                        </TabPane>

                        <TabPane tab="注册" key="2">
                            <Form onSubmit={this.handleSubmit.bind(this, true)}>
                                <FormItem label='账户'>
                                    {
                                        getFieldDecorator('r_username')(
                                            <Input type='text' placeholder="请输入账户"/>
                                        )
                                    }

                                </FormItem>
                                <FormItem label='密码'>
                                    {
                                        getFieldDecorator('r_password')(
                                            <Input type='password' placeholder="请输入密码"/>
                                        )
                                    }

                                </FormItem>
                                <FormItem label='确认密码'>
                                    {
                                        getFieldDecorator('r_confirm_password')(
                                            <Input type='password' placeholder="请输入确认密码"/>
                                        )
                                    }

                                </FormItem>
                                <Button type='primary' htmlType='submit'>注册</Button>
                            </Form>

                        </TabPane>
                    </Tabs>

                </Modal >
            </div>
        )
    }

}


export default Form.create()(MobileNewsHeader)