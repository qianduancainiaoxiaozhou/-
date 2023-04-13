import React, { useState } from 'react';
import {Button,Form,Input,Select,TreeSelect,message} from 'antd';
import './index.less'
import { DeleteGoodsType } from '../../../api/goodsTypeApi/goodsTypeApi';
import { deletegoodsApi } from '../../../api/goodsApi/goodsApi';
import { goods } from '../../../store/modules/Goods/GoodsActions';
import { useDispatch } from 'react-redux';
type SizeType = Parameters<typeof Form>[0]['size'];


const HeadOperation = (props:any) => {
  const dispatch=useDispatch()
    const [messageApi, contextHolder] = message.useMessage();  
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
     const {codeName,addGoodsType,Name,codeRef}=props
     const onFinish = (values: any) => {
        console.log(values);
      };
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
        console.log(11);
        
      };
      const deleteUser=async()=>{         // 删除商品类型的方法
        if(codeRef.current){
          if(Name=='商品类型管理'){
               // console.log(codeRef);
               const res=await  DeleteGoodsType(codeRef.current)
               // console.log(res);
                 if(res.status==200){
                   messageApi.open({
                     type: 'success',
                     content: '商品类型删除成功',
                   });
                 }
            }
            if(Name=='商品管理'){
              console.log(codeRef.current);
              const res=await  deletegoodsApi(codeRef.current)
              console.log(res);
                if(res.status==200){
                  messageApi.open({
                    type: 'success',
                    content: '商品类型删除成功',
                  });
                  dispatch(goods({pageNum:1,pageSize:10}) as any)     //分页调取网络请求
                }
           }
            
        }else{
          messageApi.open({
            type: 'warning',
            content: '请先勾选需要删除的用户',
          });
         }
        }
   
  return (
    <div id="box">
           {contextHolder}
        <Form
             layout="inline"
             onFinish={onFinish}
             style={{ maxWidth: 2500 }}
             form={form}
            >
    
       
        <Form.Item label="商品名称" style={{marginLeft:10}} name='1'>
           <Input />
         </Form.Item>
       
       <Form.Item label="商品状态" style={{marginLeft:10}} name='2'>
            <Select>
        <Select.Option value="demo">Demo</Select.Option>
      </Select>
    </Form.Item>
    {  codeName=='1'?
      <Form.Item label="商品类型" style={{marginLeft:10}} name='3'>
      <TreeSelect
        treeData={[
          { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
        ]}
      />
    </Form.Item>:null
    }
    <Form.Item  style={{marginLeft:50}}>
      <Button  style={{marginRight:10}}>查询</Button>
      <Button  htmlType="button"  onClick={onReset}>重置</Button>
    </Form.Item>
  </Form>
        <div style={{margin:20}}>
        <Button style={{marginRight:10}} onClick={()=>addGoodsType('1')}>新增</Button>
         <Button onClick={deleteUser}>删除</Button>
        </div>
    </div>

  )
}

export default HeadOperation