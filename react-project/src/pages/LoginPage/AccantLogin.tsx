import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input ,message} from 'antd';
import {useNavigate} from 'react-router-dom'
import './LoginPage.less'
import { loginApi } from '../../api/loginApi/loginApi';
import { MenuPermission } from '../../store/modules/Menus/actions';
import { useDispatch} from 'react-redux'

const AccantLogin = () => {
  const navigate=useNavigate() //使用路由跳转的api
  const [messageApi, contextHolder] = message.useMessage();  //使用全局消息组件
  const dispatch =useDispatch()
    const onFinish = async(values: any) => {
      //  console.log( values);
      
       const res= await loginApi(values)
       console.log(res);
       if(res.status==200){
              localStorage.USER_token=res.data.data.token                   //保存token
              localStorage.USER_roles=JSON.stringify(res.data.data.roles)   //保存角色
              localStorage.USER_time=res.data.data.exipreTime               //保存登录时间
              localStorage.USER_deptName=res.data.data.user.deptName        //保存部门
              localStorage.USER_permissions=JSON.stringify(res.data.data.permissions)    //保存权限
              localStorage .USER_NAME=res.data.data.user.username            //保存用户名
              localStorage.USER_avatar=res.data.data.user.avatar
              await  dispatch(MenuPermission()as any);          //调用状态机里面的公共方法,因为这个方法是去其他地方调用，所以需要阻塞一下
              messageApi.open({
                type: 'success',
                content: '恭喜您登录成功',
              });
              navigate('/home',{replace:true})      //路由api跳转

    }else{
        messageApi.open({
          type: 'error',
          content: '登录失败密码或者账号有误',
        });
    }
      };
  return (
    <>
     {contextHolder}
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="请输入密码"
        />
      </Form.Item>
    <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
    </>
  
  )
}

export default AccantLogin