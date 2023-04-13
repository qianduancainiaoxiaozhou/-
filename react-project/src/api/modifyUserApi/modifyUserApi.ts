import request from "../../utils/request";
export const modifyUserApi=(data:any)=>{
     return request.put('/user',data)
}