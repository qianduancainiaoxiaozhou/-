export const goodsReducer=(state={},actions:any)=>{
      switch(actions.type){
         case 'SET_GOODS':
             return actions.payload;
         default:
            return state    
          
      }
}