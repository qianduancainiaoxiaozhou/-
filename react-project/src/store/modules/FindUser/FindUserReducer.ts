export const findUserReducer=(state={},action:any)=>{
           switch(action.type){
                case 'SET_FINDUSER':
                    return action.payload;
                 default:
                    return state   
           }
}