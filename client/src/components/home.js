import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListHeading from './ListHeading';
import SearchBox from './SearchBox';
import ListMovie from './ListMovie';
import './HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser ,faPlay,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [toSearch, setToSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if(localStorage.getItem('authToken') === undefined){
      navigate("/login");
    }
    const getMovie = async () => {
      const url = `https://www.omdbapi.com/?s=${toSearch}&apikey=4a3b711b`;
      try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        if (jsonResponse.Search) {
          setMovies(jsonResponse.Search);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (toSearch.trim() !== '') {
      getMovie();
    }
  }, [toSearch]);

  return (
    <div className="container-fluid movie-app">
      <div className="row align-items-center mt-4 mb-4">
        <div className="col-12 col-md-8">
          <ListHeading heading="Movies" />
        </div>
        
        <div className="col-12 col-md-4 d-flex justify-content-end align-items-center">
          
         
        <SearchBox toSearch={toSearch} setToSearch={setToSearch} />

         
          <button onClick={() => {navigate('/publicPlaylist')}}  className="button-75">
         Public
        </button>

        <span></span>


          <button onClick={() => {navigate('/profile')}}  className="button-75">
            profile
          </button>

          <span></span>
        
          <div className="mx-1">
          
        </div>
        <button className="btn btn-danger" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
         
          </button>
        </div>
      </div>
      <div className="welcome-message">
        <h3>Welcome to the Playlist App</h3>
        <h4>Please search for a movie...</h4>
      </div>
      <div className="row movie-list">
        <ListMovie movies={movies} />
      </div>
    </div>
  );
};

export default HomePage;
