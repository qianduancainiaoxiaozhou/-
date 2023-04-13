export const DeptReducer=(state=[],action:any)=>{
        switch(action.type){
             case 'SET_DEPT':
                return action.payload
             default:
                return state   
        }
}