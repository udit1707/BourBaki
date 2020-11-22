
import { EQUATION_ENTERED, EQUATION_SCANNED, EQUATION_TYPE, RESET, RESET_ANSWER, USER } from "../actions/equation";

const initialState={
    eqType:'',
    eqtEntered:'',
    eqtScanned:'',
    answer:null,
    user:{email:'',userName:''}
}

export default (state=initialState,action)=>{
    switch(action.type){
        case EQUATION_TYPE:
             return {...state,
                eqType:action.eq_type}
        
        case EQUATION_ENTERED:{
            return {...state,
                eqtEntered:action.equation}    
        }
        case EQUATION_SCANNED:{
            return {...state,
                eqtScanned:action.equation,
                answer:action.answer}
        }
        case USER:{
            return{
                ...state,
                user:action.user
            }
        }
        case RESET_ANSWER:{
            return {
                ...state,
                answer:null
            }
        }
        case RESET:{
            return {
                ...state,
                eqType:'',
                eqtScanned:'',
                eqtEntered:''
            }
        }
        default:
            return state
    }
}