//获取所有菜单数据
import { MenuAllApi } from "../../../api/menusApi/menuApi";
export const AllMenu=()=>{
     return async(dispatch:any)=>{
         const res= await MenuAllApi()
         //console.log(res);
         dispatch({type:'SET_ALLMENU',payload:res.data})
     }
}