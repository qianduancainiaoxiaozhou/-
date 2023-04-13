import request from "../../utils/request";
export const goodsApi=(data:any)=>request.get('/gen/goods',{params:data})
export const deletegoodsApi=(id:any)=>request.delete('/gen/goods/'+id)
export const servicetypeApi=()=>request.get('/gen/servicetype')        //服务类型数据
export const goodstypeApi=()=>request.get('/gen/goodstype')        //商品类型数据
export const putgoodsApi=(data:any)=>request.put('/gen/goods',data)        //修改商品
export const addgoodsApi=(data:any)=>request.post('/gen/goods',data)        //新增商品