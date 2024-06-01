import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListHeading from './ListHeading';
import SearchBox from './SearchBox';
import ListMovie from './ListMovie';
import './HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser ,faPlay,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';

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
    <div className="maincontainer">
     <Navbar/>
    <div className="container-fluid movie-app">
   
      
      <div className="welcome-message">
        <h3>Welcome to the Playlist App</h3>
        <h4>Please search for a movie...</h4>
        <div className=" align-items-center">
          
         
        <SearchBox toSearch={toSearch} setToSearch={setToSearch} />

        
        </div>
      </div>
      <div className="row movie-list">
        <ListMovie movies={movies} />
      </div>
    </div>
    </div>
  );
};

export default HomePage;
