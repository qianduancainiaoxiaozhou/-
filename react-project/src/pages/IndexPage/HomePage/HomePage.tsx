import React,{useState} from 'react'
import './HomePage.less'
import { useEcharts } from '../../../Hooks/useEcharts'
import HomeEcharts from './HomeEcharts'
const HomePage = () => {
  
  const userName=localStorage.USER_NAME
  const avatar=localStorage.USER_avatar  //取出头像
  const roles=JSON.parse(localStorage.USER_roles||'[]')  //取出用户
  const deptName=localStorage.USER_deptName   //取出部门
  const expireTime=localStorage.USER_time  //获取过期时间
  const echartsData=useEcharts()            //获取状态机的数据
// console.log(expireTime);
  const year=expireTime.slice(0,4) //年
  const mon=expireTime.slice(4,6) 
  const day1=expireTime.slice(6,8)
  const hour1=expireTime.slice(8,10)
  const minutes=expireTime.slice(10,12)
  const seconds=expireTime.slice(12,14)
  const greet=()=>{
      if(Number(hour1)>7&&Number(hour1)<=12){
         return '上午好,又是一个愉快的上午'
      }else if(Number(hour1)>12&&Number(hour1)<=18){
         return '下午好，今天帮别人解决问题了吗？'
      }
      return '晚上好，早点休息哦'
  }
  const greet1=greet()
  
  return (
    <div id='homePage'>
     <div className='heard'>
        <div className='heard-left'>
          <img src={"http://xawn.f3322.net:8002/distremote/static/avatar/"+avatar}  />
          <div>
          <p className='p1'>{greet1},{userName}</p>
          <p className='p2'><span style={{marginRight:5}}>{deptName}</span>|<span style={{marginLeft:5,marginRight:5}}>{roles[1]}</span><span>{roles[0]}</span></p>
          <p className='p2'><span style={{marginRight:5}}>上次登录时间：{year}-{mon}-{day1}</span><span>{hour1-1}:{minutes}:{seconds}</span></p>
          </div>
        </div>
        <div className='heard-right'>
            <div>
              <p>今日IP</p>
              {/* 有值的时候进行渲染 */}
              <a>{echartsData?echartsData.todayIp:''}</a>   
            </div>
            <div>
              <p>今日访问</p>
              <a>{echartsData?echartsData.todayVisitCount:''}</a>
            </div>
            <div>
              <p>总访问量</p>
              <a>{echartsData?echartsData.totalVisitCount:''}</a>
            </div>
        </div>
     </div>
     <HomeEcharts></HomeEcharts>
    </div>
   
  )
}

export default HomePage