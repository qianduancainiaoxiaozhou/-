import React, { useState } from 'react';
import {  Drawer,Space } from 'antd';
import {CloseOutlined } from '@ant-design/icons';   //引入小图标
const ViewRole = (props:any) => {
    const {closeModify}=props
    const onClose=()=>{
        closeModify()          //调去父组件的方法，关闭抽屉
    }
  return (
    <div>
    <Drawer title="角色信息" placement="right" 
    //onClose={onClose} 
    maskClosable={false}      //点击阴影层不关闭
    closable={false}          //不显示左上角的关闭图标
    extra={
        <Space>
            {/* 自定义关闭图标 */}
            <CloseOutlined  onClick={onClose}/>     
        </Space>
      }
    open={true}>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer></div>
  )
}

export default ViewRole