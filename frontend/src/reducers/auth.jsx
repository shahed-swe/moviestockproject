/* eslint-disable import/no-anonymous-default-export */
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    USER_LOAD_SUCCESS,
    USER_LOAD_FAILURE,
    LOGOUT,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE
} from '../actions/types';


const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null
};


export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }
        case AUTHENTICATION_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case LOGIN_FAILURE:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            }
        case SIGNUP_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
            }
        case USER_LOAD_SUCCESS:
            return {
                ...state,
                user: payload.data,
            }
        case USER_LOAD_FAILURE:
            return{
                ...state,
                user:null,
            }
        case LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
            }

        default:
            return state
    }
}