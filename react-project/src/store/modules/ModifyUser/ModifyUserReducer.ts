export const ModifyUser=(state={},actions:any)=>{
          switch(actions.type){
              case 'SET_MODIFY':
                return actions.payload
                default:
                    return state
          }
}