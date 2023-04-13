//封装公共的网络请求
import { deptApi } from "../../../api/deptApi/deptApi";
  
export const dept=()=>{
    return async (dispatch:any)=>{
           const res= await deptApi()
        //    console.log(res.data.rows.children);
            dispatch({type:'SET_DEPT',payload:res.data.rows.children})
    }
}