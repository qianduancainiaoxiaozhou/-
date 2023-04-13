import React from 'react'

import { Button, Form, Input } from 'antd';
import './LoginPage.less'
const PhoneLogin = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
      };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input  placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <>
        <Input placeholder="请输入验证码"style={{width:200}}/>
        <Button style={{width:80,fontSize:8,marginLeft:20}}>获取验证码</Button>
        </>
      </Form.Item>
    <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PhoneLogin