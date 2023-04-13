// 商品类型管理
import request  from "../../utils/request";
export const GetAllGoodsType=()=>{           //获取所有商品类型的接口
       return request.get('/gen/goodstype')
}

export const DeleteGoodsType=(id:any)=>{           //获取所有商品类型的接口
       return request.delete('/gen/servicetype/'+id)
}