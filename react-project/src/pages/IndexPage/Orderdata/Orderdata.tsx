import React,{useEffect,useState} from 'react'
import ReactEcharts from 'echarts-for-react'  //引入echarts
import { goodsorderApi,serviceorderApi,chargeorderApi } from '../../../api/orderDataApi/orderDataApi';
const Orderdata = () => {
  const [goodsorderData,setgoodsorderData]=useState([]) as any   //any转化成任意类型
  const [serviceorderData,setserviceorderData]=useState([]) as any
  const[chargeorderData,setchargeorderData]=useState([]) as any
  useEffect(()=>{
    getOrder()
  },[])
 const getOrder=async()=>{
      const res=await goodsorderApi()
      const res1=await serviceorderApi()
      const res2=await chargeorderApi()
      console.log(res,res1,res2);
      let goodsOrder=Object.values(res.data[0])                 //对象转数组的快捷方法，还可以用 for in循环
      let serviceOrder=Object.values(res1.data[0])
      let chargeorder=Object.values(res2.data[0])
      console.log(goodsOrder);
      
      setgoodsorderData(goodsOrder)
      setserviceorderData(serviceOrder)
      setchargeorderData(chargeorder)
 }

  const option = {
    title: {
      text: '商品订单'
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
      data: ['未支付','已支付','已取消','配送中','已收货','已退款'],                    //数组的形式设置横坐标
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: {
      type: 'value',
        name: '次数',
        min: 0,                //设置刻度最小值
        max: 60,               //设置刻度最大值
        splitNumber: 6,        //多少的刻度
       
        axisLabel: {
          formatter: '{value} '
        }
    },
    series: [
        {
          type: 'bar',
          data:serviceorderData
        }
    ]
  };
  const option1 = {
    title: {
      text: '服务订单'
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
      data: ['未支付','已支付','已取消','已使用'],                    //数组的形式设置横坐标
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: {
      type: 'value',
        name: '个数',
        min: 0,                //设置刻度最小值
        max: 60,               //设置刻度最大值
        splitNumber: 6,        //多少的刻度
       
        axisLabel: {
          formatter: '{value} '
        }
    },
    series: [
      {
        type: 'bar',                  //柱状类型
        data:goodsorderData
      }
    ]
  };
  const option2 = {
    title: {
      text: '电桩订单'
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
      data: ['未支付','已支付','已取消','已使用'],                    //数组的形式设置横坐标
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: {
      type: 'value',
        name: '个数',
        min: 0,                //设置刻度最小值
        max: 60,               //设置刻度最大值
        splitNumber: 6,        //多少的刻度
       
        axisLabel: {
          formatter: '{value} '
        }
    },
    series: [
      {
        type: 'bar',                  //柱状类型
        data:chargeorderData
      }
    ]
  };
  return (
    <div style={{display:'flex',marginTop:20}}>
      {/* 封装好了 ReactEcharts组件，直接加option属性直接使用*/}
      <ReactEcharts option={option} style={{width:400}}></ReactEcharts>
      <ReactEcharts option={option1} style={{width:300}}></ReactEcharts>
      <ReactEcharts option={option2} style={{width:300}}></ReactEcharts>
    </div>
  )
}

export default Orderdata