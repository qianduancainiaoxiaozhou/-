import request from "../../utils/request";
export const addUser=(data:any)=>{    //获取所有用户
    return request.get('/user',{params:data})
}