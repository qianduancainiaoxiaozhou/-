import React,{useState} from 'react'
import {Routes,Route,Navigate,useLocation} from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import IndexPage from '../pages/IndexPage/IndexPage'
import HomePage from '../pages/IndexPage/HomePage/HomePage'
import Applycharge from '../pages/IndexPage/Applycharge/Applycharge'
import DictPage from '../pages/IndexPage/DictPage/DictPage'
import Genad from '../pages/IndexPage/Genad/Genad'
import Genapply from '../pages/IndexPage/Genapply/Genapply'
import Genchargejudgement from '../pages/IndexPage/Genchargejudgement/Genchargejudgement'
import Gencomplain from '../pages/IndexPage/Gencomplain/Gencomplain'
import Gencoupon from '../pages/IndexPage/Gencoupon/Gencoupon'
import Gengoods from '../pages/IndexPage/Gengoodsjudgement/Gengoods'
import Gengoodsrecommend from '../pages/IndexPage/Gengoodsrecommend/Gengoodsrecommend'
import Gengod from '../pages/IndexPage/Gengoods/Gengod'
import Gengoodstype from '../pages/IndexPage/Gengoodstype/Gengoodstype'
import Genmessage from '../pages/IndexPage/Genmessage/Genmessage'
import Genservicejudgement from '../pages/IndexPage/Genservicejudgement/Genservicejudgement'
import Genshop from '../pages/IndexPage/Genshop/Genshop'
import HttptracePage from '../pages/IndexPage/HttptracePage/HttptracePage'
import InfoPage from '../pages/IndexPage/InfoPage/InfoPage'
import Job from '../pages/IndexPage/JobPage/Job'
import Jvminfo from '../pages/IndexPage/JvminfoPage/Jvminfo'
import Log from '../pages/IndexPage/LogPage/Log'
import MenuPage1 from '../pages/IndexPage/MenuPage/MenuPage1'
import OnlinePage from '../pages/IndexPage/OnlinePage/OnlinePage'
import OrderChargen from '../pages/IndexPage/OrderChargeOrder/OrderChargen'
import OrderGoodsOrder from '../pages/IndexPage/OrderGoodsOrder/OrderGoodsOrder'
import OrderServiceOrder from '../pages/IndexPage/OrderServiceOrder/OrderServiceOrder'
import Orderdata from '../pages/IndexPage/Orderdata/Orderdata'
import Ordertest from '../pages/IndexPage/Ordertest/Ordertest'
import Othersexcel from '../pages/IndexPage/Othersexcel/Othersexcel'
import Profile from '../pages/IndexPage/Profile/Profile'
import RolePage from '../pages/IndexPage/RolePage/RolePage'
import Servecategory from '../pages/IndexPage/Servecategory/Servecategory'
import Servecommission from '../pages/IndexPage/Servecommission/Servecommission'
import ServeshopCategory from '../pages/IndexPage/ServeshopCategory/ServeshopCategory'
import Servestatistics from '../pages/IndexPage/Servestatistics/Servestatistics'
import SystemInfo from '../pages/IndexPage/SystemInfoPage/SystemInfo'
import SystemlogPage from '../pages/IndexPage/SystemlogPage/SystemlogPage'

import Tomc from '../pages/IndexPage/TomcatinfoPage/Tomc'
import UserPage from '../pages/IndexPage/UserPage/UserPage'
import WebdailyArticle from '../pages/IndexPage/WebdailyArticle/WebdailyArticle'

import Webmoviecoming from '../pages/IndexPage/Webmoviecoming/Webmoviecoming'
import Webmoviehot from '../pages/IndexPage/Webmoviehot/Webmoviehot'
import Webweather from '../pages/IndexPage/Webweather/Webweather'
import { HomeOutlined , AppstoreOutlined, DashboardOutlined ,ClockCircleOutlined,
  BorderOuterOutlined,BarChartOutlined,AppleOutlined,GooglePlusOutlined,CodepenCircleOutlined,
  DribbbleSquareOutlined,YuqueOutlined,DollarOutlined,TeamOutlined} from '@ant-design/icons';
