import React from 'react'
import ReactEcharts from 'echarts-for-react'  //引入echarts
import { useEcharts } from '../../../Hooks/useEcharts'

const HomeEcharts = () => {
  const echartsData=useEcharts()   //获取状态机数据
  // console.log(echartsData);
  const PersonalData:any=[]    //push一个您的一个访问数据
  const total:any=[]           //总数
  const days:any=[]
  if(echartsData){
    echartsData.lastSevenUserVisitCount.forEach((item:any)=>{
      PersonalData.push(item.count)
      days.push(item.days)
    })
    echartsData.lastSevenVisitCount.forEach((item:any)=>{
        total.push(item.count)
    })
  }
  const option = {
    title: {
      text: '近七日系统访问记录'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    
    xAxis: {
      type: 'category',
      data: days,
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: {
      type: 'value',
        name: '次数',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} '
        }
    },
    series: [
      {
        name: '您',
        type: 'bar',
        data: PersonalData 
      },
      {
        name: '总数',
        type: 'bar',
        data: total
      }
    ]
  };
   
  return (
    <div style={{width:500,marginTop:20}}>
      {/* 封装好了 ReactEcharts组件，直接加option属性直接使用*/}
      <ReactEcharts option={option}></ReactEcharts>
    </div>
  )
}

export default HomeEcharts