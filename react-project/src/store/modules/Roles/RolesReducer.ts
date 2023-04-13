export const RolesReducer=(state={},action:any)=>{
          switch(action.type){
                  case 'SET_ROLE':
                    return action.payload
                   default:
                    return state 
          }
}