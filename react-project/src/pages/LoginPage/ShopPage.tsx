import React, { useState,useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form,Input, Button, Radio, Upload,message} from 'antd';
import './LoginPage.less'
import { addShopApi, telApi ,shopNameApi} from '../../api/addShopApi/addShopApi';

const ShopPage = (props:any) => {
  const [messageApi, contextHolder] = message.useMessage();  //使用全局消息组件
   const [addShop,setAddShop]=useState({}) 
   const codeRef=useRef(true)   
    const {register}=props
     const handleChange=(file:any)=>{     //  上传中、完成、失败都会调用这个函数。
        //  console.log(file.file);
         if(file.file.status=='done'){
             setAddShop({...addShop, idCardImg:file.file.response.data[0] })
         }
        }
        const handleChange1=(file:any)=>{     //  上传中、完成、失败都会调用这个函数。
          // console.log(file.file);
          if(file.file.status=='done'){
            setAddShop({...addShop, licenceImg:file.file.response.data[0] })
        }
         }
         const onFinish = async(values: any) => {
          // console.log('Received values of form: ', values);
           //console.log({...addShop,...values});
              const res=await addShopApi({...addShop,...values})
              console.log(res);
             if(res.status==200){
              messageApi.open({
                type: 'success',
                content: '恭喜您申请成功',
                duration:5
              });
                 register('1')
             }else{
              messageApi.open({
                type: 'error',
                content: '失败,请认真检查',
              });
             }
        };
        
      return (
      <>
      
        {contextHolder}
        <Form
          labelCol={{ span: 8 }}
          initialValues={{ remember: true }}
          layout="horizontal"
         style={{ maxWidth: 800 }}
         onFinish={onFinish}
        >
          
          <Form.Item label="商铺类型" name="type"
           rules={[
            {
              required: true,
              message: '请选择商铺类型',
            },
           
          ]}>
            <Radio.Group>
              <Radio value="0"> 充电桩</Radio>
              <Radio value="1"> 其他 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="店铺名"
           name="shopName"
          rules={[
            
            {
                min:4,
                message: '店铺名不少于4个字符',
            },
            {
              validator:(_,value)=>{               //自定义验证商铺是否存在validator规则
                   if(value){
                  return telApi(value).then(res=>{
                            // console.log(res);
                          if(!res.data.boo){
                            return Promise.reject('该商铺已经存在');
                          }  
                    })
                   }else{
                    return Promise.reject('请输入店铺名');
                   }
              }
            }
          ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="手机号"
            name='tel'
            rules={[
               {
                    pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                    message: '请输入正确的手机号',
                },
                {
                  validator:(_,value)=>{               //自定义验证手机号是否存在validator规则
                       if(value){
                      return  shopNameApi(value).then(res=>{
                                console.log(res);
                              if(!res.data.boo){
                                return Promise.reject('该手机号已经存在');
                              }  
                        })
                       }else{
                        return Promise.reject('请输入手机号');
                       }
                  }
                }
              ]}
           >
            {/* 失去焦点时触发onBlur */}
            <Input />   
          </Form.Item>
          <Form.Item label="店铺地址"
           name='address'
           rules={[
            {
              required: true,
              message: '请输入地址',
            },
           
          ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="注册人"
           name='managerName'
           rules={[
            {
              required: true,
              message: '请输入地址',
            },
           
          ]}
           >
            <Input />
          </Form.Item>
          <Form.Item label="身份证号码"
           name='idCard'
           rules={[
            {
              required: true,
              message: '请输入身份证号码',
            },
            {
                pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                message: '请输入正确的身份证号',
            },
          ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="身份证照片"  valuePropName="fileList"
          rules={[
              {
                required: true,
                message: '请上传照片',
              },
             
            ]}
          >
            <Upload action="http://47.98.128.191:3000/images/uploadImages" listType="picture-card"
               onChange={handleChange}    //  上传中、完成、失败都会调用这个函数。
              >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="营业执照编号"
          name='licenceNo'
          rules={[
            {
              required: true,
              message: '请输入编号',
            },
           
          ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="营业执照照片" valuePropName="fileList"
            rules={[
                {
                  required: true,
                  message: '请上传照片',
                },
               
              ]}
          >
            <Upload action="http://47.98.128.191:3000/images/uploadImages" listType="picture-card"
                onChange={handleChange1}    //  上传中、完成、失败都会调用这个函数。
               >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
     <Form.Item >
        <div id='e1'>
        <Button type="primary" htmlType="submit" style={{marginLeft:80}}>
          立即申请
        </Button>
        <Button type="link" id='btn1' onClick={()=>register('1')}>已有账户去登录</Button> 
        </div>
      </Form.Item>
        </Form>
      </>
    );
}

export default ShopPage