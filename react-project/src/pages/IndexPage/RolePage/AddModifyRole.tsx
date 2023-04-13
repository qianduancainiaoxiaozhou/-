import React, { useState,useEffect,useRef } from 'react';
import {  Drawer ,Divider,message, Popconfirm,Form,Input,Button,Tree,Select} from 'antd';

import { useSelector,useDispatch } from 'react-redux';
import type { DataNode } from 'antd/es/tree';
import { RoleMenu } from '../../../store/modules/RoleMenu/RoleMenuAction';   //调取状态机的公共方法
import { roleMenuId,addRole,modifyRole } from '../../../api/roleApi/roleApi';                   //获取个人角色菜单数据接口
import { getRole } from '../../../store/modules/Roles/RolesActions';
//方法和数据
const AddModifyRole = (props:any) => {
  const [messageApi, contextHolder] = message.useMessage()
    const dispatch=useDispatch()
    const { TextArea } = Input;
    const {modifyData,closeModify}=props               //接受父组件的传值
   //console.log(modifyData);
   
   const getUserRoleMenu=async()=>{                    //获取个人角色菜单数据方法
    const res=await roleMenuId(modifyData.roleId)
   // console.log(res);
    setCheckedKeys(res.data)                         //数据重新赋值
    setExpandedKeys(res.data)
}
   const [expandedKeys, setExpandedKeys] = useState([]);      //展开所有的初始状态
   const [checkedKeys, setCheckedKeys] = useState([]);       //设置树形结构选中的初始状态
   const [selectedKeys, setSelectedKeys] = useState([]);       //设置树形结构的初始状态
   const [autoExpandParent, setAutoExpandParent] = useState(true);  //设置树形结构的初始状态
   const[checkStrictly,setcheckStrictly]=useState(true)             //设置树节点父子是否关联的初始值
    useEffect(()=>{                                    //调用状态机的公共方法
         dispatch(RoleMenu() as any)
         getUserRoleMenu()
    },[])

    
    const treeDataMenu=useSelector((state:any)=>{
         return state.rolemenu
    })
    //console.log(treeDataMenu);
    let treeData: DataNode[] = []
    if(Object.keys(treeDataMenu).length!=0){       //判断treeDataMenu是否为空对象
        treeData=treeDataMenu.rows.children        //重新赋值
    }
    const onFinish = async(values: any) => {            //表单点击确认后的回调
     // console.log({...values,menuId:checkedKeys});
         if(modifyData==1){
            const res=await addRole({...values,menuId:checkedKeys.join(',')})   //checkedKeys.join(',')数组类型转为string内心，逗号隔开
            //console.log(res);
            if(res.status==200){
              messageApi.open({
                type: 'success',
                content: '角色新增成功',
              });
              closeModify()              //调用父组件的方法，关闭抽屉
              dispatch(getRole() as any)  //调取公共方法
            }
         }else{
          const res1=await modifyRole({...values,menuId:checkedKeys.join(','),roleId:modifyData.roleId})  //修改角色
          //console.log(res1);
          if(res1.status==200){
            messageApi.open({
              type: 'success',
              content: '角色新增成功',
            });
            closeModify()              //调用父组件的方法，关闭抽屉
            dispatch(getRole() as any)  //调取公共方法
          }
         }
   }
    const confirm = () => {                //气泡确认框，点击确认的回调
        closeModify()              //调用父组件的方法，关闭抽屉
      };
     
      const onExpand = (expandedKeysValue:any) => {     //树形结构展开/收起节点时触发
        //console.log('onExpand', expandedKeysValue);
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
      };
      
      const onCheck = (checkedKeysValue:any,e:any) => {     //点击树形复选框触发
       // console.log('onCheck',checkedKeysValue );
        setCheckedKeys(checkedKeysValue.checked);
      };
      
      const onSelect = (selectedKeysValue:any, info:any) => {   //点击树节点触发
        //console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
      };
      const handleLeafIconChange = (value:any) => {           //下拉框的回调函数
           //console.log(value);
           if(value=='1'){                                   //展开所有
            if(Object.keys(treeDataMenu).length!=0){       //判断treeDataMenu是否为空对象
              setExpandedKeys( treeDataMenu.ids)                                  //重新赋值
          }
         }
         if(value=='2'){                                   //收起所有
          setExpandedKeys([]) 
         }
        if(value=='3'){                                   //父子关联
          setcheckStrictly(false)
        }
        if(value=='4'){                                   //取消关联
          setcheckStrictly(true)
        }
      };



      // 返回的组件
    return (
        <div id='drow'>
               {contextHolder}
            <Drawer title={modifyData==1?'新增角色':'修改角色'}  placement="right" maskClosable={false} open={true}
            width={600}
            headerStyle={{fontSize:12}}
            closable={false}
            forceRender={true}       //对抽屉进行预渲染
            >
             <Form
            
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={modifyData}     //设置表单默认值，只有初始化以及重置时生效
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
          >
             <Form.Item label="角色名称" name='roleName'>
              <Input />
            </Form.Item>
            
            <Form.Item label="角色描述" name='remark'>
              <TextArea rows={4} />
            </Form.Item>

            <Tree                             //树形图组件
               checkable
               onExpand={onExpand}              //展开/收起节点时触发
               expandedKeys={expandedKeys}       //（受控）展开指定的树节点
               autoExpandParent={autoExpandParent}  //是否自动展开父节点
               onCheck={onCheck}                    //点击复选框触发
               checkedKeys={checkedKeys}     //选中树节点
               onSelect={onSelect}           //点击树节点触发
               selectedKeys={selectedKeys}    //（受控）设置选中的树节点
               treeData={treeData}            //树节点的数据
               checkStrictly={checkStrictly}          //是否父子关联，为true不关联

              />
           
            <Divider></Divider>
           {/* 树操作 */}
            <Select defaultValue="树操作" onChange={handleLeafIconChange}  
            placement='topLeft'        //placement该属性实现下拉框上拉
            style={{ width: 120 }}>
              <Select.Option value="1">展开所有</Select.Option>
              <Select.Option value="2">合并所有</Select.Option>
              <Select.Option value="3">父子关联</Select.Option>
              <Select.Option value="4">取消关联</Select.Option>
         </Select>
         {/* 确定取消按钮 */}
            <Form.Item style={{marginLeft:250,marginTop:-25}} >
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

export default AddModifyRole