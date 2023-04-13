import request from "../../utils/request";
export const deleteUserApi=(data:any)=>{
     return request.delete('/user/'+data)
}