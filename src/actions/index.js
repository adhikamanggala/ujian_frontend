//===================ACTION CREATOR=====================//
import axios from 'axios';
import { 
    USER_LOGIN_SUCCESS, 
    // USER_NOT_FOUND, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING,
    LOGOUT,
    COOKIE_CHECKED,
    SELECT_PRODUCT,
    EDIT_DATA,
    PLUS_CART
} from './types';
import SelectProductReducer from '../reducers/SelectProductReducer';

export const onUserRegister = ({ username, email, phone, password }) => {
    return ( dispatch ) => {
        //=============INSERT USERNAME & PASSWORD KE JSON==============//
        dispatch({ type: AUTH_LOADING });
        if(username === '' || email === '' || phone === '' || password === '') {
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'All form should be filled'})
        }
        else {
            axios.get('http://localhost:1971/users', {
                params: {
                    username
                }
            }).then((res) => {
                if(res.data.length === 0) {
                    axios.post('http://localhost:1971/users', { 
                        username: username,
                        email: email,
                        phone: phone,
                        password: password
                    })
                    .then((res) => {
                        console.log(res);
                        dispatch({ type: USER_LOGIN_SUCCESS, payload: username });
                    })
                    .catch((err) => {
                        console.log(err);
                        dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' });
                    })
                }
                else {
                    dispatch ({ type: AUTH_SYSTEM_ERROR, payload: 'Username has been used'})
                }
               
            }).catch((err) => {
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error'})
            })
            
        }
    }
}

export const onLogOut = () => {
    return { type: LOGOUT }
}

export const onUserLogin = ({ username, password }) => {

    return ( dispatch ) => {

        //=============VALIDASI USERNAME & PASSWORD KE JSON==============//
        dispatch({ type: AUTH_LOADING });

        axios.get('http://localhost:1971/users', { 
            params: {
                username: username,
                password: password
            }
         })
        .then((res) => {
            console.log(res);
            if(res.data.length > 0) {
                dispatch({ type: USER_LOGIN_SUCCESS, payload: username });
            } else {
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Username or password invalid' });
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' });
        })

    }

}

export const keepLogin = (username) => {
    return { type: USER_LOGIN_SUCCESS, payload: username }
}

export const cookieChecked = () => {
    return { type: COOKIE_CHECKED }
}

export const select_product = (selectedProduct) => {
    return {
        type: SELECT_PRODUCT,
        payload: selectedProduct
    }
}
export const editClick = () =>{
    return {type : EDIT_DATA}
}

export const addCart = () => {
    return{
        type: PLUS_CART 
    }
}