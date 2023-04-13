// 仓库的入口文件
// 从redux中引入 legacy_createStore的方法
import { legacy_createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from "redux-thunk";  // 引入thunk
import { reducer } from './modules/Menus/reducer';  //引入模块文件
import { reducer1 } from './modules/Echarts/reducer1';
import { UserReducer } from './modules/User/UserReducer';
import { DeptReducer } from './modules/Dept/DeptReducer';
import { RolesReducer } from './modules/Roles/RolesReducer';
import { ModifyUser } from './modules/ModifyUser/ModifyUserReducer';
import { addUserReducer } from './modules/AddUser/AddUserReducer';
import { findUserReducer } from './modules/FindUser/FindUserReducer';
import { RoleMenuReducer } from './modules/RoleMenu/RoleMenuReducer';
import { AllMenuReducer } from './modules/AllMenu/AllMenuReducer';
import { allGoodsTypeReducer } from './modules/GoodsType/GoodsTypeReducer';
import { goodsReducer } from './modules/Goods/GoodsReducer';
const allReducers = combineReducers({              //合并reducer
    menu: reducer,     //菜单数据
    echarts:reducer1,   //表格数据
    addUser:UserReducer,   //用户数据
    dept:DeptReducer,     //部门数据
    role:RolesReducer,    //角色数据
    modifyUser:ModifyUser,  //修改用户数据
    addUser1:addUserReducer,  //新增用户
    findUser: findUserReducer,   //用户查询数据
    rolemenu:RoleMenuReducer,     //角色菜单 
    allmenu:AllMenuReducer,        //获取所有的菜单
    allGoodsType:allGoodsTypeReducer,
    goods:goodsReducer
});
// 创建仓库对象 用thunk 和applyMiddleware配置中间件
const store = legacy_createStore(allReducers,applyMiddleware(thunk))

export default store  //暴露store