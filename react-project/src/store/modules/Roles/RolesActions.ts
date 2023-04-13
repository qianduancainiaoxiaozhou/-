import { role } from "../../../api/roleApi/roleApi";
export const getRole=()=>{
    return async (dispatch:any)=>{
          const res=await role()
          console.log(res);
          dispatch({type:'SET_ROLE',payload:res.data})
    }
}