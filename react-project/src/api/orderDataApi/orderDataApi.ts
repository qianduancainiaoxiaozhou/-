// 订单数据的统计
import request from "../../utils/request";
export const goodsorderApi=()=>request.get('/gen/goodsorder/orderdata?')  //商品订单
export const serviceorderApi=()=>request.get('/gen/serviceorder/orderdata?')  //服务订单
export const chargeorderApi=()=>request.get('/gen/chargeorder/orderdata?')  //电桩订单
