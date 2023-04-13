import React,{useEffect,useState,useRef} from 'react';
import { Space, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useSelector,useDispatch } from 'react-redux';                //引入状态机的中间件
import { getRole } from '../../../store/modules/Roles/RolesActions';  //获取角色数据的方法
import HeadOperation from '../../../component/HeadOperation';         //引入头部操作组件
import AddModifyRole from './AddModifyRole';                          //引入增加和修改的组件
import ViewRole from './ViewRole';                                    //引入查看的组件
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}




// 写方法和数据
const RolePage = () => {
  const dispatch=useDispatch()
  const codeRef:any=useRef(null)        //用于存储勾选的初始数据
  useEffect(()=>{                 //生命周期中调取角色数据的方法
      dispatch(getRole() as any)
  },[])
  const roleData=useSelector((state:any)=>{             //获取状态机的role数据
    return state.role
})
   let data: DataType[]=[]
   if(Object.keys(roleData).length != 0){
           data=roleData.rows
   }
   const [modifyData,setModifyData]=useState(null)         //设置修改数据的初始状态
   const [ViewData,setViewData]=useState(null)             //设置查看的初始数据
   const open=(options:any)=>{                             //修改修改打开抽屉的方法
      setModifyData(options)
   }
   const open1=(options:any)=>{                             //修改查看打开抽屉的方法
    setViewData(options)
 }
   const open2=(options:any)=>{                      //供子组件操作的方法
      setModifyData(options)
   }
   const closeModify = () => {     //关闭抽屉调用的函数
      setModifyData(null)
      setViewData(null)
  }

   //表格的数据
   const columns: ColumnsType<DataType> = [
    {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
     
    },
    {
      title: '描述',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (a: any, b: any) =>{                                  //升序或则降序,根据长度进行降序
        const time1=new Date(a.createTime).getTime()                //建一个时间戳，然后到1970年的大小进行比较排序
        const time2=new Date(b.createTime).getTime()
        return  time1-time2
      },    
    },
    {
      title: '修改时间',
      key: 'modifyTime',
      dataIndex: 'modifyTime',
      sorter: (a: any, b: any) =>{
        const time1=new Date(a.modifyTime).getTime()                //建一个时间戳，然后到1970年的大小进行比较排序
        const time2=new Date(b.modifyTime).getTime()
        return  time1-time2
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={()=>open(record)}>修改 </a>
          <a onClick={()=>open1(record)}>查看</a>
        </Space>
      ),
    },
  ];
  



// 返回组件
  return (
    <div>
      <HeadOperation Name='角色' open2={open2} codeRef={codeRef}></HeadOperation>
      {/* 表格部分 */}
      <Table
    rowSelection={{
      type: 'checkbox', onChange: (selectedRowKeys, selectedRows) => {    //rowSelection该属性是做表格勾选的
        console.log(selectedRowKeys, selectedRows);
          codeRef.current=selectedRowKeys
      }
    }}
    columns={columns} dataSource={data} rowKey='roleId'/>
    {/* 新增和修改组件 */}
   {
    modifyData? <AddModifyRole modifyData={modifyData} closeModify={closeModify}></AddModifyRole>:null
   }
   {/* 查看的组件 */}
      {
        ViewData?<ViewRole closeModify={closeModify}></ViewRole>:null
      }
    </div>
  )
}

export default RolePage