import request from "../../utils/request";
// 注册
export const registerApi=(data:any)=>{
    return request.post('/regist',data)
}

