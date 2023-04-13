import React, { useState, useRef } from 'react'
import { Button, Form, Input } from 'antd';
import './LoginPage.less'
import { registerApi } from '../../api/registerApi/registerApi';
import { checkApi } from '../../api/userCheckApi/checkApi';
const RegisterPage = (props: any) => {
  const { register } = props
  const nameRef = useRef(true)
  const onFinish = async (values: any) => {
    const values1 = { username: values.username, password: values.password }
    console.log(values1);
    const res = await registerApi(values1)
    console.log(res);

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
        rules={[
          {
            validator: (_, value) => {                 // validator自定义进行检验，后面是promise风格
              if (value) {
                return checkApi(value).then(res => {
                  if (!res.data) {
                    return Promise.reject('用户名已存在');
                  }
                })

              } else {
                return Promise.reject('请输入用户名');
              }
            }
          },

        ]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '两次密码需要相同',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码不相同'));          //验证两次密码是否相同
            },
          }),
        ]}
      >
        <Input.Password placeholder="请确认密码" />
      </Form.Item>
      <Form.Item >
        <div id='e1'>
          <Button type="primary" htmlType="submit">
            确认注册
          </Button>
          <Button type="link" id='btn1' onClick={() => register('1')}>已有账户去登录</Button>
        </div>
      </Form.Item>
    </Form>
  )
}

export default RegisterPage