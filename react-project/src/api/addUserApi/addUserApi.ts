//新增用户
import request from "../../utils/request";
export const addUserApi=(data:any)=>{
     return request.post('/user',data)
}