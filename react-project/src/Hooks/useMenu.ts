// 自定义hook，js文件中如果，使用自定义hook就可以使用其他的hook,用来做状态机的方法和数据的调用
import React,{useEffect} from 'react'
//引入useSelector的方法用于组件获取状态机的数据,引入useDispatch的hook
import { useSelector ,useDispatch} from 'react-redux'
import {MenuPermission} from '../store/modules/Menus/actions'  //引入状态机的公共方法
export const useMenu=()=>{
    const dispatch =useDispatch()
    // 接受状态机的数据
    const menuData =useSelector((state:any)=>{
       return  state
     })
    useEffect(() => {          
        dispatch(MenuPermission()as any);  //调用方法 as any进行类型的约束
    }, [])
    return menuData as any    //定义类型
    
}