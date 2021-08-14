import React from 'react';

const MovieDetails = (props) => {

    const {id, poster, title, description, release_date} = props.movieitem;
    return (
        <div class="card text-white movie col-6 col-lg-3 col-md-6" key={id} onClick={() => props.showMovieDetails(props.movieitem)}>
            <div>
                <img class="card-img w-100" src={poster} alt=""/>
            </div>
            
            <div class="card-img-overlay">
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{description}</p>
                <p class="card-text">{release_date}</p>
            </div>
        </div>
    )
}

export default MovieDetails;