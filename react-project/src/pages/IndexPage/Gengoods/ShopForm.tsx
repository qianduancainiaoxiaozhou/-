import React, { useState,useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form,Input, Button,Radio,DatePicker,InputNumber,TreeSelect,Upload,Drawer ,Popconfirm,message} from 'antd';
import { servicetypeApi,goodstypeApi ,putgoodsApi,addgoodsApi} from '../../../api/goodsApi/goodsApi';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { useDispatch } from 'react-redux';
import { goods } from '../../../store/modules/Goods/GoodsActions';
const ShopForm = (props:any) => {
  const dispatch=useDispatch()
  const [messageApi, contextHolder] = message.useMessage();
  const {Name ,children,FormItem1,modifyData,FormItem2,closeModify}=props        //props自带children的属性，实现插槽的显示
  const [treeData1,setTreeData1]=useState([])         //服务类型数据初始化
  const [treeData2,setTreeData2]=useState([])         //商品类型数据初始化
  const [fileList, setFileList]=useState([{url:modifyData.photo}]) as any   //图片数据的回显
  const [goodsTypeId,setgoodsTypeId]=useState(null)              //商品类型id的初始值
  const [serviceTypeId,setserviceTypeId]=useState(null)              //服务类型id的初始值
   useEffect(()=>{
      servicetype()
      goodstype()
    },[])
    const servicetype=async()=>{            //获取服务类型数据
         const res =await servicetypeApi()
       //  console.log(res);
         setTreeData1(res.data.rows.children)
   }
    const  goodstype=async()=>{            //获取商品类型数据
        const res =await goodstypeApi()
       // console.log(res);
        setTreeData2(res.data.rows.children)
    }
 console.log(modifyData);
  
  const onFinish=async(values:any)=>{       //点击确认的回调
         console.log(values);
        if(modifyData==1){
          const res=await addgoodsApi({id:modifyData.id,...values,goodsTypeId:goodsTypeId,serviceTypeId:serviceTypeId})
          //console.log(res);
          if(res.status==200){
           messageApi.open({
             type: 'success',
             content: '新增成功',
           });
           closeModify() 
           dispatch(goods({pageNum:1,pageSize:10})as any) 
          }
        }else{
          const res=await putgoodsApi({id:modifyData.id,...values})
          //console.log(res);
          if(res.status==200){
           messageApi.open({
             type: 'success',
             content: '修改成功',
           });
           closeModify() 
           dispatch(goods({pageNum:1,pageSize:10})as any) 
          }
        }
    }
    const confirm = () => {                //气泡确认框，点击确认的回调
        closeModify()              //调用父组件的方法，关闭抽屉
      };
 
 const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>{
     //console.log({ fileList: newFileList });    //可以获取到图片上传成功的路径
     
     return setFileList(newFileList)
 };   //上传新增图片的回调
 const handleChange1=(value:any)=>{
    // console.log(value);
     setgoodsTypeId(value)
 }
 const handleChange2=(value:any)=>{
  setserviceTypeId(value)
 }
  return (
    
       <div id='drow'>
        {contextHolder}
   <Drawer title={Name}  placement="right" maskClosable={false} open={true}
      width={600}
      headerStyle={{fontSize:12}}
      closable={false}
      forceRender={true}       //对抽屉进行预渲染
    >
      <Form
            
            layout="horizontal"
            initialValues={modifyData}     //设置表单默认值，只有初始化以及重置时生效
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
          >
      
       <Form.Item label="商品名称"  rules={[{ required: true, message: '请输入商品名称' }]} name='name'>
          <Input />
        </Form.Item>
      <Form.Item label="商品类型"  rules={[{ required: true, message: 'Please input your username!' }]} name='gname'>
          <TreeSelect
            treeData={treeData2}
            onChange={handleChange1}
          />
        </Form.Item>
        <Form.Item label="服务类型">
          <TreeSelect
            treeData={treeData1}
            onChange={handleChange2}
          />
        </Form.Item>
        
        <Form.Item label="描述" name='descs'>
          <TextArea rows={4} />
        </Form.Item>
       
        <Form.Item label="价格" rules={[{ required: true, message: 'Missing area' }]} name='price'>
          <InputNumber />
        </Form.Item>
        
        <Form.Item label="数量" rules={[{ required: true, message: 'Missing area' }]} name='counts'>
          <InputNumber />
        </Form.Item>
        
        <Form.Item label="状态" rules={[{ required: true, message: 'Missing area' }]} name='status'>
          {/* value属性做选择的回现 */}
          <Radio.Group value={modifyData.status}>
            <Radio value={1}> 上架 </Radio>
            <Radio value={0}> 下架 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="商品图片" rules={[{ required: true, message: 'Missing area' }]} >
          <Upload action="http://47.98.128.191:3000/images/uploadImages" listType="picture-card" 
          fileList={fileList}
          onChange={handleChange}>
         
          <div>
             <PlusOutlined />
             <div style={{ marginTop: 8 }}>请上传图片</div>
            </div>
           
          </Upload>
        </Form.Item>
        <Form.Item style={{marginLeft:250,marginTop:-15}} >
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
  );
}

export default ShopForm