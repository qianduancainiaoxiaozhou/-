import React ,{useState,useEffect}from 'react'
import {  Tree} from 'antd';
import type { DataNode } from 'antd/es/tree';
import { useSelector,useDispatch } from 'react-redux';
import { RoleMenu } from '../store/modules/RoleMenu/RoleMenuAction';
const PublicTree = () => {
    const dispatch =useDispatch()
    const [expandedKeys, setExpandedKeys] = useState([]);      //展开所有的初始状态
    const [checkedKeys, setCheckedKeys] = useState([]);       //设置树形结构选中的初始状态
    const [selectedKeys, setSelectedKeys] = useState([]);       //设置树形结构的初始状态
    const [autoExpandParent, setAutoExpandParent] = useState(true);  //设置树形结构的初始状态
    const[checkStrictly,setcheckStrictly]=useState(true)             //设置树节点父子是否关联的初始值
 
    useEffect(()=>{                                    //调用状态机的公共方法
        dispatch(RoleMenu() as any)
       // getUserRoleMenu()
   },[])

   
   const treeDataMenu=useSelector((state:any)=>{
        return state.rolemenu
   })
   //console.log(treeDataMenu);
   let treeData: DataNode[] = []
   if(Object.keys(treeDataMenu).length!=0){       //判断treeDataMenu是否为空对象
       treeData=treeDataMenu.rows.children        //重新赋值
   }
   const onExpand = (expandedKeysValue:any) => {     //树形结构展开/收起节点时触发
    //console.log('onExpand', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  
  const onCheck = (checkedKeysValue:any,e:any) => {     //点击树形复选框触发
   // console.log('onCheck',checkedKeysValue );
    setCheckedKeys(checkedKeysValue.checked);
  };
  
  const onSelect = (selectedKeysValue:any, info:any) => {   //点击树节点触发
    //console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };
 
    return (
     <Tree                             //树形图组件
    checkable
    onExpand={onExpand}              //展开/收起节点时触发
    expandedKeys={expandedKeys}       //（受控）展开指定的树节点
    autoExpandParent={autoExpandParent}  //是否自动展开父节点
    onCheck={onCheck}                    //点击复选框触发
    checkedKeys={checkedKeys}     //选中树节点
    onSelect={onSelect}           //点击树节点触发
    selectedKeys={selectedKeys}    //（受控）设置选中的树节点
    treeData={treeData}            //树节点的数据
    checkStrictly={checkStrictly}          //是否父子关联，为true不关联

   />
  )
}

export default PublicTree