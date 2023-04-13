// 验证用户
import request from "../../utils/request"
export const checkApi=(data:any)=>{
    return request.get('/user/check/'+data)  //http://xawn.f3322.net:8012/user/check/${username}这种形式的传参
}