//获取部门数据
import request from "../../utils/request";

export const deptApi=()=>{
    return request.get('/dept')
} 