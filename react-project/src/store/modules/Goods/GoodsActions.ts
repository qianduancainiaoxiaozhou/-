import { goodsApi } from "../../../api/goodsApi/goodsApi";
export const goods=(data:any)=>{
    return async(dispatch:any)=>{
          const res= await goodsApi(data)
          //console.log(res);
          dispatch({type:'SET_GOODS',payload:res.data})
    }
}