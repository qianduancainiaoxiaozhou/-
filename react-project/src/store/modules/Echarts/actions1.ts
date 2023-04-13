//配置公共的网络请求方法
 import { echartsApi } from "../../../api/echartsApi/echartsApi";

 export const echarts=()=>{
    return async (dispatch:any)=>{
        const username=localStorage.USER_NAME
        const res = await echartsApi(username)
         // console.log(res);
         dispatch({type:'SET_ECHARTS',payload:res.data})
         
    } 
 }