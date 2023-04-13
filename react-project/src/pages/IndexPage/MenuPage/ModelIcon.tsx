import React, { PureComponent } from 'react';
import { Modal,Tabs,message} from 'antd';
import {  createFromIconfontCN } from '@ant-design/icons';
import'./index.less'
import * as icons from '@ant-design/icons';    //引入所有的icons图标
const directionIcons = ['icon-step-backward','icon-fangxiang-you','icon-paixu','icon-xiangshang','icon-kaishi']
const suggestionIcons = ['icon-zhishi-xiangshang','icon-zhishi-xiangyou','icon-zhishi-yuanxing-xiangxia','icon-zhishi-yuanxing-xiangzuo','icon-zhishi-yuanxing-xiangyou']
const editIcons = ['icon-bianji','icon-bianji1','icon-poweroff','icon-clock','icon-hebingdanyuan']
const dataIcons = ['icon-shujutongji','icon-shujukanban','icon-zhexiantu','icon-shuju','icon-shuju1']
const webIcons = ['icon-tubiao06','icon-tubiao204','icon-tubiao214','icon-tongyong1','icon-tongyong','icon-tongyongleiyonghunv','icon-tongyongleiyonghunan','icon-tongyongshebei','icon-xwtubiaoku-01','icon-xwtubiaoku-02']
const logoIcons = ['icon-pinpaibiaoshi_QQyinle','icon-pinpaibiaoshi_anzhuo','icon-pinpaibiaoshi_dingding','icon-pinpaibiaoshi_pingguo','icon-pinpaibiaoshi_QQkongjian','icon-pinpaibiaoshi_weixin']



const ModelIcon = (props:any) => {
  const [messageApi, contextHolder] = message.useMessage();
    const {closeModal,getIcon} = props;
    const handleCancel=()=>{
      closeModal()             //调用父组件的方法进行关闭
    }
    console.log(icons);
    
    const closeItem=(options:any)=>{         //选中图标的函数
      messageApi.open({
        type: 'success',
        content: `选中${options}`,
       });
       getIcon(options)
    }
    const handleOk=(options:any)=>{            //模态框确定的回调
         closeModal() 
    }
      const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/c/font_3992652_fodq62xuwaf.js',   //自己icon图库的连接地址，就是自己阿里图标的购物车里面
      });
       const res1= directionIcons.map((item)=>{      //返回的一个新数组
            return (
               <div className='box' key={item} onClick={()=>closeItem(item)}>
                 <IconFont type={item} key={item} className='icon'/>
               </div>
            )
        })
        const res2=  suggestionIcons.map((item)=>{      //返回的一个新数组
            return (
                <div className='box' key={item} onClick={()=>closeItem(item)}>
                 <IconFont type={item} key={item} className='icon'/>
               </div>
            )
        })
        const res3=  editIcons.map((item)=>{      //返回的一个新数组
          return (
              <div className='box' key={item} onClick={()=>closeItem(item)}>
               <IconFont type={item} key={item} className='icon'/>
             </div>
          )
      })
      const res4= dataIcons.map((item)=>{      //返回的一个新数组
        return (
            <div className='box' key={item} onClick={()=>closeItem(item)}>
             <IconFont type={item} key={item} className='icon'/>
           </div>
        )
    })
    const res5= webIcons.map((item)=>{      //返回的一个新数组
      return (
          <div className='box' key={item} onClick={()=>closeItem(item)}>
           <IconFont type={item} key={item} className='icon'/>
         </div>
      )
  })
  const res6= logoIcons.map((item)=>{      //返回的一个新数组
    return (
        <div className='box' key={item} onClick={()=>closeItem(item)}>
         <IconFont type={item} key={item} className='icon'/>
       </div>
    )
})
      const items = [
        {
          key: '1',
          label: `方向性图标`,
          children: res1,
        },
        {
          key: '2',
          label: `指示性图标`,
          children:  res2,
        },
        {
          key: '3',
          label: `编辑类图标`,
          children: res3,
        },
        {
          key: '4',
          label: `数据类图标`,
          children: res4,
        },
        {
          key: '5',
          label: `网站通用图标`,
          children: res5,
        },
        {
          key: '6',
          label: `品牌和标识`,
          children: res6,
        },
      ];





    return(
        <>
        {contextHolder}
            <Modal
        title="图标选择"
        //visible={visible}
        width='800px'
        onOk={handleOk}
        onCancel={handleCancel}
        open={true}
        closable={false}        //不显示模态框右上角的关闭按钮
    >
     <Tabs defaultActiveKey="1" items={items} />;
    </Modal>        
        </>
    )

}

export default ModelIcon