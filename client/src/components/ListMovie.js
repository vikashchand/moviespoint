import React from 'react';
import { Link } from 'react-router-dom';
import './ListMovie.css';

const ListMovie = (props) => {
  return (
    <div className="movie-container">
      {props.movies.map((movie, index) => (
        <div className="movie-item" key={index}>
          <Link to={`/details/${movie.imdbID}`} target="_blank" rel="noopener noreferrer">
            <img src={movie.Poster} alt="Movie Poster" className="movie-poster" />
            <div className="movie-details">
              <h5>{movie.Title}</h5>
              <p>Year: {movie.Year}</p>
              <p>Type: {movie.Type}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ListMovie;
