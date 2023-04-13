//封装公共的头部操作
import React,{useEffect,useRef} from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button,Dropdown,Form, Input, DatePicker,TreeSelect, message, Popconfirm} from 'antd';
import { deleteUserApi } from '../api/deleteUserApi/deleteUserApi';
import { userExcelApi } from '../api/userExcelApi/userExcelApi';       //删除用户
import { useSelector ,useDispatch} from 'react-redux';
import { dept } from '../store/modules/Dept/DeptActions';
import { findUser } from '../store/modules/FindUser/FindUserActions';  //引入状态机的查询用户的方法
import { deleteRole } from '../api/roleApi/roleApi';                   //删除角色
import { getRole } from '../store/modules/Roles/RolesActions';         //引入获取角色的公共方法
import { deleteMenuApi } from '../api/menusApi/menuApi';              //删除菜单
import { AllMenu } from '../store/modules/AllMenu/AllMenuActions';    //调取状态机获取所有菜单的方法
// 函数的内部
const HeadOperation = (props:any) => {
  const dispatch=useDispatch()                                   //用dispatch调取状态机的方法
  const [messageApi, contextHolder] = message.useMessage();      //使用全局的消息提示
    const {open2,codeRef,Name,addMenu}=props                 //获取父组件的方法和值，Name用控制不同组件的显示
    const { RangePicker } = DatePicker; //时间选择
    const timeRef=useRef([])           //用于得到时间选择的对象
    const handleMenuClick: MenuProps['onClick'] = (e) => {      //进行execl表的导出
       console.log('click', e);
       if(e.key=='2'){             
              userExcelApi().then(res=>{
                   console.log(res);
                   const blob= new Blob( [res.data],{        //new一个blob对象
                    type: 'application/vnd.ms-excel;charset=utf-8'
                   })
                   const link = document.createElement('a');         //创建一个a标签
                   // 下载后的文件名
                   link.download = "202303230174.xlsx";
                
                   link.href = URL.createObjectURL(blob);
                   document.body.appendChild(link)
                   link.click();
                   //释放URL对象
                   URL.revokeObjectURL(link.href);
                   document.body.removeChild(link);
                   message.success("成功")
              })
          
      
       }
      };
      useEffect(()=>{
          dispatch(dept()as any)                 //调取dept的方法
      },[])
     const treeData=useSelector((state:any)=>{    
           return state.dept
     })
     //console.log(treeData);
     
      const items: MenuProps['items'] = [            
        // {
        //   label: '密码重置',
        //   key: '1',
        // },
        {
          label: '导出Excel',
          key: '2',
         },
       
      ];
     
       const menuProps = {
        items,
        onClick: handleMenuClick,
      };
      
      const [form] = Form.useForm();
      const onReset = () => {          //表单重置
        form.resetFields();
        dispatch({type:"SET_FINDUSER",payload:{}})      //点击重置时状态机的初始数据程序回到空对象
      };
     const open=(a:any)=>{            //调方法，给父组件传值,增加用户,做新增的数据控制
        open2(a)
     }


     const deleteUser=async()=>{         // 删除用户的方法
      if(codeRef.current){
        if(Name=='用户名'){
             // console.log(codeRef);
             const res=await deleteUserApi(codeRef.current)
             // console.log(res);
               if(res.status==200){
                 messageApi.open({
                   type: 'success',
                   content: '用户删除成功',
                 });
               }
          }
          if(Name=='角色'){
            // console.log(codeRef);
            const res=await deleteRole(codeRef.current)
          // console.log(res);
            if(res.status==200){
              messageApi.open({
                type: 'success',
                content: '角色删除成功',
              });
              dispatch(getRole() as any)  //调取公共方法
            }
          }
          if(Name=='名称'){
            // console.log(codeRef);
            const res=await deleteMenuApi(codeRef.current)
             console.log(res);
            if(res.status==200){
              messageApi.open({
                type: 'success',
                content: '菜单删除成功',
              });
              dispatch( AllMenu() as any)  //调取公共方法
            }
          }
      }else{
        messageApi.open({
          type: 'warning',
          content: '请先勾选需要删除的用户',
        });
       }
      }


     const onFinish=(values:any)=>{
         console.log({...values,...timeRef.current});
         //传的参进行字符串的拼接
         dispatch(findUser(`sortField=undefined&sortOrder=undefined&username=${values.username?values.username:''}&deptId=${values.deptId?values.deptId:''}&${timeRef.current[0]?`createTimeFrom=${timeRef.current[0]}&createTimeTo=${timeRef.current[1]}&`:''}pageSize=10&pageNum=1`) as any)     //调取状态机的方法
     }
    const handleSelectTime = (value:any,dateString:any) => {        //获取时间列表选择的函数
      // console.log('选择的时间：', dateString)
      timeRef.current=dateString
    }
    const confirm = (e: any) => {                      //气泡框的按钮回调
            addMenu('2')  
    };
    
    const cancel = (e: any) => {                     //气泡框的菜单的回调
      
      addMenu(e)                                       //调父组件的方法，传值个父组件
    };




    //返回的组件
    if(Name=='角色' || Name=='名称'){
      return (
        <>
         {contextHolder}
         <div>
         <Form
            // labelCol={{ span: 4 }}
            // wrapperCol={{ span: 14 }}
             layout="inline"
             style={{ maxWidth: 2500}}
             form={form}
             onFinish={onFinish}
          >
             <Form.Item label={Name} name="username" >
              <Input />
            </Form.Item>
            <Form.Item label="创建时间" >
              <RangePicker 
             onChange={handleSelectTime}/>
             </Form.Item>
            <Form.Item style={{marginLeft:10}}>
            <Button type="primary" htmlType="submit">
             查询
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
         </Form>
         </div>
         <div>
          {
            Name=='名称'? <Popconfirm
            title="请选择创建类型"
            //description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={()=>cancel('1')}           //菜单管理的新增菜单的按钮
            okText="按钮"
            cancelText="菜单"
          >
            <Button style={{margin:10}} >新增</Button>
          </Popconfirm>:<Button style={{margin:10}} onClick={()=>open('1')}>新增</Button>
          }
             
             <Button style={{marginRight:10}} onClick={deleteUser}>删除</Button>
           <Dropdown menu={menuProps}>
          <Button> 更多操作<DownOutlined /></Button>
        </Dropdown>
        </div>
        </>
      )
    }


    //返回的组件
 return (
    <>
     {contextHolder}
     <div>
     <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
         layout="inline"
         style={{ maxWidth: 1000,marginLeft:50}}
         form={form}
         onFinish={onFinish}
      >
         <Form.Item label={Name} name="username">
          <Input />
        </Form.Item>
        <Form.Item label="部门" style={{marginLeft:50}} name='deptId'>
          <TreeSelect
            treeData={treeData}
          />
        </Form.Item>
        <Form.Item label="创建时间" style={{marginTop:10}}>
           
          <RangePicker 
         onChange={handleSelectTime}/>
        
        </Form.Item>
        <Form.Item style={{marginLeft:250,marginTop:10}}>
        <Button type="primary" htmlType="submit">
         查询
        </Button>
        <Button htmlType="button" onClick={onReset}>
          重置
        </Button>
        
      </Form.Item>
     </Form>
     </div>
     <div>
         <Button style={{margin:10}} onClick={()=>open('1')}>新增</Button>
         <Button style={{marginRight:10}} onClick={deleteUser}>删除</Button>
       <Dropdown menu={menuProps}>
      <Button> 更多操作<DownOutlined /></Button>
    </Dropdown>
    </div>
    </>
  )
  
}

export default HeadOperation