//关于角色的网络Api
import request from "../../utils/request";
export const role=()=>{            //获取所有角色数据
    return request.get('/role')
}

export const roleMenu=()=>{            //获取所有角色菜单数据
    return request.get('/menu')
}
 
export const roleMenuId=(id:any)=>{            //获取个人角色菜单数据
    return request.get('/role/menu/'+id)
}


export const addRole=(data:any)=>{            //新增角色
    return request.post('/role',data)
}

export const modifyRole=(data:any)=>{            //新增角色
    return request.put('/role',data)
}

export const deleteRole=(id:any)=>{            //删除角色
    return request.delete('/role/'+id)
}