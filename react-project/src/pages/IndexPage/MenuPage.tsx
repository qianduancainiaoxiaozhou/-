import React ,{useEffect,useState}from 'react'
import { Menu} from 'antd';
import { HomeOutlined , AppstoreOutlined, DashboardOutlined ,ClockCircleOutlined,
    BorderOuterOutlined,BarChartOutlined,AppleOutlined,GooglePlusOutlined,CodepenCircleOutlined,
    DribbbleSquareOutlined,YuqueOutlined,DollarOutlined,TeamOutlined} from '@ant-design/icons';
import { useLocation ,Link} from 'react-router-dom';
const MenuPage = () => {
     const {pathname}=useLocation()    //获取路由路径
    //  console.log(pathname.split('/')[1]);
     
      const items=JSON.parse(localStorage.MENU)
    //   console.log(items);
      
      const menus=[
        {path: "/home", name: "系统主页", component: "HomePageView", icon: <HomeOutlined/>},
        {path: "/system", name: "系统管理", component: "PageView", icon: <AppstoreOutlined/>,
        children:[
            {path: "/system/user", name: "用户管理", component: "system/user/User"},
            {path: "/system/role", name: "角色管理", component: "system/role/Role"},
            {path: "/system/menu", name: "菜单管理", component: "system/menu/Menu"},
            {path: "/system/dict", name: "字典管理", component: "system/dict/Dict"}
        ] },
        {path: "/monitor", name: "系统监控", component: "PageView", icon: <DashboardOutlined/>,
        children:[
            {path: "/monitor/online", name: "在线用户", component: "monitor/Online"},
            {path: "/monitor/systemlog", name: "系统日志", component: "monitor/SystemLog"},
            {path: "/monitor/redis/info", name: "Redis监控", component: "monitor/RedisInfo"},
            {path: "/monitor/httptrace", name: "请求追踪", component: "monitor/Httptrace"},
            {path: "/monitor/system", name: "系统信息", component: "EmptyPageView",
            children:[
                {path: "/monitor/system/jvminfo", name: "JVM信息", component: "monitor/JvmInfo"},
                {path: "/monitor/system/tomcatinfo", name: "Tomcat信息", component: "monitor/TomcatInfo"},
                {path: "/monitor/system/info", name: "服务器信息", component: "monitor/SystemInfo"}
            ]},
        ]},
        {path: "/job", name: "任务调度", component: "PageView", icon: <ClockCircleOutlined />,
        children:[
            {path: "/job/job", name: "定时任务", component: "quartz/job/Job"},
            {path: "/job/log", name: "调度日志", component: "quartz/log/JobLog"}
        ]},
        {path: "/serve", name: "服务项目", component: "PageView", icon: <BorderOuterOutlined />,
        children:[
            {path: "/serve/category", name: "类别管理", component: "serve/category/Servicetype"},
            {path: "/serve/shopCategory", name: "商户项目", component: "serve/shopCategory/ShopCategory"},
            {path: "/serve/statistics", name: "数据统计", component: "serve/statistics/Statistics"},
            {path: "/serve/commission", name: "抽成管理", component: "serve/commission/Commission"}
        ]},
        {path: "/shop", name: "商铺管理", component: "PageView", icon: <BarChartOutlined />,
        children:[
            {path: "/gen/apply", name: "商铺审核", component: "gen/shopapply/ShopApply"},
            {path: "/gen/complain", name: "投诉管理", component: "system/complain/Complain"},
            {path: "/gen/shop", name: "门店管理", component: "gen/shopmanage/ShopManage"},
            {path: "/gen/apply/charge", name: "电站审核", component: "gen/shopapply/ChargeApply"}
        ]},
        {path: "/gen", name: "商品管理", component: "PageView", icon: <AppleOutlined />,
        children:[
            {path: "/gen/goodstype", name: "商品类型管理", component: "goodstype/Goodstype"},
            {path: "/gen/goods", name: "商品管理", component: "goodstype/Goods"},

        ]},
        {path: "/judgement", name: "评价管理", component: "PageView", icon: <GooglePlusOutlined />,
        children:[
            {path: "/gen/chargejudgement", name: "充电桩评价管理"},
            {path: "/gen/servicejudgement", name: "服务评价管理"},
            {path: "/gen/goodsjudgement", name: "商品评价管理", component: "gen/judgement/goodsjudgement/Goodsjudgement"},

        ]},
        {path: "/order", name: "订单管理", component: "PageView", icon: <CodepenCircleOutlined />,
        children:[
            {path: "/order/ChargeOrder", name: "电桩订单", component: "system/order/ChargeOrder"},
            {path: "/order/ServiceOrder", name: "服务订单", component: "system/order/ServiceOrder"},
            {path: "/order/GoodsOrder", name: "商品订单", component: "system/order/GoodsOrder"},
            {path: "/order/test", name: "服务订单数据", component: "system/order/test"},
            {path: "/order/data", name: "数据统计", component: "system/order/data"}
        ]},
        {path: "/coupon", name: "优惠券管理", component: "PageView", icon: <DribbbleSquareOutlined />,
        children:[
            {path: "/gen/coupon", name: "优惠券管理", component: "coupon/Coupon"},

        ]},
        {path: "/gen/message", name: "消息管理", component: "gen/message/Message", icon: <YuqueOutlined />},
        {path: "/marketingmanagement", name: "营销管理", component: "PageView", icon: <DollarOutlined />,
        children:[
            {path: "/gen/ad", name: "广告管理", component: "gen/marketingmanagement/admanagement/Ad"},
            {path: "/gen/goodsrecommend", name: "商品推荐"}
        ]},
        {path: "/web", name: "网络资源", component: "PageView", icon: <DribbbleSquareOutlined />,
        children:[
            {path: "/web/weather", name: "天气查询", component: "web/Weather", icon: ""},
            {path: "/web/dailyArticle", name: "每日一文", component: "web/DailyArticle", icon: ""},
             {path: "/web/movie", name: "影视资讯", component: "EmptyPageView",  children: [
                {path: "/web/movie/hot", name: "正在热映", component: "web/MovieHot", icon: ""},
                {path: "/web/movie/coming", name: "即将上映", component: "web/MovieComing", icon: ""}
             ]}
        ]},
        {path: "/others", name: "其他模块", component: "PageView", icon: <GooglePlusOutlined />,
        children:[
            {path: "/others/excel", name: "导入导出", component: "others/Excel"}
        ]},
        {path: "/profile", name: "个人中心", component: "personal/Profile", icon: <TeamOutlined />}
       ]
   const items2=menus.filter((item:any)=>{
      return items.find((obj:any)=>item.path==obj.path)   //找到数组中满足条件的对象，并返回
   })
//   console.log(items2);
   
  const items1=items2.map((item1:any)=>{
      if(item1.children){
            return{
                  key:item1.path,
                  label:item1.name,
                  icon:item1.icon,
                  children:item1.children.map((item2:any)=>{
                    if(item2.children){
                        return {
                            key:item2.path,
                            label:item2.name,
                           children:item2.children.map((item3:any)=>{
                                 return {
                                    key:item3.path,
                                    label:<Link to={item3.path}>{item3.name}</Link>
                                 }
                           })
                        }
                    }
                     return {
                        key:item2.path,
                        label:<Link to={item2.path}>{item2.name}</Link>
                     }
                  })
            }
      }
    
      
      return {
                 key:item1.path,
                  label:<Link to={item1.path}>{item1.name}</Link>,
                  icon:item1.icon,
      }
  })
 
   
  return (
    <>
     <Menu theme="dark" mode="inline"  defaultSelectedKeys={[pathname]} 
     // 设置默认打开找到父级的路径
    defaultOpenKeys={['/'+pathname.split('/')[1]]}
     items={items1} ></Menu>
    </>
  )
}

export default MenuPage