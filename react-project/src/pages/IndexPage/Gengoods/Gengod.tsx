import React, { useState,useEffect,useRef } from 'react';
import { Divider, Space, Table ,Button, Pagination} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SettingTwoTone } from '@ant-design/icons';
import { useSelector,useDispatch } from 'react-redux';
import { goods } from '../../../store/modules/Goods/GoodsActions';
import PublicDrawer from '../../../component/PublicDrawer';
import HeadOperation from '../Gengoodstype/HeadOperation';
import ShopForm from './ShopForm';
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}






const Gengod = () => {
   const codeRef=useRef(null) as any
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
         codeRef.current=` ${selectedRowKeys}`
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', 
      name: record.name,
    }),
  };
  const dispatch=useDispatch()
   const[modifyData,setmodifyData]=useState(null)       //修改数据的初始状态
    useEffect(()=>{
        dispatch(goods({pageNum:1,pageSize:10}) as any)
    },[])
   const goodsData=useSelector((state:any)=>{
          return state.goods
   })
      //console.log(goodsData);
      let data: DataType[] = []
       let code1=0
      if(Object.keys(goodsData).length!=0){     //判断goodsData为非空对象
             data=goodsData.rows
             code1=Number(goodsData.total)
      }
     const handlepage=(page:any,pageSize:any)=>{
         console.log(page,pageSize);
         dispatch(goods({pageNum:page,pageSize}) as any)     //分页调取网络请求
     }
     const open=(options:any)=>{
      setmodifyData(options)                               //修改商品的传值
      console.log(options);
      
     }
     const  closeModify=()=>{
      setmodifyData(null)
     }
     const addGoodsType=(options:any)=>{
      setmodifyData(options)
     }


     const columns: ColumnsType<DataType> = [
      {
        title: '图片',
        dataIndex: 'photo',
        fixed: 'left',
        width: 100,
        render: (text: string) => {
          //console.log(text);
          return <img src={text} style={{width:30,height:30}} />
        },
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        width: 300,
      },
      {
        title: '商品类型',
        dataIndex: 'gname',
        width: 150,
      },
      {
        title: '服务类型',
        dataIndex: 'address',
        width: 150,
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 150,
        render:(text:string)=> text=='1'?'上架':'下架'
      },
      {
        title: '价格',
        dataIndex: 'price',
        width: 150,
      },
      {
        title: '数量',
        dataIndex: 'counts',
        width: 150,
      },
      {
        title: '点赞数',
        dataIndex: 'likes',
        width: 150,
      },
      {
        title: '描述',
        dataIndex: 'address',
        width: 300,
      },
      {
        title: '操作',
        key: 'action',
        width: 100,
        render: (_, record) => (
          <Space size="middle">
            <SettingTwoTone  onClick={()=>open(record)}/>
          </Space>
        ),
      },
      {
        title: '秒杀',
        key: 'action',
        width: 150 ,
        render: (_, record) => (
          <Space size="middle">
              <Button>加入秒杀</Button>
          </Space>
        ),
      },
    ];
  
  return (
    <div>
      <HeadOperation Name='商品管理' codeName='1' addGoodsType={addGoodsType} codeRef={codeRef}></HeadOperation>
      <Divider />
      <Table
        rowSelection={{
          //type: selectionType,
          ...rowSelection,
        }}
        scroll={{ x: 1300 }} 
        columns={columns}
        dataSource={data}
        rowKey='id'
        pagination={false}
      />
       <Pagination
      total={code1?code1:1 }      //对code进行判断
      showTotal={(total, range) =>{
         //console.log(range);
         
         return  `显示${range[0]}~${range[1]} 记录，共${total} 条记录`
      }}     //分页前面的标记说明
    
      defaultCurrent={1}
      hideOnSinglePage={true}          //只有一页时隐藏分页
      showQuickJumper={true}
      showSizeChanger={true}
      onChange={handlepage}
    />
    {
     modifyData? <ShopForm  Name='新增商品' closeModify={closeModify} modifyData={modifyData}></ShopForm> :null
      
    }
    </div>
  );
}

export default Gengod