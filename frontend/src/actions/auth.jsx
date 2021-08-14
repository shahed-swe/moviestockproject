import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    USER_LOAD_SUCCESS,
    USER_LOAD_FAILURE,
    LOGOUT,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE,
} from './types';
import { loadmovie } from './movie';


export const checkauthenticated = () => async dispatch => {
    if (localStorage.getItem('access')){
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Accept':'application/json'
            }
        };

        const body = JSON.stringify({token: localStorage.getItem('access')});
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/token/verify/`, body, config)
            if(res.data.code !== 'token_not_valid'){
                dispatch({
                    type: AUTHENTICATION_SUCCESS
                });
                dispatch(loadmovie());
            }else{
                dispatch({
                    type: AUTHENTICATION_FAILURE
                });
            }
        }catch(err){
            dispatch({
                type: AUTHENTICATION_FAILURE
            });
        }
    }else{
        dispatch({
            type: AUTHENTICATION_FAILURE 
        });
    }
};


export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile/`, config);
            dispatch({
                type: USER_LOAD_SUCCESS,
                payload: res.data
            })
        }catch(err){
            dispatch({
                type: USER_LOAD_FAILURE,
            })
        }
    }
}

export const signup = (first_name, last_name, email, password, confirm_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({first_name, last_name, email, password, confirm_password});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/registration/`, body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload : res.data
        })

    }catch(err){
        dispatch({
            type: SIGNUP_FAILURE,
        })
    }
}


export const login = (email, password) =>  async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/login/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload : res.data
        })
        dispatch(load_user());
    }catch(err){
        dispatch({
            type: LOGIN_FAILURE,
        })
    }
};


export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT,
    })
}
