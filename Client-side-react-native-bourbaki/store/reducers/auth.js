import { AUTHENTICATE, LOGOUT, GET_USER, UPDATE_USER } from "../actions/auth";
const initialState={
    token:null,
    userId:null,
    expiresIn:0,
    id:'',
    email:'',
    telephone:'',
    name:'',
    address:'',
    avatar:'',
    google:false,
    photo:''
}

export default (state = initialState,action)=>{
    switch(action.type){
        case AUTHENTICATE:
            return{
                ...state,
                token:action.token,
                userId:action.userId,
                email:action.email,
                expiresIn:action.expiresIn
            }
        case GET_USER:
            return {...state,
                    id:action.userData.id,
                    email:action.userData.email,
                    name:action.userData.name,
                    address:action.userData.address,
                    telephone:action.userData.telephone,
                    avatar:action.userData.avatar,
                    photo:action.userData.photo,
                    google:action.userData.google
                }
        case UPDATE_USER:
            return {
                ...state,
                email:action.userData.email,
                name:action.userData.name,
                telephone:action.userData.telephone,
                address:action.userData.address,
                avatar:action.userData.avatar
            }
        case LOGOUT:
            return initialState
        // case SIGNUP:
        //     return{
        //         token:action.token,
        //         userId:action.userId
        //     }
        default : return state 
    }
}