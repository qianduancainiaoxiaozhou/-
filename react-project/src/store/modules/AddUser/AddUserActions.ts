import { addUserApi } from "../../../api/addUserApi/addUserApi";
export const addUser1=(data:any)=>{
     return async(dispatch:any)=>{
         const res= await addUserApi(data)
         console.log(res);
         dispatch({type:'SET_ADDSUER',payload:res})
         
     }
}