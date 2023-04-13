import React from 'react'
import {  Drawer ,Divider,Popconfirm,Form,Button} from 'antd';
import PublicTree from './PublicTree';
const PublicDrawer = (props:any) => {
 const {Name ,children,FormItem1,modifyData,FormItem2,closeModify}=props        //props自带children的属性，实现插槽的显示
    const onFinish=(values:any)=>{
         console.log(values);
         
    }
    const confirm = () => {                //气泡确认框，点击确认的回调
        closeModify()              //调用父组件的方法，关闭抽屉
      };

  return (
    <div id='drow'>
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
            {FormItem1}
            {FormItem2}
            {children}
          <Divider></Divider>
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
  )
}

export default PublicDrawer