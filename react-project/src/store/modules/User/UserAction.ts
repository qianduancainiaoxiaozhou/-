import { addUser } from "../../../api/userApi/userApi";
export const AddUser=(data:any)=>{
    return async (dispatch:any)=>{
        const username=localStorage.USER_NAME
        const res = await addUser(data)
        //  console.log(res.data);
         dispatch({type:'SET_ADDUSER',payload:res.data})
         
    } 
}