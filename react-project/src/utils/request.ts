import axios from "axios";
// 封装基础路径和请求超时

const request=axios.create({
    baseURL:'http://xawn.f3322.net:8012',
    timeout:5000
})
// 配置请求拦截器 统一给项目中所有请求的header中添加token
request.interceptors.request.use((config)=>{
    //   将token添加到请求头中，其中Authorization是后端定义的参数
   // console.log(config);
    config.headers.Authentication=localStorage.USER_token;
    config.headers['Content-Type']='application/x-www-form-urlencoded'
    
    return config;
    }) 

    // 配置响应拦截器
request.interceptors.response.use((res:any)=>{
    //console.log(res);
    if(res.status==200){
        return res
    }
    // return Promise.reject('1')  //返回一个失败的结果
},err=>{
   // console.log('失败',err.response);   //失败的回调
    return err
})

export default request