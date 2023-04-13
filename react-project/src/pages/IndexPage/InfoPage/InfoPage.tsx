import React,{useEffect,useState} from 'react'
import ReactEcharts from 'echarts-for-react'
import { RedisInfoApi,memoryInfoApi ,keysSizeInfoApi} from '../../../api/RedisInfoApi/RedisInfoApi';
const InfoPage = () => {
  let timer=''                                      //初始化定时器
  const [memoryData,setMemoryData]=useState(null) as any      //定义内存实时占用的初始状态的数据x轴的时间
  const [memoryData1,setMemoryData1]=useState([]) as any     
  const[memoryDataY,setMemoryDataY]=useState(null) as any    //定义内存实时占用的初始状态的数据y轴
  const [memoryData2,setMemoryData2]=useState([]) as any 
  const [keysData,setKeysData]=useState(null)                 //定义keys的数据y轴
  const [keysData1,setKeysData1]=useState([])     
  useEffect(()=>{                                        //调方法
     getRedisInfo()                                 
     getMemory()
     return ()=>{                                          //useEffect里面返回一个函数，表示组件卸载前
      clearInterval(timer as any)                         // 清除定时器
  }
  
  },[])
  useEffect(()=>{                                     //监听memoryData的变化并且执行                                                   
    memoryData ?setMemoryData1([...memoryData1,memoryData]):null;    //memoryData为null就不进入
    memoryDataY?setMemoryData2([...memoryData2,memoryDataY]):null;
    keysData?setKeysData1([...keysData1,keysData]):null             //在数组后面加keys的值                
  },[memoryData,memoryDataY])
 

  const getRedisInfo=async()=>{                   //获取redis监控详细信息
        const res =await RedisInfoApi()
        console.log(res);
    }
 const getMemory=async()=>{                  //获取redis内存实时占用情况
    timer= setInterval(async()=>{
         const res =await  memoryInfoApi()         //使用间隔定时器，每隔3秒发一次请求
          //console.log(res);
          const res1=await keysSizeInfoApi()       // keys的数据
          console.log(res1);
          setKeysData(res1.data.dbSize)
          let NowTime=new Date(res.data.create_time) 
         let time1=NowTime.getHours()+':'+NowTime.getMinutes()+':'+NowTime.getSeconds()
         //console.log(time1);
         setMemoryData(time1)
         setMemoryDataY(Number(res.data.used_memory)/1000)      //修改横坐标的值
                     
       },3000) as any                                //as any 表示任何类型使用
  }   
  //console.log(memoryData2);
 if(memoryData1.length>5){                          //当数组大于5删除第一个
  memoryData1.shift()     
 }
 if(memoryData2.length>5){                          //当数组大于5删除第一个
  memoryData2.shift()     
 }
 if(keysData1.length>5){                          //当数组大于5删除第一个
  keysData1.shift()     
 }
const   option = {
  title: {                                          //头部的标题
    text: 'Redis内存实时占用情况(kb)'
  },
    xAxis: {
      type: 'category',
      // boundaryGap: false,
      
      data: memoryData1 ,                                 //是一个数组的形式
     
    },
    yAxis: {
      min:267791.90,                                  //设置y抽刻度的最小值
      max:267915.61,                                 
      splitNumber: 6,                                  //设置刻度的段落
     // type: 'value'
    },
    series: [
      {
        data: memoryData2,
        type: 'line',    //折线
        smooth:true,    //是否平滑显示
        symbolSize:0,   //标记点的大小，也可以用数组，例如[10,20]表示宽10，高20.
        
        areaStyle: {          //区域里面的样式填充
          color: '#58B6EF',     //设置颜色和透明度
           opacity: 0.25        //设置透明度
        },   
        
      }
    ]
  };
  const   option1 = {
    title: {                                          //头部的标题
      text: 'Redis key 实时数量(个)'
    },
      xAxis: {
        type: 'category',
        // boundaryGap: false,
        
        data: memoryData1 ,                                 //是一个数组的形式
       
      },
      yAxis: {
        min:43860,                                  //设置y抽刻度的最小值
        max:43867,                                 
        splitNumber: 6,
       // type: 'value'
      },
      series: [
        {
          data: keysData1,
          type: 'line',    //折线
          smooth:true,    //是否平滑显示
          symbolSize:0,   //标记点的大小，也可以用数组，例如[10,20]表示宽10，高20.
          
          areaStyle: {          //区域里面的样式填充
            color: 'red',     //设置颜色和透明度
             opacity: 0.25        //设置透明度
          },   
          lineStyle:{          //设置折线的颜色
             color:'red'
          }
        }
      ]
    };
  return (
    <div style={{display:'flex'}}>
       <ReactEcharts option={option} style={{width:450}}></ReactEcharts>
       <ReactEcharts option={option1} style={{width:450,marginLeft:30}}></ReactEcharts>
    </div>
  )
}

export default InfoPage