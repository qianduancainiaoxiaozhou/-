import request from "../../utils/request";
export const findUserApi=(data:any)=>{
     return request.get('/user?'+data)
}