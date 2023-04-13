//退出登录的组件
import React, { useState } from 'react'
import {  Modal } from 'antd';
const Exit = (props:any) => {
    const{handleOk,handleCancel}=props
    // const [isModalOpen, setIsModalOpen] = useState(true);
    
  return (
    <div>
        <Modal title="退出" open={true} onOk={handleOk} onCancel={handleCancel} okText="确定" cancelText="取消">
           确定要退出登录吗？
      </Modal>
    </div>
  )
}

export default Exit