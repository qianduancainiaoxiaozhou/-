import { roleMenu } from "../../../api/roleApi/roleApi";
export const RoleMenu=()=>{
    return async(dispatch:any)=>{
         const res=await roleMenu()
        //  console.log(res);
         dispatch({type:'SET_ROLEMENU',payload:res.data})
    }
}