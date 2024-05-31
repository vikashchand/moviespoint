import React, { useState } from 'react';
import './PlaylistCard.css';
import axios from 'axios';

function PlaylistCard({ playlist, onDelete }) {
  const [isPublic, setIsPublic] = useState(playlist.public);

  const togglePrivacy = async () => {
    try {
      const updatedPrivacy = !isPublic;
      const response = await axios.patch(`https://moviespoint-dmby.vercel.app/api/playlist/update/${playlist._id}`, {
        public: updatedPrivacy
      });
      if (response.status === 200) {
        setIsPublic(updatedPrivacy);
      } else {
        console.error('Failed to update privacy status');
      }
    } catch (error) {
      console.error('Error updating privacy status:', error);
    }
  };

  const deletePlaylist = async () => {
    try {
      const response = await axios.delete(`https://moviespoint-dmby.vercel.app/api/playlist/delete/${playlist._id}`);
      if (response.status === 200) {
        onDelete(playlist._id);
      } else {
        console.error('Failed to delete playlist');
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  return (
    <div className="playlist-card">
      <h4>{playlist.name}</h4>
      <p>Public: {isPublic ? 'Yes' : 'No'}</p>
      <p>Movies:</p>
      <ul>
        {playlist.movies.map((movie, index) => (
          <li key={index}>
            <strong>Title:</strong> {movie.title} <br />
            <strong>Year:</strong> {movie.year} <br />
          </li>
        ))}
      </ul>
      <button onClick={togglePrivacy}>
        {isPublic ? 'Make Private' : 'Make Public'}
      </button>
      <button onClick={deletePlaylist}>Delete Playlist</button>
    </div>
  );
}

export default PlaylistCard;