const AddRouter = () => {
  const{pathname}=useLocation()   //获取url的路由路径
  const items=JSON.parse(localStorage.MENU||'[]')
  const menus=[
    {path: "/home", name: "系统主页", component: <HomePage/>, icon: <HomeOutlined/>},
    {path: "/system", name: "系统管理", component: "PageView", icon: <AppstoreOutlined/>,
    children:[
        {path: "/system/user", name: "用户管理", component: <UserPage/>},
        {path: "/system/role", name: "角色管理", component: <RolePage/>},
        {path: "/system/menu", name: "菜单管理", component: <MenuPage1/>},
        {path: "/system/dict", name: "字典管理", component: <DictPage/>}
    ] },
    {path: "/monitor", name: "系统监控", component: "PageView", icon: <DashboardOutlined/>,
    children:[
        {path: "/monitor/online", name: "在线用户", component: <OnlinePage/>},
        {path: "/monitor/systemlog", name: "系统日志", component:  <SystemlogPage/>},
        {path: "/monitor/redis/info", name: "Redis监控", component: <InfoPage/>},
        {path: "/monitor/httptrace", name: "请求追踪", component: <HttptracePage/>},
        {path: "/monitor/system", name: "系统信息", component: "EmptyPageView",
        children:[
            {path: "/monitor/system/jvminfo", name: "JVM信息", component: <Jvminfo/>},
            {path: "/monitor/system/tomcatinfo", name: "Tomcat信息", component: <Tomc/>},
            {path: "/monitor/system/info", name: "服务器信息", component: <SystemInfo/>}
        ]},
    ]},
    {path: "/job", name: "任务调度", component: "PageView", icon: <ClockCircleOutlined />,
    children:[
        {path: "/job/job", name: "定时任务", component: <Job/>},
        {path: "/job/log", name: "调度日志", component: <Log/>}
    ]},
    {path: "/serve", name: "服务项目", component: "PageView", icon: <BorderOuterOutlined />,
    children:[
        {path: "/serve/category", name: "类别管理", component: <Servecategory/> },
        {path: "/serve/shopCategory", name: "商户项目", component: <ServeshopCategory/>},
        {path: "/serve/statistics", name: "数据统计", component: <Servestatistics/>},
        {path: "/serve/commission", name: "抽成管理", component: <Servecommission/>}
    ]},
    {path: "/shop", name: "商铺管理", component: "PageView", icon: <BarChartOutlined />,
    children:[
        {path: "/gen/apply", name: "商铺审核", component: <Genapply/>},
        {path: "/gen/complain", name: "投诉管理", component: <Gencomplain/>},
        {path: "/gen/shop", name: "门店管理", component: <Genshop/>},
        {path: "/gen/apply/charge", name: "电站审核", component: <Applycharge/>}
    ]},
    {path: "/gen", name: "商品管理", component: "PageView", icon: <AppleOutlined />,
    children:[
        {path: "/gen/goodstype", name: "商品类型管理", component: <Gengoodstype/>},
        {path: "/gen/goods", name: "商品管理", component: <Gengod/>},

    ]},
    {path: "/judgement", name: "评价管理", component: "PageView", icon: <GooglePlusOutlined />,
    children:[
        {path: "/gen/chargejudgement", name: "充电桩评价管理",component:<Genchargejudgement/>},
        {path: "/gen/servicejudgement", name: "服务评价管理",component:<Genservicejudgement/>},
        {path: "/gen/goodsjudgement", name: "商品评价管理", component: <Gengoods/> },

    ]},
    {path: "/order", name: "订单管理", component: "PageView", icon: <CodepenCircleOutlined />,
    children:[
        {path: "/order/ChargeOrder", name: "电桩订单", component: <OrderChargen/>},
        {path: "/order/ServiceOrder", name: "服务订单", component: <OrderServiceOrder/>},
        {path: "/order/GoodsOrder", name: "商品订单", component: <OrderGoodsOrder/> },
        {path: "/order/test", name: "服务订单数据", component: <Ordertest/>},
        {path: "/order/data", name: "数据统计", component: <Orderdata/>}
    ]},
    {path: "/coupon", name: "优惠券管理", component: "PageView", icon: <DribbbleSquareOutlined />,
    children:[
        {path: "/gen/coupon", name: "优惠券管理", component: <Gencoupon/>},

    ]},
    {path: "/gen/message", name: "消息管理", component: <Genmessage/>, icon: <YuqueOutlined />},
    {path: "/marketingmanagement", name: "营销管理", component: "PageView", icon: <DollarOutlined />,
    children:[
        {path: "/gen/ad", name: "广告管理", component: <Genad/>},
        {path: "/gen/goodsrecommend", name: "商品推荐",component:<Gengoodsrecommend/>}
    ]},
    {path: "/web", name: "网络资源", component: "PageView", icon: <DribbbleSquareOutlined />,
    children:[
        {path: "/web/weather", name: "天气查询", component: <Webweather/>, icon: ""},
        {path: "/web/dailyArticle", name: "每日一文", component: <WebdailyArticle/>, icon: ""},
         {path: "/web/movie", name: "影视资讯", component: "EmptyPageView",  children: [
            {path: "/web/movie/hot", name: "正在热映", component: <Webmoviehot/>, icon: ""},
            {path: "/web/movie/coming", name: "即将上映", component: <Webmoviecoming/>, icon: ""}
         ]}
    ]},
    {path: "/others", name: "其他模块", component: "PageView", icon: <GooglePlusOutlined />,
    children:[
        {path: "/others/excel", name: "导入导出", component: <Othersexcel/>}
    ]},
    {path: "/profile", name: "个人中心", component: <Profile/>, icon: <TeamOutlined />}
   ]
 const [items5,setitems5]=useState([])
   const items2=menus.filter((item:any)=>{
    return items.find((obj:any)=>item.path==obj.path)   //找到数组中满足条件的对象，并返回
 })
  // console.log(items2);
  return (
    <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
        {/* 路由重定向 */}
        <Route path='/' element={<Navigate to='/login'/>}></Route>
        <Route path='' element={<IndexPage/>}>
          {
            items2.map(item=>{
              return <Route path={item.path} element={item.component} key={item.path}></Route>
            })
          }
          {
            items2.map(item=>{
                if(item.children){
                 return  item.children.map(item1=>{
                    return <Route path={item1.path} element={item1.component} key={item1.path}></Route>
                   })
                }
            })
          }
          {
            items2.map(item=>{
              if(item.children){
               return  item.children.map(item1=>{
                      if(item1.children){
                       return  item1.children.map(item2=>{
                          return <Route path={item2.path} element={item2.component} key={item2.path}></Route>    
                         })
                      }
                 })
              }
          })
          }
          {/* <Route path='/home' element={<HomePage/>}></Route> */}
        </Route>
    </Routes>
  )
}

export default AddRouter