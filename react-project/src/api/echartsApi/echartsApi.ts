import request from "../../utils/request";

export const echartsApi=(data:string)=>{
      return request.get('/index/'+data)
}