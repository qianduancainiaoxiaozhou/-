//配置公共的网络请求的方法
import { MenuPermissionApi } from "../../../api/menusApi/menuApi";
//状态机的公共网络的请求方法
export const MenuPermission=()=>{
    return async (dispatch:any) => {
        const username=localStorage.USER_NAME
        const res = await MenuPermissionApi(username);
        // console.log(res.data[0].children);
       // 将请求回来的数据，传递给仓库的 reducer ,type后面是方法，payload后面是需要传递的数据
            // dispatch({ type: 'SET_ROLES', payload: res.data });
            dispatch(setMenuAsync(res.data))
            localStorage.MENU=JSON.stringify(res.data[0].children)
    }
}

// 封装dispatch里面的对象参数
export const setMenuAsync=(payload:any)=>{
    return { type: 'SET_MENU', payload }
}