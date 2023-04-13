export const AllMenuReducer=(state={},actions:any)=>{
         switch(actions.type){
             case 'SET_ALLMENU':
                return actions.payload;
              default:
                return state;  
         }
}