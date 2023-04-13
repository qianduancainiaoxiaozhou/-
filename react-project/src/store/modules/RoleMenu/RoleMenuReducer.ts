export const RoleMenuReducer=(state={},actions:any)=>{
          switch(actions.type){
              case 'SET_ROLEMENU':
                return actions.payload;
              default:
                return state
          }
}