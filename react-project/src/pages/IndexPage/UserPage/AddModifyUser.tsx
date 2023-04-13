//新增和修改用户的组件
import React, { useState,useEffect } from 'react';
import {  Drawer ,Divider,message, Popconfirm,Form,Input,Button,Radio,Select,TreeSelect } from 'antd';
import './User.less'
import { useSelector,useDispatch } from 'react-redux';
import { dept } from '../../../store/modules/Dept/DeptActions';  //获取状态机的公共方法
import { getRole } from '../../../store/modules/Roles/RolesActions';    //获取状态机的公共方法
import { modifyUser } from '../../../store/modules/ModifyUser/ModifyUserAction';  //获取状态机的公共方法
import { AddUser } from '../../../store/modules/User/UserAction';                
import {addUser1}  from '../../../store/modules/AddUser/AddUserActions'       //获取状态机的新增用户公共方法
import { checkApi } from '../../../api/userCheckApi/checkApi';
const AddModifyUser = (props:any,ref:any) => {
  
    const {options1,closeModify}=props
    console.log(options1);
   const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(dept() as any)          //调取状态机的dept方法
        dispatch(getRole() as any)        //调取状态机的role方法
    },[])
    const deptData=useSelector((state:any)=>{            //获取状态机的dept数据
         return state.dept                 
    })
    const roleData=useSelector((state:any)=>{             //获取状态机的role数据
         return state.role
    })
    // console.log(roleData);
    
       let options:any=[]
    if( Object.keys(roleData).length != 0){              //判断角色数据为非空对象
       options=roleData.rows.map((item:any)=>{          //修改options数组的值
        return {
           label:item.roleName,
            value:item.roleId
      }
})
    }
   
  
  const confirm = () => {                //气泡确认框
    closeModify()                       //调用父组件的方法
  };
  
 
                    
  const onFinish = (values: any) => {        //表单提交的数据
    // console.log('Success:', values);
     const value1= {                      //确定初始的表单数据
       ...values, 
      roleId:values.roleName[0],
      deptId:values.deptName,
      userId:options1.userId
  }
    if(values.deptName==options1.deptName){
       value1.deptId=options1.deptId
    }
    if(values.roleName==options1.roleName){
         value1.roleId=options1.roleId
    }
    console.log(value1);
    if(options1==1){
      dispatch(addUser1(`username=${value1.username}&password=1234qwer&email=${value1.email}&mobile=${value1.mobile}&roleId=${value1.roleId}&deptId=${value1.deptId}&status=${value1.status}&ssex=${value1.ssex}`) as any)   //新增用户
    }else{
      dispatch(modifyUser(value1) as any)   //修改用户
    }
    
     closeModify()       //调用父组件的方法
     dispatch(AddUser({}) as any)
     
   };
 

  return (
    <div id='drow'>
        
        <Drawer title={options1==1?'新增用户':'修改用户'}  placement="right" maskClosable={false} open={true}
        width={600}
        headerStyle={{fontSize:12}}
        closable={false}
        forceRender={true}       //对抽屉进行预渲染
        >
         <Form
        
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={options1}     //设置表单默认值，只有初始化以及重置时生效
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        {/* initialValue做数据回显 */}
       {
         options1==1?<Form.Item label="用户名" name='username' 
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
 
         ]} >  
           <Input />
         </Form.Item>:<Form.Item label="用户名" name='username' 
         rules={[
          {
            required: true,
            message: '输入用户名',
          },
 
         ]} >  
           <Input />
         </Form.Item>
       }
        {
          options1==1? <Form.Item label="密码" name='password'  initialValue='1234qwer'>   
          <Input.Password  disabled={true}/> 
          </Form.Item>:null
        }
      
        <Form.Item label="邮箱" name='email'  
         rules={[
          {
            required: true,
            message: '输入邮箱',
          },
         
        ]} >
          <Input />
        </Form.Item>
        <Form.Item label="手机" name='mobile' 
         rules={[
          {
            required: true,
            message: '请输入手机号',
          },
          {
            pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '请输入正确的手机号',
        },
        ]} >
          <Input />
        </Form.Item>
        <Form.Item label="角色" name='roleName'
         rules={[
          {
            required: true,
            message: '请选择角色',
          },
         
        ]} >
        <Select
         mode="multiple"
          allowClear
          style={{ width: '100%' }}
          
         options={options}
    />
        </Form.Item>
        <Form.Item label="部门" name='deptName' 
         rules={[
          {
            required: true,
            message: '请选择部门',
          },
         
        ]} >
          <TreeSelect
            treeData={deptData}
          />
        </Form.Item>
        <Form.Item label="状态" name='status' 
         rules={[
          {
            required: true,
            message: '请选择状态',
          },
         
        ]}>
          <Radio.Group>
            <Radio value="0"> 锁定 </Radio>
            <Radio value="1"> 有效</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="性别" name='ssex' 
         rules={[
          {
            required: true,
            message: '请选择性别',
          },
         
        ]}>
          <Radio.Group>
            <Radio value="1"> 男 </Radio>
            <Radio value="0"> 女 </Radio>
            <Radio value="2"> 保密 </Radio>
          </Radio.Group>
        </Form.Item>
        <Divider></Divider>
        <Form.Item style={{marginLeft:250}} >
        
        <Popconfirm
        placement="topLeft"
        title={'确定要放弃编译？'}
        
        onConfirm={confirm}
        okText="是"
        cancelText="否"
      >
        <Button style={{marginLeft:150}}>取消</Button>
      </Popconfirm>
         <Button type="primary" style={{marginLeft:10}} htmlType="submit">确定</Button>
        </Form.Item>
        
      </Form>
        </Drawer>
    </div>
  )
}

export default  AddModifyUser;