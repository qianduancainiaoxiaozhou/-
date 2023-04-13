//state=[]是初始状态
export const reducer=(state=[],action:any)=>{
    // 返回的数据会直接保存到 store 中
    switch (action.type) {
        case 'SET_MENU':
            return action.payload;
     //上面都匹配不上时的默认返回 
        default:
            return state;
    }
}