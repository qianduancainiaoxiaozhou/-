import React,{useEffect} from 'react'
import { Dropdown } from 'antd'

import Acotr from '../../assets/img/1.jpg'
const IndexHeardPage = (props:any) => {
    const {exit}=props  //子组件调父亲的方法
    const avatar=localStorage.USER_avatar
  const items = [
    {
      key: '1',
      label: '个人中心',
    },
    {
      key: '2',
      label: '修改密码',
    },
    {
      key: '3',
      label: '系统定制',
    },
    {
      key: '4',
      label: <span onClick={()=>exit(true)}>退出登录</span>
    },
  ];
  const userName=localStorage.USER_NAME   //从本地存储取出用户名
  return (
    <Dropdown menu={{items}} >
      <div style={{marginBottom:10}}>
        <img src={"http://xawn.f3322.net:8002/distremote/static/avatar/"+avatar} style={{width:30,height:30,borderRadius:15,marginRight:10}} />
          <span>{userName}</span>
     </div>
    </Dropdown>
  )
}

export default IndexHeardPage