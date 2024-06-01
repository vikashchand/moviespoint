import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

import PublicPlaylistCard from './PublicPlaylistCard';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
function Public() {
  const [publicPlaylists, setPublicPlaylists] = useState([]);

  useEffect(() => {
    const fetchPublicPlaylists = async () => {
      try {
        const response = await axios.get('https://moviespoint-dmby.vercel.app/api/playlist/public/types');
        setPublicPlaylists(response.data);
      } catch (error) {
        console.error('Error fetching public playlists:', error);
      }
    };

    fetchPublicPlaylists();
  }, []);

  return (
    <div className="maincontainer">
    
    <Navbar/>
   
    <div className="profile-container">
   
    
      <h2>Public Playlists</h2>
      <div className="playlist-container">
        {publicPlaylists.map((playlist) => (
          <PublicPlaylistCard key={playlist._id} playlist={playlist} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default Public;
