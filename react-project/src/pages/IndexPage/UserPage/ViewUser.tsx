//查看用户
import React,{useState,useImperativeHandle} from 'react'
import {  Modal,Col, Row ,Avatar,Button} from 'antd';
import { UserOutlined,StarOutlined,SkinOutlined ,WhatsAppOutlined,MailOutlined,BankOutlined,
    FrownOutlined ,ImportOutlined,ClockCircleOutlined,MessageOutlined} from '@ant-design/icons';
const ViewUser = (props:any,ref:any) => {
    const {avatar,username,roleName,ssex,
       mobile,email,deptName,status,createTime,lastLoginTime,description}=props.options2  //获取父组件的值
      // console.log(props.options2);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
      };
      const showModal = () => {
        setIsModalOpen(true);
      };
      useImperativeHandle(ref,()=>{
          return {
            showModal            //暴露方法给父组件
          }
      })
      const Sex=()=>{          //根据数字判断性别的函数
         if(ssex==0){
             return '女'
         }else if(ssex==1){
             return '男'
         }
         return '保密'
      }
  return (
    <div>
         <Modal title="用户信息" open={isModalOpen} onCancel={handleCancel} footer={null} width={700}>
            {/* Col, Row表示栅格 */}
         <Row>
          <Col >
          <div style={{marginTop:20}}>
          <Avatar size={100} icon={<UserOutlined />} src={"http://xawn.f3322.net:8002/distremote/static/avatar/"+avatar}/>
          </div>
         </Col>
          <Col  >
              <div style={{marginTop:10,marginLeft:20,width:250}}>
              <div style={{marginTop:5}}><UserOutlined /> <label>账户：</label> <span>{username}</span></div>
              <div style={{marginTop:5}}><StarOutlined /> <label>角色：</label> <span>{roleName?roleName:'暂无角色'}</span></div>
              <div style={{marginTop:5}}><SkinOutlined /> <label>性别：</label> <span>{Sex()}</span></div>
              <div style={{marginTop:5}}><WhatsAppOutlined /> <label>电话：</label> <span>{mobile?mobile:'暂未绑定电话'}</span></div>
              <div style={{marginTop:5}}><MailOutlined /> <label>邮箱：</label> <span>{email?email:'暂未绑定邮箱'}</span></div>
              </div>
          </Col>
            <Col >
              <div style={{marginTop:10,marginLeft:30}}>
              <div style={{marginTop:5}}><BankOutlined /><label>部门：</label> <span>{deptName?deptName:'暂无部门信息'}</span></div>
              <div style={{marginTop:5}}><FrownOutlined /> <label>状态：</label> 
              {status==1? <Button type="primary" size="small">有效</Button>:<Button type="primary" danger size="small">锁定</Button>}</div>
              <div style={{marginTop:5}}><ClockCircleOutlined /><label>创建时间：</label> <span>{createTime}</span></div>
              <div style={{marginTop:5}}><ImportOutlined /> <label>最近登录：</label> <span>{lastLoginTime}</span></div>
              <div style={{marginTop:5}}><MessageOutlined /> <label>描述：</label> <span>{description}</span></div>
              </div>
            </Col>
  </Row>
         </Modal>
    </div>
  )
}

export default React.forwardRef( ViewUser)