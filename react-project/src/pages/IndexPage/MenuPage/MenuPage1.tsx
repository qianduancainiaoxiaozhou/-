import React, { useState,useEffect ,useRef} from 'react';
import { Space,Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useSelector,useDispatch } from 'react-redux';
import { AllMenu } from '../../../store/modules/AllMenu/AllMenuActions';  //引入获取所有菜单的公共方法
import HeadOperation from '../../../component/HeadOperation';            //引入头部操作组件
import AddModifyMenu from './AddModifyMenu';                             //引入增加和修改的组件
interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}



// 写函数方法和数据
const MenuPage1 = () => {
  const dispatch=useDispatch()
  const [checkStrictly, setCheckStrictly] = useState(false); 
  const codeRef=useRef('')                 //定义多选框的初始状态
   useEffect(()=>{
      dispatch(AllMenu() as any)
   },[])
   const AllMenuData=useSelector((state:any)=>{
          return state.allmenu
   })
   const [modifyData,setModifyData]=useState(null)            //修改菜单的数据初始化

   //console.log(AllMenuData);
   let data: DataType[] = [];
   if(Object.keys(AllMenuData).length!=0){            //判断为非空对象
         data=AllMenuData.rows.children
   }
   const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      codeRef.current=`${selectedRowKeys}`                    //将勾选的数据赋值
    },
   
  };
  const open=(options:any)=>{                          //打开抽屉的方法
    setModifyData(options)
  }
 const closeModify=()=>{                              //关闭抽屉的方法
  setModifyData(null)
 }
  const addMenu=(options:any)=>{                                //菜单管理的新增菜单的一个方法
    setModifyData(options)                                //修改初始值，打开抽屉
  }
   
  
  //定义表格
   const columns: ColumnsType<DataType> = [
    {
      title: '名称',
      dataIndex: 'title',
      key: 'id',
      fixed: 'left',          //表格固定定位到左边
      width: 250,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'id',
      width: 150,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'id',
      width: 150,
    },
    {
      title: '地址',
      dataIndex: 'path',
      key: 'id',
      width: 150,
    },
    {
      title: 'vue组件',
      dataIndex: 'component',
      key: 'id',
      width: 150,
    },
    {
      title: '权限',
      dataIndex: 'permission',
      key: 'id',
      width: 150,
    },
    {
      title: '排序',
      dataIndex: 'order',
      key: 'id',
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'id',
      width: 150,
    },
    {
      title: '修改时间',
      dataIndex: 'modifyTime',
      key: 'id',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      // sorter: true,
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>open(record)}>修改</a>
        </Space>
      ),
      fixed:'right',
      width:250,
    },
  ];




  //返回组件
  return (
    <>
    <HeadOperation Name='名称' addMenu={addMenu} codeRef={codeRef}></HeadOperation> 
    <Table
      columns={columns}
      rowSelection={{ ...rowSelection, checkStrictly }}
      dataSource={data}
      scroll={{ x: 200 }}        //设置表格的横向滚动
    />
    {/* 新增和修改的组件 */}
    {
        modifyData?<AddModifyMenu modifyData={modifyData} closeModify={closeModify}></AddModifyMenu>:null
    }
  </>
  )
}

export default MenuPage1