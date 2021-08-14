import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {addmovie, loadcomment, addcomment} from '../actions/movie';
import './../App.css';
import MovieDetails from "./MovieDetails";
import Comments from "./Comments";

const Movie = ({addmovie,loadcomment, movies,comments,addcomment, isAuthenticated}) => {
    
    const [formData, setFormData] = useState({
        title: '',
        comment: '',
    });

    const [movie, setMovie] = useState({});

    const {title} = formData;
    const {comment} = formData;


    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        addmovie(title);
        setFormData({title: ''});
    }

    const onSubmit2 = e => {
        e.preventDefault();
        addcomment(movie.id.toString(),comment);
        setFormData({comment: ''});

    }

    if(isAuthenticated === false){
        return <Redirect to="/"/>
    }

    if(movies.movies == null){
        return (
            <div className="container">
                <h1>Loading movies...</h1>
            </div>
        )
    }


    const showMovieDetails = (movie) => {
       setMovie(movie);
       loadcomment(movie.id);
    }


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 col-lg-6 col-md-12 movies">
                    <div className="row">
                        {movies.movies.map(movie => {
                            return <MovieDetails showMovieDetails={showMovieDetails} movieitem={movie}/>
                        })}
                    </div>
                    
                </div>
                <div className="col-12 col-lg-6 col-md-12">
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="">Movie Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                value={title}
                                onChange={e => onChange(e)}
                                placeholder="Write Your Movie Title"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <button className="btn btn-primary for-login" type="submit">Add Movie</button>
                        </div>
                    </form>
                    <div className="moviecomments">
                        <div className="card text-white movie col-12">
                            <div>
                                <img className="card-img w-50" src={movie.poster} alt=""/>
                            </div>
                            
                            <div className="card-img-overlay">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">{movie.description}</p>
                                <p className="card-text">{movie.release_date}</p>
                            </div>
                        </div>
                        <div className="maincomment">
                            {comments != null ? (
                                comments.map(comment => {
                                return (
                                    <div>
                                        <Comments comments={comment}/>
                                        
                                    </div>
                                    
                                )
                            })
                            ) : (
                                <div className="comment-style">
                                    <div className="comment-style">
                                        <div className="comments">No comments</div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <form onSubmit={e => onSubmit2(e)}>
                            <div className="form-group">
                                <label htmlFor="">Comment</label>
                                <textarea
                                    className="form-control"
                                    type="text"
                                    name="comment"
                                    value={comment}
                                    onChange={e => onChange(e)}
                                    placeholder="Write Your Comment"
                                    required
                                />
                                <div className="form-group">
                                    <button className="btn btn-primary for-login" type="submit">Add Comment</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    movies: state.movies,
    comments: state.movies.comments,
})


export default connect(mapStateToProps, {addmovie, loadcomment, addcomment})(Movie);