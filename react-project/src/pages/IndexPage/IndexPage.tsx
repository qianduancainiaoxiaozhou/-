import React, { useState,useRef ,useEffect} from 'react';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import {Outlet,useNavigate} from 'react-router-dom'
import IndexHeardPage from './IndexHeardPage';
import './IndexPage.less'
import Exit from '../../component/Exit';

import MenuPage from './MenuPage';
import { useMenu } from '../../Hooks/useMenu';
const IndexPage = () => {
  const navigate=useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer },} = theme.useToken();
    const [code ,setCode]=useState(false)
    const exit=(num:boolean)=>{
      setCode(num)
    }
    const handleOk = () => {    //Exit子子组件调用 确定退出的
        navigate('/login',{replace:true})
        localStorage.clear()   //清空本地存储
      setCode(false)
    };
    const handleCancel = () => {    //Exit子子组件调用
      setCode(false)
    };
    
 return (
     <>
        <Layout id='Lay'>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" ><img src="http://xawn.f3322.net:8002/distremote/static/img/logo.png"  /> 赤兔养车</div>
          <MenuPage></MenuPage>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
           
           <div style={{float:'right',marginRight:30}}>
             <IndexHeardPage exit={exit}></IndexHeardPage> 
           </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
           <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
      {/* 退出登录的组件 */}
     {
      code? <Exit handleOk={handleOk} handleCancel={handleCancel}></Exit>  :null    //打开模态框
     } 
     </>
    );
}

export default IndexPage