export const addUserReducer=(state={},actions:any)=>{
          switch(actions.type){
               case 'SET_ADDUSER':
                 return actions.payload
                default:
                    return state
          }
}