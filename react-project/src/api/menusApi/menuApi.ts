import request  from "../../utils/request";
// 获取菜单Api
export const MenuPermissionApi=(data:any)=>{     // 获取菜单权限
    return request.get('/menu/'+data)
}

export const MenuAllApi=()=>{     // 获取所有菜单数据
    return request.get('/menu')
}

export const ModifyMenuApi=(data:any)=>{     // 修改菜单数据
    return request.put('/menu',data)
}

export const AddMenuApi=(data:any)=>{     // 新增菜单数据
    return request.post('/menu',data)
}

export const deleteMenuApi=(id:any)=>{     // 根据id删除菜单
    return request.post('/menu/'+id)
}
