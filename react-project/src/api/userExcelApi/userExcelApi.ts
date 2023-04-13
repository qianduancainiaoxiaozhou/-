import request from "../../utils/request";
export const userExcelApi=()=>{
    return request({
        url:'/user/excel',
        method:'POST',
        responseType:'blob'     //在请求中添加responseType:'blob'属性 ，使用blob对后端返回的二进制流导出成表格
    })   
}