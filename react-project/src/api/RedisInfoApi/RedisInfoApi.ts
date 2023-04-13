import request from "../../utils/request";
export const  RedisInfoApi=()=>request.get('/redis/info')  //获取redis监控详细信息
export const  memoryInfoApi=()=>request.get('/redis/memoryInfo')  //获取redis内存实时占用情况
export const keysSizeInfoApi=()=>request.get('/redis/keysSize')  //获取redis的key的实时数量