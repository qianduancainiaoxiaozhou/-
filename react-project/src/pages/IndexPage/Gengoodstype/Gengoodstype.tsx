import React, { useState,useEffect,useRef } from 'react';
import { Space, Table ,Form,Input} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { allGoodsType } from '../../../store/modules/GoodsType/GoodsTypeActions';    //引入状态机的方法
import { useSelector,useDispatch } from 'react-redux';
import HeadOperation from './HeadOperation';
import PublicDrawer from '../../../component/PublicDrawer';
import PublicTree from '../../../component/PublicTree';
interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}







  

//函数的方法
const Gengoodstype = () => {
  const [modifyData,setModifyData]=useState(null)      //修改的初始值
   const codeRef:any=useRef(null)                          //多选框勾选的初始值
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch( allGoodsType() as any)               //调取状态机的方法
  },[])
  const AllGoodsType=useSelector((state:any)=>{
           return state.allGoodsType
  })
  console.log(AllGoodsType);
  let data: DataType[]=[]
  if(Object.keys(AllGoodsType).length!=0){
          data=AllGoodsType.rows.children
  }
  const [checkStrictly, setCheckStrictly] = useState(false);
  const open=(options:any)=>{                //点击修改的回调
       console.log(options);
       setModifyData(options)
  }
  const closeModify=()=>{                      //关闭抽屉的父组件的函数
    setModifyData(null)
  }
  const addGoodsType=(options:any)=>{
    setModifyData(options)
  }

  const rowSelection: TableRowSelection<DataType> = {         //多选框的勾选的函数
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          codeRef.current=`${selectedRowKeys}`
    },
   
  };
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'title',
      key: 'id',
      width: '12%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '30%',
      key: 'id',
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


  //返回的组件
  return (
    <>
    <HeadOperation  addGoodsType={addGoodsType} Name='商品类型管理'  codeRef={ codeRef}></HeadOperation>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={data}
      />
      {/* 用插槽的方式提高组件的复用性  FormItem用来传一个输入框,都用props接受, modifyData!=1在传输时写判断 */}
      {
       modifyData? <PublicDrawer Name='修改商品类型' modifyData={modifyData} closeModify={closeModify}
        FormItem1={<Form.Item label="商品类型名称" name='title'
                   rules={[{ required: true, message: '请输入商品类型' }]}>
                <Input />
              </Form.Item>}
         FormItem2={modifyData!='1'?<Form.Item label="商品类型状态" name='status'
           rules={[{ required: true, message: '请输入商品类型' }]}>
               <Input />
         </Form.Item>:null}   >
        <PublicTree></PublicTree>
        </PublicDrawer> :null
      }                          
    </>
  );
}

export default Gengoodstype