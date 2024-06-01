import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlaylistCard from './PlaylistCard';
import './Profile.css';
import Navbar from './Navbar';

function Profile() {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState({});
  const [playListData, setPlayListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://moviespoint-dmby.vercel.app/api/users/getprofile", { params: { id: userId } });
        setUserData(response.data);
        const playlistRes = await axios.get(`https://moviespoint-dmby.vercel.app/api/playlist/${userId}`);
        setPlayListData(playlistRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleDelete = (playlistId) => {
    setPlayListData(playListData.filter(playlist => playlist._id !== playlistId));
  };

  return (
    <div className="maincontainer">


     <Navbar/>
     <div className="profile-container">
      <br></br>
      <br></br>
      

      <div className="user-info">
        <h2>Profile</h2>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
      </div>
      <div className="playlist-container">
        <h3>Playlists:</h3>
        {playListData.map(playlist => (
          <PlaylistCard key={playlist._id} playlist={playlist} onDelete={handleDelete} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default Profile;
