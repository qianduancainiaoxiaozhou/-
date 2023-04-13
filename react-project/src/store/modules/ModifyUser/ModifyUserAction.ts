import { modifyUserApi } from "../../../api/modifyUserApi/modifyUserApi";

export const modifyUser=(data:any)=>{
     return async(dispatch:any)=>{
          const res= await modifyUserApi(data)
          // console.log(res);
          dispatch({type:'SET_MODIFY',payload:res})
     }
}