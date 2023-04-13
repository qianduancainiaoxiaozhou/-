export const  allGoodsTypeReducer=(state={},actions:any)=>{
       switch(actions.type){
             case 'SET_GOODSTYPE':
                return actions.payload;
             default:
                return state   
       }
} 