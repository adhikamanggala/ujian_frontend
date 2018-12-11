import { 
    USER_LOGIN_SUCCESS, 
    // USER_NOT_FOUND, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING,
    LOGOUT,
    COOKIE_CHECKED,
    EDIT_DATA,
    PLUS_CART
 } from "../actions/types";

const INITIAL_STATE = { username: '', error: '', loading: false, cookie: false };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS :
            return { ...INITIAL_STATE, username: action.payload, cookie: true };
        // case USER_NOT_FOUND :
        //     return { ...INITIAL_STATE, error: 'Username or password invalid' }
        case AUTH_SYSTEM_ERROR :
            return { ...INITIAL_STATE, error: action.payload, cookie: true }
        case AUTH_LOADING :
            return { ...INITIAL_STATE, loading: true, cookie: true }
        case LOGOUT :
            return {...INITIAL_STATE, cookie: true}
        case COOKIE_CHECKED :
            return  {...INITIAL_STATE, cookie: true}
        case EDIT_DATA:
            return{...state , edit : true}
        case PLUS_CART:
            return{...state , jumlahCart : action.payload}  
        default :
            return state;

    }
}