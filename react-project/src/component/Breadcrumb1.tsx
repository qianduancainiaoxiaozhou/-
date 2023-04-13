import React from 'react'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
const BreadcrumbMenus=[
  {path:'/system/user',breadcrumb:[{title:'主页'},{title:'系统管理'},{title:'用户管理'}]}
]
const Breadcrumb1 = () => {
  const {pathname}=useLocation()
  // console.log(pathname);
  const newData=BreadcrumbMenus.filter(item=>item.path==pathname)
  const Breadcrumb2=newData[0].breadcrumb
  // console.log(Breadcrumb2);
  
   return (
            <div style={{marginBottom:20}}>
              <Breadcrumb items={Breadcrumb2}  />
            </div>
          )
}   

export default Breadcrumb1