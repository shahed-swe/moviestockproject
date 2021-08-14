import axios from 'axios';

import {
    ADD_MOVIE_SUCCESS,
    ADD_MOVIE_FAILURE,
    LOAD_MOVIE_SUCCESS,
    LOAD_MOVIE_FAILURE,
    COMMENT_SHOW_SUCCESS,
    COMMENT_SHOW_FAILURE,
    COMMENT_ADD_SUCCESS,
    COMMENT_ADD_FAILURE,
} from './types';


export const loadmovie= () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem('access'),
            'Accept': 'application/json'
        }
    }

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/movies/`, config);
        dispatch({
            type: LOAD_MOVIE_SUCCESS,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: LOAD_MOVIE_FAILURE,
        })
    }
}


export const addmovie = (title) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem('access'),
            'Accept': 'application/json',
        }
    }

    const body = JSON.stringify({title});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/movies/`, body, config);
        dispatch({
            type: ADD_MOVIE_SUCCESS,
            payload: res.data
        });
        dispatch(loadmovie());
    }catch(err){
        dispatch({
            type: ADD_MOVIE_FAILURE,
        })
    }
}


export const loadcomment = (movie_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem('access'),
            'Accept': 'application/json',
        }
    }


    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/moviecomments/${movie_id}/`, config);
        dispatch({
            type: COMMENT_SHOW_SUCCESS,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: COMMENT_SHOW_FAILURE,
        })
    }
}


export const addcomment = (movie_id, comment) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem('access'),
            'Accept': 'application/json',
        }
    }
    const body = JSON.stringify({movie_id,comment});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/moviecomments/`, body, config);
        dispatch({
            type: COMMENT_ADD_SUCCESS,
            payload: res.data
        });
        dispatch(loadcomment(movie_id));
    }catch(err){
        dispatch({
            type: COMMENT_ADD_FAILURE,
        })
    }
}