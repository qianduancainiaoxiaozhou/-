import { GetAllGoodsType } from "../../../api/goodsTypeApi/goodsTypeApi";
export const allGoodsType=()=>{
      return async(dispatch:any)=>{
         const res= await GetAllGoodsType()
          //console.log(res);
          dispatch({type:'SET_GOODSTYPE',payload:res.data})
      }
}