import React ,{useRef,useState}from 'react'
import AccantLogin from './AccantLogin'
import PhoneLogin from './PhoneLogin';
import RegisterPage from './RegisterPage';
import ShopPage from './ShopPage';
import './LoginPage.less'
import { Tabs } from 'antd';
import  { TabsProps,Button } from 'antd';

  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `账户密码登录`,
     
    },
    {
      key: '2',
      label: `手机号登录`,
     
    },
    
  ];
  
const LoginPage = () => {
    const[code,setCode]=useState('1')
    const[code1,setCode1]=useState('1')
    const onChange = (key: string) => {
         setCode(key)
      };
    const register=(num:any)=>{
        setCode1(num)
    }
    // 去往注册页面
    if(code1=='2'){
       return (
        <div id="f1">
        <div id="f2"> <img src="http://xawn.f3322.net:8002/distremote/static/img/logo.png" /> 赤兔养车</div>
        <RegisterPage register={register}></RegisterPage>
        </div>
       )
    }
    // 去往商家入驻页面
    if(code1=='3'){
        return (
          <div id="f1">
            <div id="f2"><img src="http://xawn.f3322.net:8002/distremote/static/img/logo.png" /> 赤兔养车</div>
            <ShopPage register={register}></ShopPage>
            </div>
        )
    }
    return (
        <div id="f1">
            <div id="f2"> <img src="http://xawn.f3322.net:8002/distremote/static/img/logo.png" /> 赤兔养车</div>
           
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} tabBarGutter={140}/>
            {
                code=='1'?<AccantLogin></AccantLogin>:<PhoneLogin></PhoneLogin>
            }
          <div id='f3'>
            <Button type="link" id='btn1' onClick={()=>register('2')}>注册账户</Button> 
           <Button type="link" id='btn2' onClick={()=>register('3')}>商家入驻</Button>
          </div>
          
        </div>
       
      )
}

export default LoginPage