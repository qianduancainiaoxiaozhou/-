import request from "../../utils/request";
// 新增商铺
export const addShopApi=(data:any)=>{
    return request.post('/gen/apply/shop',data)
}
// 检测手机号码
export const telApi=(data:any)=>{
    return request.get('/gen/apply/shop/tel/'+data)
}
//检测店铺名是否已经注册
export const shopNameApi=(data:any)=>{
    return request.get('/gen/apply/shop/shopname/'+data)
}