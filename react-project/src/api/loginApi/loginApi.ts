import request from "../../utils/request";
// 登录的请求Api

export  const loginApi=(data:any)=>{
   
  return request.post('/login',data)
}

