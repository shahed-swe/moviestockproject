/* eslint-disable import/no-anonymous-default-export */
import {
    ADD_MOVIE_SUCCESS,
    ADD_MOVIE_FAILURE,
    LOAD_MOVIE_SUCCESS,
    LOAD_MOVIE_FAILURE,
    COMMENT_SHOW_SUCCESS,
    COMMENT_SHOW_FAILURE,
    COMMENT_ADD_SUCCESS,
    COMMENT_ADD_FAILURE,
} from '../actions/types';


const initialState = {
    movies: null,
    comments: null,
};


export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case LOAD_MOVIE_SUCCESS:
            return {
                ...state,
                movies: payload,
            }
        case LOAD_MOVIE_FAILURE:
            return {
                ...state,
                movies: null,
            }

        case ADD_MOVIE_SUCCESS:
            return {
                ...state,
            }
        case ADD_MOVIE_FAILURE:
            return {
                ...state,
            }
        
        case COMMENT_SHOW_SUCCESS:
            return {
                ...state,
                comments: payload,
            }
        case COMMENT_SHOW_FAILURE:
            return {
                ...state,
                comments: null,
            }
        
        case COMMENT_ADD_SUCCESS:
            return {
                ...state,
                comments: payload.comments,
            }
        case COMMENT_ADD_FAILURE:
            return {
                ...state,
            }

        default:
            return state
    }
}