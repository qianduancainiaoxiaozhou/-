import { findUserApi } from "../../../api/findUserApi/findUserApi";
export const findUser=(data:any)=>{
     return async(dispatch:any)=>{
         const res = await findUserApi(data)
         console.log(res.data);
         dispatch({type:"SET_FINDUSER",payload:res.data})
     }
}